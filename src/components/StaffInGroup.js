import { Tab, Container, Row, Col, Form, Card, Table } from 'react-bootstrap';
import { Component } from 'react';
import axios from 'axios';

class StaffInGroup extends Component {

    constructor() {
        super()
        this.state = {
            groupList: [],
            staffList: []
        }
    }
    
    async componentDidMount() {
        let groups = []
        await axios.get("http://localhost:8081/api/v1/group").then(res => {
            const data = res.data.result
            for (const i in data) {
                groups.push(data[i].groupName)
            }
        })

        const initialStaff = await this.filterStaffByGroup()

        this.setState({groupList: groups, staffList:  initialStaff})
    }

    async filterStaffByGroup(groupName = "no_group") {
        let staff = []
        const filter = groupName === "no_group" ? "filterBy=no_group" : `filterBy=group&filterValue=${groupName}`
        await axios.get(`http://localhost:8081/api/v1/user?${filter}`).then(res => {
            const data = res.data.result
            if (data.currentPageContent) {
                const st = data.currentPageContent.filter(s => s.role === "Staff")
                let i = 1
                if (st.length > 0) {
                    st.forEach((s) =>
                        staff.push({
                            no: i++,
                            username: s.username,
                            name: s.name,
                            role: s.role,
                            office: ""
                        })
                    )
                }
            }
        })
        return staff
    }

    handleGroupSelect = async (e) => {
        const groupName = e.target.value
        const staff = await this.filterStaffByGroup(groupName)
        this.setState({staffList: staff})
    }

    groupListOptions() {
        const { groupList } = this.state
        return groupList.map((g, i) => <option key={i} value={g}>{g}</option>)
    }

    staffListRow() {
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

    render() {

        return (
            <Container className="px-4">
                <Tab.Content>
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
                                    {this.groupListOptions()}
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
                                <tbody>{this.staffListRow()}</tbody>
                            </Table>
                        </Col>
                    </Row>
                </Tab.Content>
            </Container>
        )
    }
}

export default StaffInGroup