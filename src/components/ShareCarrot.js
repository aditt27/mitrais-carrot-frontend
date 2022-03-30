import { Component} from 'react'
import { Container, Row, Col, Table, Nav } from 'react-bootstrap'
import { getUserByUsername } from '../apis/user'
import { getTransactionsByManager, getAllTransactions } from '../apis/transaction'
import ShareCarrotStaff from './ShareCarrotStaff'
import ShareCarrotGroup from './ShareCarrotGroup'
import store from '../stores'
class ShareCarrot extends Component {
    
    state = {
        currentPage: 'staff',
        manager: {}
    }

    async componentDidMount() {
        const { userData } = store.getState().authReducer
        const user = await getUserByUsername(userData.sub)
        const totalCarrot = await this.getTotalCarrot()
        const { transactions } = await getTransactionsByManager(-1)
        const rewarded = transactions.reduce((prev, next) => prev + next.carrot, 0)
        
        user.result.totalCarrot = totalCarrot
        user.result.rewardedCarrot = rewarded
        
        this.setState({
            manager: user.result
        })
    }

    getTotalCarrot = async () => {
        let carrot = 0
        await getAllTransactions(-1).then(res => {
            carrot = res.transactions.reduce((prev, next) => prev + next.carrot, 0)
        })
        return carrot
    }

    setCurrentPage = (page) => {
        this.setState({currentPage: page})
    }

    render() {
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
                                    <td className="text-right">{this.state.manager.rewardedCarrot}</td>
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
                    <Col>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link active={this.state.currentPage === 'staff'} onClick={() => this.setCurrentPage('staff')}>STAFF</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link active={this.state.currentPage === 'group'} onClick={() => this.setCurrentPage('group')}>STAFF GROUP</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.currentPage === 'staff' ? (<ShareCarrotStaff />) : (<ShareCarrotGroup />)}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ShareCarrot