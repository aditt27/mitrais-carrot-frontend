import { Component, useEffect, useState } from 'react'
import { Container, Row, Col, Form, Table, Modal, Button, Pagination } from 'react-bootstrap'
import { getAllUsers, getUserByUsername } from '../apis/user'
import { createNewTransaction, getTransactionsByManager, getAllTransactions } from '../apis/transaction'

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
    
    useEffect(() => {
        getAllUsers().then(res => {
            setStaffList(res)
        })
    }, [])

    function handleRewardCarrotSubmit(e) {
        e.preventDefault()
        const data = {
            receiverId: e.target.receiver.value,
            amount: e.target.amount.value,
            notes: e.target.note.value
        }
        createNewTransaction(data).then(res => {
            if (res === "Success") {
                props.onHideModal(false)
            }
        })
    }

    return (
        <Modal show={props.showShareCarrotModal} backdrop="static" keyboard={false} centered>
            <Form onSubmit={handleRewardCarrotSubmit}>
                <Modal.Header className="m-4">
                    <Modal.Title>REWARD CARROT</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-4">
                        <Form.Group className="pb-4">
                            <Form.Label htmlFor="#receiver">RECIPIENT</Form.Label>
                            <Form.Control as="select" name="receiver" id="receiver">
                                <StaffListRow staffList={staffList} />
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="pb-4">
                            <Form.Label htmlFor="#amount">CARROT AMOUNT</Form.Label>
                            <Form.Control name="amount" id="amount" type="number" max="50" defaultValue="0" />
                            <small>Maximum share carrot allowed is 50</small>
                        </Form.Group>
                        <Form.Group className="pb-4">
                            <Form.Label htmlFor="#note">NOTE</Form.Label>
                            <Form.Control as="textarea" rows="4" id="note" name="note"/>
                        </Form.Group>
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
class ShareCarrot extends Component {
    
    state = {
        showShareCarrotModal: false,
        transactionList: {
            transactions: [],
            currentPage: 0,
            totalPages: 0
        },
        staffList: [],
        manager: {}
    }

    async componentDidMount() {
        const { transactions, page, totalPages } = await getTransactionsByManager(0)
        const user = await getUserByUsername()
        const totalCarrot = await this.getTotalCarrot()
        user.totalCarrot = totalCarrot
        this.setState({
            transactionList: {
                transactions: transactions,
                currentPage: page,
                totalPages: totalPages
            },
            manager: user
        })
    }

    getTotalCarrot = async () => {
        let carrot = 0
        await getAllTransactions(0).then(res => {
            carrot = res.transactions.reduce((prev, next) => prev + next.carrot, 0)
        })
        return carrot
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
        const { transactions } = this.state.transactionList
        return transactions.map((tr, i) => {
            return (
                <tr key={i}>
                    <td>{tr.no}</td>
                    <td>{tr.rewardedTo}</td>
                    <td>{tr.carrot}</td>
                    <td>{tr.note}</td>
                    <td>{tr.rewardedAt}</td>
                </tr>
            )
        })
    }

    fetchTransaction = (page) => {
        getTransactionsByManager(page).then(res => {
            const { transactions, page, totalPages } = res
            this.setState({
                transactionList: {
                    transactions: transactions,
                    currentPage: page,
                    totalPages: totalPages
                }
            })
        })
    }

    StaffListRow = () => {
        const { staffList } = this.state
        return staffList.map((st, i) => {
            return (
                <option value={st} key={i}>{st}</option>
            )
        })
    }

    PaginationItems = () => {
        const { totalPages, currentPage } = this.state.transactionList
        let paginationItems = []
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <Pagination.Item key={i} active={i === currentPage + 1} activeLabel="" onClick={() => this.fetchTransaction(i - 1)}>{i}</Pagination.Item>
            )
        }
        return paginationItems
    }

    render() {
        const rewaredCarrot = this.state.transactionList.transactions.reduce((prev, next) => prev + next.carrot, 0)
        const basket = this.state.manager.points

        return (
            <Container className="px-4">
                <Row>
                    <Col md={12} className="align-self-start my-2">
                        <hr style={{
                            width: "2em",
                            backgroundColor: "orange",
                            height: "0.2em"
                        }} align="left"/>
                        <h4 className="box-title">DISTRIBUTION DETAIL</h4>
                    </Col>
                    <Col md="5" className="my-2">
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th>Year</th>
                                    <td className="text-right">2022</td>
                                </tr>
                                <tr>
                                    <th>Total Carrot</th>
                                    <td className="text-right">{this.state.manager.totalCarrot}</td>
                                </tr>
                                <tr>
                                    <th>Rewarded Carrot</th>
                                    <td className="text-right">{rewaredCarrot}</td>
                                </tr>
                                <tr>
                                    <th>My Basket</th>
                                    <td className="text-right">{basket}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="my-2 text-center">
                        <Button onClick={() => this.handleShowShareCarrotModal(true)}>REWARD CARROT</Button>
                        {this.state.showShareCarrotModal && <RewardCarrotModal showShareCarrotModal={true} onHideModal={this.handleShowShareCarrotModal} />}
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

export default ShareCarrot