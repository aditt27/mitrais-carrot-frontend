import { Component, useState } from 'react'
import { Container, Col, Row, Table, Form, Button, Modal, Alert, Spinner } from 'react-bootstrap'
import { getUsersByFilter } from '../apis/user'
import { btnRewardStyle } from './ShareCarrotStaff'
import { addUser } from '../apis/user'
import { Pagination } from '@mui/material'
import { getTableStartIndexByTen } from '../utils/HelperFunctions'

function AddStaffModal(props) {
    const [msg, setMsg] = useState('')
    const [isLoading, setLoading] = useState(false)

    function handleAddStaffSubmit(e) {
        setLoading(true)
        setMsg('')
        e.preventDefault()
        const data = {
            "username": e.target.username.value,
            "password": e.target.password.value,
            "name": e.target.name.value,
            "email": e.target.email.value,
            "dob": e.target.dob.value,
            "jobFamily": e.target.jobFamily.value,
            "grade": e.target.grade.value,
            "office": e.target.office.value,
            "role": e.target.role.value
        }
        addUser(data).then(res => {
            setLoading(false)
            setMsg(res)
            if (res === 'Success') {
                setTimeout(() => {
                    setLoading(false)
                    props.onClose(false)
                }, 1000);
            }
        })
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
                            <Form.Control id="username" type="text" required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#name">Name</Form.Label>
                            <Form.Control id="name" type="text" required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#email">Email</Form.Label>
                            <Form.Control id="email" type="email" required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#password">Password</Form.Label>
                            <Form.Control id="password" type="password" required />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#jobFamily">Job Family</Form.Label>
                            <Form.Control id="jobFamily" as="select" required>
                                <option value="SE">SE</option>
                                <option value="SQ">SQ</option>
                                <option value="CON">CON</option>
                                <option value="DSG">DSG</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#grade">Grade</Form.Label>
                            <Form.Control id="grade" as="select" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#office">Office</Form.Label>
                            <Form.Control id="office" as="select" required>
                                <option value="Bali">Bali</option>
                                <option value="Bandung">Bandung</option>
                                <option value="Jakarta">Jakarta</option>
                                <option value="Yogyakarta">Yogyakarta</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#role">Role</Form.Label>
                            <Form.Control id="role" as="select" required>
                                <option value="Staff">Staff</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label htmlFor="#dob" required>Date of Birth</Form.Label>
                            <Form.Control id="dob" type="date" />
                        </Form.Group>
                        {isLoading && <div className="text-center"><Spinner variant="primary" animation="border" /></div>}
                        {msg.length > 0 && <Alert variant={msg === 'Success' ? 'success' : 'danger'}>{msg}</Alert>}
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

export const loadingStyle = {
    pointerEvents: "none",
    opacity: "0.5"
}
class StaffList extends Component {

    state = {
        staffList: [],
        currentPage: 0,
        totalPages: 0,
        currentFilter: 'default',
        isShowModal: false,
        isLoading: false
    }

    componentDidMount() {
        this.fetchStaff()
    }

    fetchStaff(filter = 'default', page = 0) {
        this.setState({isLoading: true})
        getUsersByFilter(filter, page).then(res => {
            const { page, staffList, totalPages } = res
            this.setState({staffList: staffList, currentPage: page, totalPages: totalPages, currentFilter: filter, isShowModal: false, isLoading: false})
        }).catch(e => {})
    }

    StaffListRow = () => {
        const { staffList, currentPage } = this.state
        let index = getTableStartIndexByTen(currentPage + 1)

        return staffList.map((staff, i) => {
            return (
                <tr key={i}>
                    <td>{index++}</td>
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
                            <Table striped bordered hover >
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
                            <Pagination color="primary" className="float-right mb-2" count={this.state.totalPages} page={this.state.currentPage + 1} onChange={(_, page) => this.fetchStaff(this.state.currentFilter, page - 1)} />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default StaffList