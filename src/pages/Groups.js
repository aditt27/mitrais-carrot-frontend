import axios from "axios";
import React from "react"
import { Card, Col, Row, Tab, Form, Table, Button, ButtonGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addGroup, deleteGroup, editGroup } from "../apis/group";
import GroupForm from "../components/EditGroupForm";

export default class Groups extends React.Component {
    constructor() {
        super()
        this.state = {
            groupList: [],
            modalShow: false,
            modalTitle: '',
            modalType: '',
            formType: '',
            formDisable: false,
            formName: '',
            formManager: '',
            formCarrot: 0,
            formNote: '',
            editId: -1,
            deleteId: -1,
            currentPage: 0,
            totalPages: 0,
            validated: false
        }

    }
    async loadData(page = 0, size = 2) {
        let result = {
            groups: [],
            currentPage: 0,
            totalPages: 0
        }
        await axios.get(`http://localhost:8081/api/v1/group/?page=${page}`).then(res => {
            const data = res.data.result
            if (data.currentPageContent) {
                let no = 1
                const group = data.currentPageContent
                group.forEach(element => {
                    result.groups.push({
                        number: no++,
                        groupId: element.id,
                        groupName: element.groupName,
                        manager: element.manager,
                        notes: element.notes,
                        points: element.points,
                    })
                });
                result.currentPage = data.currentPage
                result.totalPages = data.totalPages
            }
        })
        this.setState({ groupList: result.groups, currentPage: result.currentPage, totalPages: result.totalPages })
    }

    async componentDidMount() {
        this.loadData()

    }

    handleModalOpen = (e, groupId = undefined) => {
        switch (e.target.name) {
            case 'addGroup':
                this.setState({
                    modalTitle: 'Add New Group',
                    modalType: 'form',
                    formType: e.target.name
                })
                break;
            case 'editGroup':
                const idx = this.state.groupList.findIndex(i => i.groupId == groupId)
                const toEdit = this.state.groupList[idx]
                this.setState({
                    modalTitle: 'Edit Group',
                    modalType: 'form',
                    formType: e.target.name,
                    formName: toEdit.groupName,
                    formManager: toEdit.manager,
                    formCarrot: toEdit.points,
                    formNote: toEdit.notes,
                    editId: groupId
                })
                break;
            case 'deleteGroup':
                this.setState({
                    modalTitle: 'Delete Group',
                    modalType: 'confirmation',
                    deleteId: groupId
                })
            default:
                break;
        }
        this.setState({ modalShow: true })
    }

    handleModalClose = () => {
        this.setState({ modalShow: false })
    }
    

    handleValueChange = (e) => {
        if(e.target.name === 'formCarrot'){
            if(e.target.value < 0) {
                return (
                    <Form.Text>Carrot can't be lower than zero</Form.Text>
                )
            }
        }
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = () => {
        console.log(this.state.formType)
        switch (this.state.formType) {
            case 'addGroup':
                this.setState({formDisable: true})
                addGroup({
                    groupName: this.state.formName,
                    managerId: this.state.formManager,
                    notes: this.state.formNote,
                    points: this.state.formCarrot
                })
                .then(res => {
                    this.setState({
                        modalShow: false,
                        modalTitle: '',
                        modalType: '',
                        formType: '',
                        formDisable: false,
                        formName: '',
                        formManager: '',
                        formCarrot: 0,
                        formNote: ''
                    })
                    this.loadData(this.state.currentPage)
                })
                break;
            case 'editGroup':
                this.setState({formDisable: true})
                editGroup({
                    groupId: this.state.editId,
                    groupName: this.state.formName,
                    managerId: this.state.formManager,
                    notes: this.state.formNote,
                    points: this.state.formCarrot
                })
                .then(res => {
                    this.setState({
                        modalShow: false,
                        modalTitle: '',
                        modalType: '',
                        formType: '',
                        formDisable: false,
                        formName: '',
                        formManager: '',
                        formCarrot: 0,
                        formNote: '',
                        editId: -1
                    })
                    this.loadData(this.state.currentPage)
                })
                break;
            default:
                break;

        }
    }

    handleDeleteGroup = () => {
        deleteGroup(this.state.deleteId)
        .then(res => {
            this.setState({
                modalShow: false,
                deleteId: -1
            })
            this.loadData(this.state.currentPage)
        })
    }

    groupListRow() {
        const currentPath = window.location.pathname.split("/")
        const { groupList } = this.state
        return groupList.map((group, i) => {
            return (
                <tr key={i}>
                    <td>{group.number}</td>
                    <td>{group.groupName}</td>
                    <td>{group.manager}</td>
                    <td>{group.points}</td>
                    <td>{group.notes}</td>
                    <td>
                        <ButtonGroup>
                            {/* <Button onClick={() => alert(currentPath[1])}>Details</Button> */}
                            <Button 
                                as={Link} 
                                to={`/${currentPath[1]}/groupDetails`}
                                state={{id: group.groupId}}
                                >
                                    Details
                            </Button>
                            <Button style={{ backgroundColor: "orange" }} onClick={(e) => this.handleModalOpen(e, group.groupId)} name='editGroup'>Edit</Button>
                            <Button onClick={(e)=>{this.handleModalOpen(e, group.groupId)}} name='deleteGroup' style={{ backgroundColor: "red" }}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        const {
            modalShow,
            modalTitle,
            modalType,
            formDisable,
            formName,
            formManager,
            formCarrot,
            formNote,
        } = this.state

        let modalBody
        switch (modalType) {
            case 'form':
                modalBody = (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name='formName' disabled={formDisable} value={formName} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Manager: </Form.Label>
                            <Form.Control type="text" name='formManager' disabled={formDisable} value={formManager} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Carrot: </Form.Label>
                            <Form.Control type="number" name='formCarrot' disabled={formDisable} value={formCarrot} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes: </Form.Label>
                            <Form.Control as="textarea" rows={3} name='formNote' disabled={formDisable} value={formNote} onChange={this.handleValueChange} />
                        </Form.Group>
                        <Button variant="primary" className="float-right" disabled={formDisable} onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                )
                break;
            case 'confirmation':
                modalBody = <div>
                    <p>Are you sure want to delete this item?</p>
                    <Button variant="danger" className='float-right' disabled={formDisable} onClick={this.handleDeleteGroup}>
                        Delete
                    </Button>
                </div>
                break;
        }
        return (
            <Tab.Content className="search-box">
                <Modal show={modalShow} onHide={this.handleModalClose}>
                    <Modal.Header>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalBody}
                    </Modal.Body>
                </Modal>
                <Card style={{ padding: "1.5em" }}>
                    <Row>
                        <Col md={12} className="align-self-start my-2">
                            <hr style={{
                                width: "2em",
                                backgroundColor: "orange",
                                height: "0.2em"
                            }} align="left" />
                            <h4 className="box-title">Staff Group List</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="align-self-start my-2">
                            <Button onClick={this.handleModalOpen} name='addGroup'>
                                Add New
                            </Button>

                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="my-2">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Group Name</th>
                                        <th>Manager Name</th>
                                        <th>Carrot</th>
                                        <th>Note</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.groupListRow()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
            </Tab.Content>
        )
    }
}