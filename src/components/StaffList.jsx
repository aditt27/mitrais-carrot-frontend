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
        let initialStaff = []
        await axios.get("http://localhost:8081/api/v1/group").then(res => {
            const data = res.data.result
            for (const i in data) {
                groups.push(data[i].groupName)
            }
        })
        
        await axios.get("http://localhost:8081/api/v1/user?filterBy=no_group").then(res => {
            const data = res.data.result
            if (data.currentPageContent) {
                const staff = data.currentPageContent.filter(s => s.role == "Staff")
                let i = 1
                staff.forEach((s) =>
                    initialStaff.push({
                        no: i++,
                        username: s.username,
                        name: s.name,
                        role: s.role,
                        office: ""
                    })
                )
            }
        })
    
        this.setState({groupList: groups, staffList: initialStaff})
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
            <Container className="p-5">
                <Tab.Content className="search-box">
                    <Card style={{padding: "1.5em"}}>
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
                                    <Form.Control id="group-filter" as="select" defaultValue="no_group" className="mx-auto">
                                        <option value="no_group">No Group</option>
                                        {this.groupListOptions()}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="my-2">
                                <Form.Group className="float-right form-inline">
                                    <Form.Label>SEARCH: &nbsp;</Form.Label>
                                    <Form.Control type="text" className="w-auto" />
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
                                            <th>Office</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.staffListRow()}</tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Card>
                </Tab.Content>
            </Container>
        )
    }
}

export default StaffInGroup