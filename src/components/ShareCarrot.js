import { Component } from 'react'
import { Container, Row, Col, Form, Table, Modal, Button } from 'react-bootstrap'
import Axios from 'axios'

class ShareCarrot extends Component {
    
    state = {
        showShareCarrotModal: false,
        transactionList: [],
        page: 0
    }

    componentDidMount() {
        Axios.get(`http://localhost:8081/api/v1/transaction?page=${this.state.page}`).then(res => {
            if (res.data.message === 'Success') {
                const data = res.data.result
                const tr = data.currentPageContent
                let transactions = []
                let i = 1
                tr.forEach((t) => {
                    transactions.push({
                        no: i++,
                        rewardedTo: t.receiver.name,
                        carrot: t.amount,
                        note: t.notes,
                        rewardedAt: t.transactionDate
                    })
                })
                this.setState({ transactionList: transactions })
            }
        })
    }

    handleShowShareCarrotModal = () => {
        this.setState((prev) => {
            return {showShareCarrotModal: !prev.showShareCarrotModal}
        })
    }

    TransactionListRow = () => {
        const { transactionList } = this.state
        return transactionList.map((tr, i) => {
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
                                    <td className="text-right">222</td>
                                </tr>
                                <tr>
                                    <th>Rewarded Carrot</th>
                                    <td className="text-right">22</td>
                                </tr>
                                <tr>
                                    <th>My Basket</th>
                                    <td className="text-right">222</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className="my-2 text-center">
                        <Button onClick={this.handleShowShareCarrotModal}>REWARD CARROT</Button>
                        <Modal show={this.state.showShareCarrotModal} onHide={this.handleShowShareCarrotModal} centered>
                            <Modal.Header>
                                <Modal.Title>REWARD CARROT</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>SEARCH: &nbsp;</Form.Label>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </Modal>
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
                </Row>
            </Container>
        )
    }
}

export default ShareCarrot