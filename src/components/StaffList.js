import { Component } from 'react'
import { Container, Col, Row, Table, Form, Pagination } from 'react-bootstrap'
import { getUsersByFilter } from '../apis/user'

class StaffList extends Component {

    endpoint = 'http://localhost:8081/api/v1/user'

    state = {
        staffList: [],
        currentPage: 0,
        totalPages: 0,
        currentFilter: 'default'
    }

    componentDidMount() {
        this.fetchStaff('default', 0)
    }

    fetchStaff(filter = 'default', page = 0) {
        getUsersByFilter(filter, page).then(res => {
            const { page, staffList, totalPages } = res
            this.setState({staffList: staffList, currentPage: page, totalPages: totalPages, currentFilter: filter})
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

    PaginationItems = () => {
        const { totalPages, currentPage } = this.state
        let paginationItems = []
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <Pagination.Item key={i} active={i === currentPage + 1} activeLabel="" onClick={() => this.fetchStaff(this.state.currentFilter, i - 1)}>{i}</Pagination.Item>
            )
        }
        return paginationItems
    }

    handleFilterChange = (e) => {
        const filter = e.target.value
        this.fetchStaff(filter, 0)
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

export default StaffList