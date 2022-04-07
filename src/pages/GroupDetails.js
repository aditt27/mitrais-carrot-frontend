import React, { useEffect, useState } from "react";
import { Card, Col, Row, Tab, Form, Table, Button, ButtonGroup, Modal, FormGroup, FormLabel } from "react-bootstrap";
import { IconButton } from "@mui/material";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import apiClient from "../apis";
import axios from "axios";
import { addToGroup, removeFromGroup } from "../apis/group";
import Multiselect from "multiselect-react-dropdown";
import { getAllUsers } from "../apis/user";


const GroupDetails = (props) => {
    const location = useLocation()
    const id = location.state.id
    const [staffList, setStaffList] = useState([])
    const [addStaff, setAddStaff] = useState([])
    const [dropdownList, setDropdownList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [modalType, setModalType] = useState('')
    const [removeId, setRemoveId] = useState(-1)
    const [modalTitle, setModalTitle] = useState('')
    const currentPath = window.location.pathname.split("/")

    useEffect(() => {
        getGroupInfo(id)
    }, [])

    const handleDelete = () => {
        setDisableButton(true)
        removeFromGroup({
            groupId: id,
            userIds: [removeId]
        })
        .then(res => {
            setShowModal(false)
            setRemoveId(-1)
            setModalType('')
            setModalTitle('')
            setDisableButton(false)
            getGroupInfo(id)
        })
    }

    const handleSubmit = () => {
        setDisableButton(true)
        addToGroup({
            groupId: id,
            userIds: addStaff
        })
        .then(res => {
            setShowModal(false)
            setAddStaff([])
            setDropdownList([])
            setModalType('')
            setModalTitle('')
            setDisableButton(false)
            getGroupInfo(id)
        })
    }
    

    const handleModalOpen = (e, id = undefined) => {
        switch (e.target.name) {
            case 'removeUser':
                setRemoveId(id)
                setModalType('confirmation')
                setModalTitle('Confirm remove user from group')
                break;
            case 'addUser':
                setModalType('form')
                setModalTitle('Add user to group')
                getStaffToBeAdded()
                break;
        }
        setShowModal(true)
    }

    const getStaffToBeAdded = async() => {
        await getAllUsers().then(res => {
            setDropdownList(res)
        })
        
    }
    const getGroupInfo = async (groupId) => {
        
        let result = {
            staffList: []
        }

        axios.get(`http://localhost:8081/api/v1/group/${groupId}`).then(res => {
            const data = res.data.result
            console.log(data)
            
            if (data.users) {
                // console.log(data.currentPageContent)
                const st = data.users.filter(s => s.role === "Staff")
                let i = 1
                if (st.length > 0) {
                    // console.log(st)
                    st.forEach((s) =>
                        result.staffList.push({
                            no: i++,
                            id: s.id,
                            username: s.username,
                            name: s.name,
                            role: s.role,
                            office: s.office
                        })
                    )
                }
            }
            setStaffList(result.staffList)
        })
            .catch(e => { })

    }
    const staffListRow = () => {
        return staffList.map((staff, i) => {
            return (
                <tr key={i}>
                    <td>{staff.no}</td>
                    <td>{staff.username}</td>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.office}</td>
                    <td>
                        <Button onClick={(e) => { handleModalOpen(e, staff.id) }} name='removeUser' variant="danger">Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    const modalBody = () => {
        let modalBody
        switch (modalType) {
            case 'confirmation':
                modalBody = <div>
                    <p>Are you sure want to remove this user ?</p>
                    <Button variant="danger" disabled={disableButton} className='float-right' onClick={handleDelete}>
                    Delete
                </Button>
                </div>
                break;
            case 'form':
                let toBeAdded = []
                modalBody = 
                <FormGroup>
                    <FormLabel>Select staff(s) :</FormLabel>
                    <Multiselect 
                            // isObject={false}
                            displayValue="name"
                            options={dropdownList}
                            onSelect={(dropdownList, e) => {
                                setAddStaff([...addStaff, e.id])
                                }
                            }
                            onRemove={(dropdown, e) => {
                                const idx = addStaff.findIndex(i => i == e.id)
                                addStaff.splice(idx, 1)
                            } }
                    />
                    <Button variant="primary" disabled={disableButton} className='float-right' onClick={handleSubmit}>
                    Submit
                    </Button>
                </FormGroup>
                
        }
        return modalBody
    }

    return (
        <Tab.Content className="search-box">
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header >
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalBody()}
                </Modal.Body>
            </Modal>
            <Card style={{ padding: "1.5em" }}>
                <Row>
                    <Col md={12} className="align-self-start my-2">
                        <Row>

                            <Button as={Link} to={`/${currentPath[1]}/group`}>
                                Back
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="align-self-start my-2">
                        <hr style={{
                            width: "2em",
                            backgroundColor: "orange",
                            height: "0.2em"
                        }} align="left" />
                        <h4 className="box-title">STAFF GROUP</h4>
                    </Col>
                    {/* <Col md={12} className="align-self-start my-2">
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>JF</th>
                                    <th>Grade</th>
                                    <th>Office</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col> */}
                </Row>
                <Row>
                    <Col md={12} className="align-self-start my-2">
                        <Button onClick={handleModalOpen} name='addUser' variant="primary">
                            Add New
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="my-2">
                        <Form.Group className="float-right form-inline">
                            <Form.Label>SEARCH: &nbsp;</Form.Label>
                            <Form.Control type="text" style={{ width: "15vw" }} />
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffListRow()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card>
        </Tab.Content>
    )
}
// class GroupDetails extends React.Component {
//     constructor(props) {
//         super(props)
//         // this.state = {
//         //     groupId: this.props.location.state.id
//         // }
//     }

//     alertMsg() {
//         console.log(this.state.groupId);
//     }
//     render() {
//         const id = this.props.location.state
//         console.log(id)
//         const currentPath = window.location.pathname.split("/")
//         return (
//             <Tab.Content className="search-box">
//                 <Card style={{ padding: "1.5em" }}>
//                     <Row>
//                         <Col md={12} className="align-self-start my-2">
//                             <Row>

//                                 <Button as={Link} to={`/${currentPath[1]}/group`}>
//                                     Back
//                                 </Button>
//                             </Row>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={12} className="align-self-start my-2">
//                             <hr style={{
//                                 width: "2em",
//                                 backgroundColor: "orange",
//                                 height: "0.2em"
//                             }} align="left" />
//                             <h4 className="box-title">STAFF GROUP</h4>
//                         </Col>
//                         <Col md={12} className="align-self-start my-2">
//                             <Table striped hover>
//                                 <thead>
//                                     <tr>
//                                         <th>#</th>
//                                         <th>Username</th>
//                                         <th>Name</th>
//                                         <th>JF</th>
//                                         <th>Grade</th>
//                                         <th>Office</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                 </tbody>
//                             </Table>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md={12} className="align-self-start my-2">
//                             <Button onClick={() => this.alertMsg()}>
//                                 Add New
//                             </Button>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md="12" className="my-2">
//                             <Form.Group className="float-right form-inline">
//                                 <Form.Label>SEARCH: &nbsp;</Form.Label>
//                                 <Form.Control type="text" style={{ width: "15vw" }} />
//                             </Form.Group>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col md="12" className="my-2">
//                             <Table striped bordered hover>
//                                 <thead>
//                                     <tr>
//                                         <th>#</th>
//                                         <th>Username</th>
//                                         <th>Name</th>
//                                         <th>JF</th>
//                                         <th>Grade</th>
//                                         <th>Office</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                 </tbody>
//                             </Table>
//                         </Col>
//                     </Row>
//                 </Card>
//             </Tab.Content>
//         )
//     }
// }

export default GroupDetails