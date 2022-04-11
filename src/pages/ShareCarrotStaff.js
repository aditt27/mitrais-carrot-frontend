import { Component, useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Modal, Button, Alert, Spinner } from 'react-bootstrap'
import { getAllUsers } from '../apis/user'
import { createNewTransaction, getTransactionsByManager } from '../apis/transaction'
import { Pagination } from '@mui/material'
import { getTableStartIndexByTen } from '../utils/HelperFunctions'

function StaffListRow(props) {
    const { staffList } = props
    return staffList.map((st, i) => {
        return (
            <option value={st.id} key={i}>{st.name}</option>
        )
    })
}

export const btnRewardStyle = {
    fontWeight: "bold",
    backgroundColor: "#FF5722",
    boxShadow: "-2px 6px 33px -8px rgb(255 87 34)",
    border: "1px solid #ff5722"
}

function RewardCarrotModal(props) {
    const [staffList, setStaffList] = useState([])
    const [shareCarrotMsg, setShareCarrotMsg] = useState('')
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        getAllUsers().then(res => {
            setStaffList(res)
        }).then(() => setLoading(false))
    }, [])

    function handleRewardCarrotSubmit(e) {
        setLoading(true)
        setShareCarrotMsg('')
        e.preventDefault()
        const data = {
            receiverId: e.target.receiver.value,
            amount: e.target.amount.value,
            notes: e.target.note.value
        }
        createNewTransaction(data).then(res => {
            setShareCarrotMsg(res)
            if (res === "Success") {
                props.onHideModal(false)
                props.updateBarn()
            }
        }).finally(() => setLoading(false))
    }

    return (
        <Modal show={props.showShareCarrotModal} backdrop="static" keyboard={false} centered>
            <Form onSubmit={handleRewardCarrotSubmit}>
                <Modal.Header className="m-2">
                    <Modal.Title>REWARD CARROT</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-2">
                    <Form.Group className="pb-4">
                        <Form.Label htmlFor="#receiver">RECIPIENT</Form.Label>
                        <Form.Control as="select" name="receiver" id="receiver" disabled={isLoading}>
                            <StaffListRow staffList={staffList} />
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="pb-4">
                        <Form.Label htmlFor="#amount">CARROT AMOUNT</Form.Label>
                        <Form.Control name="amount" id="amount" type="number" min="1" defaultValue="0" disabled={isLoading} />
                    </Form.Group>
                    <Form.Group className="pb-4">
                        <Form.Label htmlFor="#note">NOTE</Form.Label>
                        <Form.Control as="textarea" rows="4" id="note" name="note" required disabled={isLoading} />
                    </Form.Group>
                    {isLoading && <div className="text-center"><Spinner variant="primary" animation="border" /></div>}
                    {shareCarrotMsg.length > 0 && shareCarrotMsg !== 'Success' && (<Alert variant="danger">{shareCarrotMsg}</Alert>)}
                    {shareCarrotMsg.length > 0 && shareCarrotMsg === 'Success' && (<Alert variant="success">{shareCarrotMsg}</Alert>)}
                </Modal.Body>
                <Modal.Footer>
                    <div className="float-right">
                        <Button variant="link" className="m-2" onClick={() => props.onHideModal(true)}>CANCEL</Button>
                        <Button type="submit" style={btnRewardStyle} className="m-2">REWARD NOW</Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
class ShareCarrotStaff extends Component {
    
    state = {
        showShareCarrotModal: false,
        transactionList: {
            transactions: [],
            currentPage: 0,
            totalPages: 0
        },
        startNumber: 0
    }

    async componentDidMount() {
        this.fetchTransaction(0)
    }


    handleShowShareCarrotModal = async (isCancel) => {
        const transactionList = this.state.transactionList
        if (isCancel === false) {
            const { transactions, page } = await getTransactionsByManager(0)
            transactionList.transactions = transactions
            transactionList.currentPage = page
        }
        this.setState(prev => {
            return {showShareCarrotModal: !prev.showShareCarrotModal, transactionList: transactionList}
        })
    }

    TransactionListRow = () => {
        const { transactions, currentPage } = this.state.transactionList
        let index = getTableStartIndexByTen(currentPage + 1)

        return transactions.map((tr, i) => {
            return (
                <tr key={i}>
                    <td>{index++}</td>
                    <td>{tr.rewardedTo}</td>
                    <td>{tr.carrot}</td>
                    <td>{tr.note}</td>
                    <td>{tr.rewardedAt}</td>
                </tr>
            )
        })
    }

    fetchTransaction = (page) => {
        this.props.onLoading(true)
        getTransactionsByManager(page).then(res => {
            const { transactions, page, totalPages } = res
            this.setState({
                transactionList: {
                    transactions: transactions,
                    currentPage: page,
                    totalPages: totalPages
                }
            })
        }).finally(() => this.props.onLoading(false))
    }

    render() {
        return (
            <Container className="px-4">
                <Row>
                    <Col md="12" className="my-2 text-center">
                        <Button onClick={() => this.handleShowShareCarrotModal(true)}>REWARD CARROT</Button>
                        {this.state.showShareCarrotModal && <RewardCarrotModal showShareCarrotModal={true} onHideModal={this.handleShowShareCarrotModal} updateBarn={this.props.updateBarn} onLoading={this.props.onLoading} />}
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="my-2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Rewarded to</th>
                                    <th>Carrot</th>
                                    <th>Note</th>
                                    <th>Rewarded at</th>
                                </tr>
                            </thead>
                            <tbody>
                                <this.TransactionListRow />
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="12" className="mb-4">
                        <Pagination color="primary" className="float-right" count={this.state.transactionList.totalPages} page={this.state.transactionList.currentPage + 1} onChange={(_, page) => this.fetchTransaction(page - 1)} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShareCarrotStaff