import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Modal, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { exchangeBazaarItem } from '../apis/BazaarExchangeApi'

const BazaarItemDetail = (props)=> {

    const location = useLocation()
    const [item, setItem] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const itemId = location.state.itemId

    const loadItemDetails = ()=> {
        const index = props.data.findIndex(item=> item.id === itemId)
        setItem(props.data[index])
    }

    const handleExchangeItem = ()=> {
        setLoading(true)
        exchangeBazaarItem(props.userProfile.id, itemId)
            .then(result=> {
                console.log(result)
                setLoading(false)
                setShowModal(false)
            })
    }

    const titleStyle = {
        color: '#838e9b',
        fontFamily: 'Verdana',
        textTransform: 'uppercase'
    }

    useEffect(() => {
        loadItemDetails()
    }, [])

    if(!itemId) {
        return (
            <div style={{padding: '16px'}}>
                <hr style={{
                    width: "2em",
                    backgroundColor: "orange",
                    height: "0.2em"
                }} align="left"/>
                <h5>REWARD DETAILS</h5>
                <br />
                <h5>404</h5>
            </div>
        )
    }

    return (
        <div style={{padding: '16px'}}>
            <hr style={{
                width: "2em",
                backgroundColor: "orange",
                height: "0.2em"
            }} align="left"/>
            <h5>REWARD DETAILS</h5>
            <Row style={{paddingTop: '16px', paddingBottom: '16px'}}>
                <Col>
                    <img 
                        className='float-right'
                        src={item.image}
                        alt={item.name}
                    />
                </Col>
                <Col className='my-auto'>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>Stock Left: {item.stockAmount - item.soldAmount}</p>
                    <p>Exchange Rate: {item.exchangeRate} Carrots</p>
                    <Button variant='success' onClick={()=> setShowModal(true)}>Exchange</Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={()=> setShowModal(false)}>
                <Modal.Header >
                    <Modal.Title>Exchange Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Continue to buy {item.name}?
                    <br />
                    <Button variant="success" className='float-right' onClick={handleExchangeItem}>
                        {isLoading ? 'Loading…' : 'Exchange'}
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    data: state.bazaarItemReducer.data,
    userProfile: state.userReducer.profile
})

export default connect(mapStateToProps, null)(BazaarItemDetail)