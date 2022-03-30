import { Component } from 'react'
import { Col, Container, Pagination, Row, Table } from 'react-bootstrap'
import { getAllTransactions } from '../apis/transaction'

class EarnHistoryStaff extends Component {

    state = {
        transactionList: [],
        currentPage: 0,
        totalPages: 0
    }

    componentDidMount() {
        this.fetchTransactions(0)
    }

    fetchTransactions = (page) => {
        getAllTransactions(page, false).then(res => {
            this.setState({
                transactionList: res.transactions,
                currentPage: res.page,
                totalPages: res.totalPages
            })
        })
    }

    TransactionListRow = () => {
        const { transactionList } = this.state
        return transactionList.map((tr, i) => {
            return (
                <tr key={i}>
                    <td>{tr.no}</td>
                    <td>{tr.earnedFrom}</td>
                    <td>{tr.total}</td>
                    <td>{tr.date}</td>
                    <td>{tr.note}</td>
                </tr>
            )
        })
    }

    PaginationItems = () => {
        const { totalPages, currentPage } = this.state
        let paginationItems = []
        for (let i = 1; i <= totalPages; i++) {
            paginationItems.push(
                <Pagination.Item key={i} activeLabel="" active={i === currentPage + 1} onClick={() => this.fetchTransactions(i - 1)}>{i}</Pagination.Item>
            )
        }
        return paginationItems
    }

    render() {
        return (
            <Container className="p-4">
                <Row>
                    <Col>
                        <hr style={{
                            width: "2em",
                            backgroundColor: "orange",
                            height: "0.2em"
                        }} align="left"/>
                        <h5>MY EARN HISTORY</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Earned From</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                    <th>Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                <this.TransactionListRow />
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Pagination className="float-right">
                            <this.PaginationItems />
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EarnHistoryStaff