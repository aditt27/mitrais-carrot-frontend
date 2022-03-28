import { Component } from 'react'
import Axios from 'axios'
import { Container, Col, Row, Table, Form } from 'react-bootstrap'

class StaffList extends Component {

    endpoint = 'http://localhost:8081/api/v1/user'

    state = {
        staffList: [],
        currentPage: 0
    }

    componentDidMount() {
        this.fetchStaff()
    }

    fetchStaff(filter = 'default', page = 0) {
        let url
        switch (filter) {
            case 'carrot': {
                url = `${this.endpoint}?filterBy=carrot&page=${page}`
                break
            }
            case 'most_spent': {
                url = `${this.endpoint}/most_spent?page=${page}`
                break
            }
            case 'most_earn_month': {
                url = `${this.endpoint}/most_earn?period=month&page=${page}`
                break
            }
            case 'most_earn_year': {
                url = `${this.endpoint}/most_earn?period=year&page=${page}`
                break
            }
            default:
                url = `${this.endpoint}?page=${page}`
                break
        }
        
        Axios.get(url).then(res => {
            if (res.data.message === "Success") {
                const data = res.data.result
                let i = 1
                const staff = data.currentPageContent.length === 0 ? [] : data.currentPageContent.filter(st => st.id > 0).map(it => {
                    return {
                        no: i++,
                        username: it.username,
                        name: it.name,
                        role: it.role,
                        carrot: it.total !== undefined ? it.total : it.points
                    }
                })
                this.setState({staffList: staff, currentPage: data.currentPage})
            }
        }).catch(e => {})
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
                    <td>{staff.carrot}</td>
                </tr>
            )
        })
    }

    handleFilterChange = (e) => {
        const filter = e.target.value
        this.fetchStaff(filter)
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
                        <h4 className="box-title">STAFF LIST</h4>
                    </Col>
                    <Col md="12" className="my-2">
                        <Form.Group className="float-right">
                            <Form.Label>FILTER</Form.Label>
                            <Form.Control id="staff-filter" as="select" defaultValue="default" className="mx-auto" onChange={this.handleFilterChange}>
                                <option value="default">Default</option>
                                <option value="carrot">Carrot</option>
                                <option value="most_spent">Most Spent Carrot</option>
                                <option value="most_earn_month">Most Earn Carrot In Month</option>
                                <option value="most_earn_year">Most Earn Carrot In Year</option>
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
                                    <th>Carrot</th>
                                </tr>
                            </thead>
                            <tbody>
                                <this.StaffListRow />
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default StaffList