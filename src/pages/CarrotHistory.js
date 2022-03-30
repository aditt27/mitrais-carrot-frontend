import React from 'react'
import { Button, Col, Image, Row } from 'react-bootstrap'
import CarrotTransPicture from '../assets/img/mc-icon-transaction.png'
import CarrotHistoryBazaar from '../components/CarrotHistoryBazaar'
import CarrotHistoryEarned from '../components/CarrotHistoryEarned'
import CarrotHistoryShared from '../components/CarrotHistoryShared'

class CarrotHistory extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            tableView: 'bazaar'
        }
    }

    render() {

        const transactionCardStyle = {
            borderRadius: '5px',
            backgroundColor: '#523bf0',
            color: 'white',
            padding: '15px',

        }

        const transactionCardMiddleStyle = {
            borderRadius: '5px',
            backgroundColor: '#523bf0',
            color: 'white',
            padding: '15px',
            marginLeft: '1em',
            marginRight: '1em'
        }

        const rowCardStyle = {
            paddingLeft: '1em',
            paddingRight: '1em',
            paddingBottom: '1em'
        }

        let tableComponent
        switch(this.state.tableView) {
            case 'bazaar':
                tableComponent = <CarrotHistoryBazaar />
                break
            case 'shared':
                tableComponent = <CarrotHistoryShared />
                break
            case 'earned':
                tableComponent = <CarrotHistoryEarned />
                break
            default:
                break
        }

        return(
            <div style={{padding: '1em'}}>
                
                <Row style={rowCardStyle}>
                    <Col style={transactionCardStyle}>
                        <Row>
                            <Col xs={6}>
                                <Image
                                    src={CarrotTransPicture} 
                                    width={100}
                                    alt='Carrot Transaction'
                                    roundedCircle
                                />
                            </Col>
                            <Col className='my-auto'>
                                <h4>Earned</h4>
                                <Button size='sm' name='earned' variant='secondary' onClick={(e)=>this.setState({tableView: e.target.name})}>View</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={transactionCardMiddleStyle}>
                        <Row>
                            <Col xs={6}>
                                <Image
                                    src={CarrotTransPicture} 
                                    width={100}
                                    alt='Carrot Transaction'
                                    roundedCircle
                                />
                            </Col>
                            <Col className='my-auto'>
                                <h4>Shared</h4>
                                <Button size='sm' name='shared' variant='secondary' onClick={(e)=>this.setState({tableView: e.target.name})}>View</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={transactionCardStyle}>
                        <Row>
                            <Col xs={6}>
                                <Image
                                    src={CarrotTransPicture} 
                                    width={100}
                                    alt='Carrot Transaction'
                                    roundedCircle
                                />
                            </Col>
                            <Col className='my-auto'>
                                <h4>Bazaar</h4>
                                <Button size='sm' name='bazaar' variant='secondary' onClick={(e)=>this.setState({tableView: e.target.name})}>View</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>  
                {tableComponent}
            </div>
        )
    }
}

export default CarrotHistory