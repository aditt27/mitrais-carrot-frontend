import { Container, Row, Col, Form, Table, Pagination } from 'react-bootstrap';
import { Component } from 'react';
import axios from 'axios';

class StaffInGroup extends Component {

    constructor() {
        super()
        this.state = {
            groupList: [],
            staffList: [],
            currentPageStaff: 0,
            totalPageStaff: 0,
            currentGroup: 'no_group'
        }
    }
    
    async componentDidMount() {
        let groups = []
        await axios.get("http://localhost:8081/api/v1/group").then(res => {
            const data = res.data.result.currentPageContent
            for (const i in data) {
                groups.push(data[i].groupName)
            }
        })

        const { staffList, totalPages } = await this.filterStaffByGroup()

        this.setState({groupList: groups, staffList:  staffList, totalPageStaff: totalPages})
    }

    async filterStaffByGroup(groupName = "no_group", page = 0) {
        let result = {
            staffList: [],
            currentPage: 0
        }
        
        const filter = groupName === "no_group" ? "filterBy=no_group" : `filterBy=group&filterValue=${groupName}`
        await axios.get(`http://localhost:8081/api/v1/user?${filter}&page=${page}`).then(res => {
            const data = res.data.result
            if (data.currentPageContent) {
                const st = data.currentPageContent.filter(s => s.role === "Staff")
                let i = 1
                if (st.length > 0) {
                    st.forEach((s) =>
                        result.staffList.push({
                            no: i++,
                            username: s.username,
                            name: s.name,
                            role: s.role,
                            office: ""
                        })
                    )
                }
                result.currentPage = data.currentPage
                result.totalPages = data.totalPages
            }
        }).catch(e => {})
        return result
    }

    handleGroupSelect = async (e) => {
        const groupName = e.target.value
        const { staffList, currentPage } = await this.filterStaffByGroup(groupName)
        this.setState({staffList: staffList, currentPageStaff: currentPage, currentGroup: groupName})
    }

    fetchStaff = (page) => {
        this.filterStaffByGroup(this.state.currentGroup, page).then(res => {
            const { currentPage, staffList } = res
            this.setState({staffList: staffList, currentPageStaff: currentPage})
        }).catch(e => {})
    }

    GroupListOptions = () => {
        const { groupList } = this.state
        return groupList.map((g, i) => <option key={i} value={g}>{g}</option>)
    }

    StaffListRow = () => {
        const { staffList } = this.state
        return staffList.map((staff, i) => {
            return (
                <tr key={i}>
                    <td>{staff.no}</td>
                    <td>{staff.username}</td>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.office}</td>
                </tr>
            )
        })
    }

    PaginationItems = () => {
        const { totalPageStaff, currentPageStaff } = this.state
        let paginationItems = []
        for (let i = 1; i <= totalPageStaff; i++) {
            paginationItems.push(
                <Pagination.Item key={i} active={i === currentPageStaff + 1} activeLabel="" onClick={() => this.fetchStaff(i - 1)}>{i}</Pagination.Item>
            )
        }
        return paginationItems
    }

    render() {
        return (
            <Container className="px-4">
                <Row>
                    <Col md={12} className="align-self-start my-2">
                        <hr style={{
                            width: "2em",
                            backgroundColor: "orange",
                            height: "0.2em"
                        }} align="left"/>
                        <h4 className="box-title">STAFF IN GROUP LIST</h4>
                    </Col>
                    <Col md="12" className="my-2">
                        <Form.Group className="float-right">
                            <Form.Label>STAFF GROUP</Form.Label>
                            <Form.Control id="group-filter" as="select" defaultValue="no_group" className="mx-auto" onChange={this.handleGroupSelect}>
                                <option value="no_group">No Group</option>
                                <this.GroupListOptions />
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="my-2">
                    <Form>
                        <Form.Group className="float-right form-inline">
                            <Form.Label>SEARCH: &nbsp;</Form.Label>
                                <Form.Control type="text" className="w-auto" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="my-2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Office</th>
                                </tr>
                            </thead>
                            <tbody>
                                <this.StaffListRow />
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="12">
                        <Pagination className="float-right">
                            <this.PaginationItems />
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default StaffInGroup