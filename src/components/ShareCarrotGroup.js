import { faPaperPlane, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { Component } from 'react'
import { Container, Row, Table, Col, Pagination, Modal, Button, Form, Alert } from 'react-bootstrap'
import { createNewGroupTransaction } from '../apis/transaction'
import store from '../stores'
import { btnRewardStyle } from './ShareCarrotStaff'

class ShareCarrotGroup extends Component {

    state = {
        currentPage: 0,
        totalPages: 0,
        groupList: [],
        showGroupMemberModal: false,
        showSendCarrotModal: false,
        manager: {},
        failedSendCarrotMsg: ''
    }

    async componentDidMount() {
        let init = {}
        const { profile } = store.getState().userReducer
        await axios.get(`http://localhost:8081/api/v1/group`).then(res => {
            if (res.data.message === 'Success') {
                const data = res.data.result
                console.log(data)
                init.currentPage = data.currentPage
                init.totalPages = data.totalPages
                init.groupList = data.currentPageContent.filter(it => it.manager === profile.id.toString())
            }
        })
        
        this.setState({
            currentPage: init.currentPage,
            totalPages: init.totalPages,
            groupList: init.groupList,
            manager: profile
        })
    }

    GroupListRow = () => {
        const { groupList } = this.state
        return groupList.map((group, i) => {
            return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{group.groupName}</td>
                    <td>{group.points / group.users.length}</td>
                    <td>{group.users.length}</td>
                    <td>{group.points}</td>
                    <td>{group.notes}</td>
                    <td className="text-center">
                        <Button style={{marginRight: "0.25em"}} onClick={this.handleShowGroupMemberModal}>
                            <FontAwesomeIcon icon={faPeopleGroup}  />
                        </Button>
                        <Button variant="success" style={{marginLeft: "0.25em"}} onClick={this.handleShowSendCarrotModal}>
                            <FontAwesomeIcon icon={faPaperPlane}  />
                        </Button>
                        {this.state.showGroupMemberModal && (<this.GroupMemberModal index={i} />)}
                        {this.state.showSendCarrotModal && (<this.SendCarrotModal index={i} />)}
                    </td>
                </tr>
            )
        })
    }

    handleShowGroupMemberModal = () => {
        this.setState({showGroupMemberModal: true})
    }

    handleShowSendCarrotModal = () => {
        this.setState({showSendCarrotModal: true})
    }

    onHideModal = () => {
        this.setState({showGroupMemberModal: false, showSendCarrotModal: false, failedSendCarrotMsg: ''})
    }

    GroupMemberModal = (props) => {
        const group = this.state.groupList[props.index]
        
        return (
            <Modal show={this.state.showGroupMemberModal} onHide={this.onHideModal}>
                <div className="p-4">
                    <Modal.Header>
                        <Modal.Title>
                            MEMBER LIST
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <strong>Group Name: </strong>
                                <p>{ group.groupName }</p>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Table bordered striped hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            group.users.map((u, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{u}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Modal.Body>
                </div>
            </Modal>
        )
    }

    handleSendCarrotSubmit = (e) => {
        e.preventDefault()
        const groupId = e.target.groupid.value
        const managerId = this.state.manager.id
        createNewGroupTransaction(groupId, managerId).then(res => {
            if (res === 'Success') {
                this.onHideModal()
            } else {
                this.setState({failedSendCarrotMsg: res})
            }
        })
    }

    SendCarrotModal = (props) => {
        const group = this.state.groupList[props.index]
        
        return (
            <Modal show={this.state.showSendCarrotModal} onHide={this.onHideModal} centered keyboard={false} backdrop="static">
                <div className="p-4">
                    <Modal.Header>
                        <Modal.Title>
                            SEND CARROT
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th>Group Name</th>
                                    <td>{group.groupName}</td>
                                </tr>
                                <tr>
                                    <th>Total Carrot</th>
                                    <td>{group.points}</td>
                                </tr>
                                <tr>
                                    <th>Year</th>
                                    <td>2022</td>
                                </tr>
                            </tbody>
                        </Table>
                        <p>Are you sure you want to send now?</p>
                        {this.state.failedSendCarrotMsg.length > 0 && (<Alert variant="danger">{this.state.failedSendCarrotMsg}</Alert>)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Form onSubmit={this.handleSendCarrotSubmit}>
                            <Button variant="link" className="m-2" onClick={() => this.onHideModal()}>CANCEL</Button>
                            <Button type="submit" className="m-2" style={btnRewardStyle}>SEND NOW</Button>
                            <input type="hidden" name="groupid" value={group.id} />
                        </Form>
                    </Modal.Footer>
                </div>
            </Modal>
        )
    }

    render() {
        return (
            <Container className="p-4">
                <Row>
                    <Col md="12" className="my-2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Group Name</th>
                                    <th>Allocation</th>
                                    <th>Member</th>
                                    <th>Total</th>
                                    <th>Note</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <this.GroupListRow />
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="12">
                        <Pagination className="float-right">

                        </Pagination>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShareCarrotGroup