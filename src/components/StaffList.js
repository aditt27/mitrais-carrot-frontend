import { Component } from 'react'
import { Container, Col, Row, Table, Form, Pagination, Button, Modal } from 'react-bootstrap'
import { getUsersByFilter } from '../apis/user'
import { btnRewardStyle } from './ShareCarrotStaff'

function AddStaffModal(props) {

    function handleAddStaffSubmit(e) {
        e.preventDefault()
        console.log(e.target.dob.value)
        const data = {
            "username": "string",
            "password": "string",
            "name": "string",
            "email": "string",
            "dob": "2022-03-30T09:29:52.730Z",
            "jobFamily": "string",
            "grade": "string",
            "office": "string",
            "role": "string"
        }
    }

    return (
        <>
            <Modal show={props.showModal} centered backdrop="static" keyboard={false}>
                <Form onSubmit={handleAddStaffSubmit} className="p-2">
                    <Modal.Header>
                        <h4>ADD STAFF</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#username">Username</Form.Label>
                            <Form.Control id="username" type="text" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#name">Name</Form.Label>
                            <Form.Control id="name" type="text" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#email">Email</Form.Label>
                            <Form.Control id="email" type="email" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#password">Password</Form.Label>
                            <Form.Control id="password" type="password" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#jobFamily">Job Family</Form.Label>
                            <Form.Control id="jobFamily" type="text" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#grade">Grade</Form.Label>
                            <Form.Control id="grade" type="text" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#office">Office</Form.Label>
                            <Form.Control id="office" type="text" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#role">Role</Form.Label>
                            <Form.Control id="role" type="text" />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#dob">Date of Birth</Form.Label>
                            <Form.Control id="dob" type="date" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                            <Button variant="link" className="m-2" onClick={() => props.onClose(true)}>CANCEL</Button>
                            <Button type="submit" style={btnRewardStyle} className="m-2">SUBMIT</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

class StaffList extends Component {

    endpoint = 'http://localhost:8081/api/v1/user'

    state = {
        staffList: [],
        currentPage: 0,
        totalPages: 0,
        currentFilter: 'default',
        isShowModal: false
    }

    componentDidMount() {
        this.fetchStaff('default', 0)
    }

    fetchStaff(filter = 'default', page = 0) {
        getUsersByFilter(filter, page).then(res => {
            const { page, staffList, totalPages } = res
            this.setState({staffList: staffList, currentPage: page, totalPages: totalPages, currentFilter: filter, isShowModal: false})
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

    handleAddStaffBtn = () => {
        this.setState({isShowModal: true})
    }

    onModalClose = (isCancel) => {
        if (isCancel === false) {
            this.fetchStaff()
        } else {
            this.setState({isShowModal: false})
        }
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
                    <Col md={12} className="align-self-start my-2">
                        <Button onClick={this.handleAddStaffBtn}>ADD STAFF</Button>
                        <AddStaffModal showModal={this.state.isShowModal} onClose={this.onModalClose} />
                    </Col>
                    <Col md="12" className="my-2">
                        <Form.Group className="float-right">
                            <Form.Label htmlFor="#staff-filter">FILTER</Form.Label>
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