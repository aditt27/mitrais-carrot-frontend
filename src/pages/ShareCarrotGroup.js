import { faPaperPlane, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component, useState } from 'react'
import { Container, Row, Table, Col, Modal, Button, Form, Alert, Spinner, ButtonGroup } from 'react-bootstrap'
import { createNewGroupTransaction } from '../apis/transaction'
import store from '../stores'
import { btnRewardStyle } from './ShareCarrotStaff'
import { Pagination } from '@mui/material'
import apiClient from '../apis'
import { getTableStartIndexByTen } from '../utils/HelperFunctions'

function SendCarrotModal(props) {
    const group = props.group
    const [sendCarrotMsg, setSendCarrotMsg] = useState("")
    const [isLoading, setLoading] = useState(false)

    function handleSendCarrotSubmit(e) {
        setSendCarrotMsg("")
        setLoading(true)
        e.preventDefault()
        const groupId = e.target.groupid.value
        createNewGroupTransaction(groupId, props.managerId).then(res => {
            setLoading(false)
            setSendCarrotMsg(res)
            if (res === 'Success') {
                setTimeout(() => {
                    props.onHideModal(false)
                }, 600);
            }
        })
    }
    
    return (
        <Modal show={props.show} onHide={props.onHideModal} keyboard={false} backdrop="static" centered>
            <Modal.Header className="m-2">
                <Modal.Title>
                    SEND CARROT
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-4">
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
                            <th>Members</th>
                            <td>{group.users.length}</td>
                        </tr>
                        <tr>
                            <th>Year</th>
                            <td>2022</td>
                        </tr>
                    </tbody>
                </Table>
                {group.users.length === 0 ? (<Alert variant="warning">Group has empty member</Alert>) : (<p>Are you sure you want to send now?</p>)}
                {isLoading && <div className="text-center"><Spinner variant="primary" animation="border" /></div>}
                {sendCarrotMsg.length > 0 && <Alert variant={sendCarrotMsg === "Success" ? "success" : "danger"}>{sendCarrotMsg}</Alert>}
            </Modal.Body>
            <Modal.Footer className="m-2">
                <Form onSubmit={handleSendCarrotSubmit}>
                    <Button variant="link" className="mr-4" onClick={() => props.onHideModal()}>CANCEL</Button>
                    <Button type="submit" style={btnRewardStyle} disabled={group.users.length === 0}>SEND NOW</Button>
                    <input type="hidden" name="groupid" value={group.id} />
                </Form>
            </Modal.Footer>
        </Modal>
    )
}
class ShareCarrotGroup extends Component {

    state = {
        currentPage: 0,
        totalPages: 0,
        groupList: [],
        showGroupMemberModal: false,
        showSendCarrotModal: false,
        manager: {},
        selectedGroupId: 0,
    }

    componentDidMount() {
        this.fetchGroupList()
    }

    fetchGroupList = async (page = 0) => {
        this.props.onLoading(true)
        let init = {
            currentPage: this.state.currentPage,
            totalPages: this.state.totalPages,
            groupList: this.state.groupList
        }
        const { profile } = store.getState().userReducer
        await apiClient.get(`/group?page=${page}`).then(res => {
            if (res.data.message === 'Success') {
                const data = res.data.result
                const g = data.currentPageContent.filter(it => it.manager === profile.id.toString())
                if (g.length > 0) {
                    g.forEach((data, _) => {
                        data.users = data.users.filter(it => it.role === 'Staff')
                    })
                    init.currentPage = data.currentPage
                    init.totalPages = data.totalPages
                    init.groupList = g
                }
            }
        }).catch(_ => {})
        this.props.onLoading(false)
        this.setState({
            currentPage: init.currentPage,
            totalPages: init.totalPages,
            groupList: init.groupList,
            manager: profile
        })
    }

    GroupListRow = () => {
        const { groupList, currentPage } = this.state
        let index = getTableStartIndexByTen(currentPage + 1)

        return groupList.map((group, i) => {
            return (
                <tr key={i}>
                    <td>{index++}</td>
                    <td>{group.groupName}</td>
                    <td>{Math.floor(group.points / group.users.length)}</td>
                    <td>{group.users.length}</td>
                    <td>{group.points}</td>
                    <td>{group.notes}</td>
                    <td className="text-center">
                        <ButtonGroup>
                            <Button id={`group-member-btn-${group.id}`} style={{marginRight: "0.25em"}} onClick={() => this.handleShowGroupMemberModal(i)}>
                                <FontAwesomeIcon icon={faPeopleGroup}  />
                            </Button>
                            <Button id={`send-carrot-btn-${group.id}`} variant="success" style={{marginLeft: "0.25em"}} onClick={() => this.handleShowSendCarrotModal(i)}>
                                <FontAwesomeIcon icon={faPaperPlane}  />
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
    }

    handleShowGroupMemberModal = (i) => {
        this.setState({showGroupMemberModal: true, selectedGroupId: i})
    }

    handleShowSendCarrotModal = (i) => {
        this.setState({showSendCarrotModal: true, selectedGroupId: i})
    }

    onHideModal = (isCancel = true) => {
        this.setState({showGroupMemberModal: false, showSendCarrotModal: false})

        if (isCancel === false) {
            this.props.updateBarn()
        }
    }

    GroupMemberModal = () => {
        const { selectedGroupId, groupList } = this.state
        const group = groupList[selectedGroupId]
        
        return (
            <Modal show={this.state.showGroupMemberModal} onHide={this.onHideModal} centered backdrop="static" keyboard={false}>
                <Modal.Header className="m-2">
                    <Modal.Title>
                        MEMBER LIST
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-2">
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
                                        <th>Carrot</th>
                                        <th>JF</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        group.users.map((u, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{u.name}</td>
                                                    <td>{u.points}</td>
                                                    <td>{u.jobFamily}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="m-2">
                    <Button className="float-right" variant="info" onClick={this.onHideModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        const { selectedGroupId, groupList } = this.state
        const group = groupList[selectedGroupId]

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
                        {this.state.showGroupMemberModal && (<this.GroupMemberModal />)}
                        {this.state.showSendCarrotModal && (<SendCarrotModal group={group} show={true} onHideModal={this.onHideModal} updateBarn={this.props.updateBarn} managerId={this.props.manager.id} />)}
                    </Col>
                    <Col md="12">
                        <Pagination color="primary" className="float-right mb-2" count={this.state.totalPages} page={this.state.currentPage + 1} onChange={(_, page) => this.fetchGroupList(page - 1)} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShareCarrotGroup