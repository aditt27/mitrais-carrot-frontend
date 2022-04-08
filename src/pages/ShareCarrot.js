import { Component} from 'react'
import { Container, Row, Col, Table, Nav, Spinner } from 'react-bootstrap'
import { getUserByUsername } from '../apis/user'
import { getTransactionsByManager } from '../apis/transaction'
import ShareCarrotStaff from './ShareCarrotStaff'
import ShareCarrotGroup from './ShareCarrotGroup'
import store from '../stores'
import apiClient from '../apis'
import { loadingStyle } from './StaffList'
class ShareCarrot extends Component {
    
    state = {
        year: '',
        currentPage: 'staff',
        manager: {},
        isLoading: false
    }

    componentDidMount() {
        this.fetchBarn()
    }

    setCurrentPage = (page) => {
        this.setState({currentPage: page})
    }

    async fetchBarn() {
        const { userData } = store.getState().authReducer
        const user = await getUserByUsername(userData.sub)
        const { transactions } = await getTransactionsByManager(-1)
        const rewarded = transactions.reduce((prev, next) => prev + next.carrot, 0)
        
        user.result.totalCarrot = user.result.points + rewarded
        user.result.rewardedCarrot = rewarded
        let year = 0
        await apiClient.get('/barn?filterBy=active-only').then(res => {
            const data = res.data.result.currentPageContent
            year = data[0].year
        })
        
        this.setState({
            manager: user.result,
            year: year
        })
    }

    handleLoading = (value) => {
        this.setState({isLoading: value})
    }

    render() {
        const basket = this.state.manager.points

        return (
            <>
                {this.state.isLoading && (<div style={{position: "fixed", top: "50%", left: "50%", zIndex: "9999"}}><Spinner animation="border" variant="primary" /></div>)}
                <Container className="px-4" style={this.state.isLoading? loadingStyle : {}}>
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
                                        <td className="text-right">{this.state.year}</td>
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
                            {this.state.currentPage === 'staff' ? (<ShareCarrotStaff updateBarn={() => this.fetchBarn()} onLoading={this.handleLoading} manager={this.state.manager} />) : (<ShareCarrotGroup updateBarn={() => this.fetchBarn()} onLoading={this.handleLoading} manager={this.state.manager} />)}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default ShareCarrot