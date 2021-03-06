import { Container, Row, Col, Form, Table, Spinner } from 'react-bootstrap';
import { Component } from 'react';
import apiClient from '../apis';
import { Pagination } from '@mui/material'
import { loadingStyle } from './StaffList';
import { getTableStartIndexByTen } from '../utils/HelperFunctions';

class StaffInGroup extends Component {

    state = {
        groupList: [],
        staffList: [],
        currentPageStaff: 0,
        totalPageStaff: 0,
        currentGroup: 'no_group',
        isLoading: false
    }
    
    async componentDidMount() {
        this.setState({isLoading: true})
        let groups = []
        await apiClient.get("/group?isPaginated=false").then(res => {
            const data = res.data.result.currentPageContent
            for (const i in data) {
                groups.push({
                    id: data[i].id,
                    name: data[i].groupName
                })
            }
        }).catch(_ => {})

        const { staffList, totalPages } = await this.filterStaffByGroup()

        this.setState({groupList: groups, staffList:  staffList, totalPageStaff: totalPages, isLoading: false})
    }

    async filterStaffByGroup(groupId = -99, page = 0) {
        this.setState({isLoading: true})
        let result = {
            staffList: [],
            currentPage: 0
        }
        
        const filter = groupId < 0 ? "filterBy=no_group" : `filterBy=group&filterValue=${groupId}`
        await apiClient.get(`/user?${filter}&page=${page}`).then(res => {
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
                            office: s.office,
                            jobFamily: s.jobFamily
                        })
                    )
                }
                result.currentPage = data.currentPage
                result.totalPages = data.totalPages
            }
        }).catch(e => {}).finally(() => this.setState({isLoading: false}))
        return result
    }

    handleGroupSelect = async (e) => {
        const groupName = e.target.value
        const { staffList, currentPage } = await this.filterStaffByGroup(groupName)
        this.setState({staffList: staffList, currentPageStaff: currentPage, currentGroup: groupName})
    }

    fetchStaff = (page = 0) => {
        this.filterStaffByGroup(this.state.currentGroup, page).then(res => {
            const { currentPage, staffList, totalPages } = res
            this.setState({staffList: staffList, currentPageStaff: currentPage, totalPageStaff: totalPages})
        }).catch(e => {})
    }

    GroupListOptions = () => {
        const { groupList } = this.state
        return groupList.map((g, i) => <option key={i} value={g.id}>{g.name}</option>)
    }

    StaffListRow = () => {
        const { staffList, currentPageStaff } = this.state
        let index = getTableStartIndexByTen(currentPageStaff + 1)

        return staffList.map((staff, i) => {
            return (
                <tr key={i}>
                    <td>{index++}</td>
                    <td>{staff.username}</td>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.jobFamily}</td>
                    <td>{staff.office}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <>
                {this.state.isLoading && (<div style={{position: "fixed", left: "50%", top: "50%", zIndex: "9999"}}><Spinner animation="border" variant="primary" /></div>)}
                <Container className="px-4" style={this.state.isLoading ? loadingStyle : {}}>
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
                                <Form.Label htmlFor="#group-filter">STAFF GROUP</Form.Label>
                                <Form.Control id="group-filter" as="select" defaultValue={-99} className="mx-auto" onChange={this.handleGroupSelect}>
                                    <option value={-99}>No Group</option>
                                    <this.GroupListOptions />
                                </Form.Control>
                            </Form.Group>
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
                                        <th>JF</th>
                                        <th>Office</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <this.StaffListRow />
                                </tbody>
                            </Table>
                        </Col>
                        <Col md="12">
                            <Pagination color="primary" className="float-right mb-2" count={this.state.totalPageStaff} page={this.state.currentPageStaff + 1} onChange={(_, page) => this.fetchStaff(page - 1)} />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default StaffInGroup