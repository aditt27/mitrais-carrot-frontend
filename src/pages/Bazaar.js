import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import BazaarItemCard from '../components/BazaarItemCard'
import { getBazaarItem } from '../apis/BazaarItemApi'
import { connect } from 'react-redux'
import { saveCurrentPage } from '../stores/bazaarItem'

import ProfilePicture from '../assets/img/profilepicture-template.png'
import CarrotPicture from '../assets/img/mc-icon-carrot.png'
import CarrotTransPicture from '../assets/img/mc-icon-transaction.png'

class Bazaar extends React.Component {

    componentDidMount() {
        this.loadBazaarItem()
    }

    loadBazaarItem() {
        getBazaarItem(true, 0, 8,false)
            .then(result=> {
                this.props.saveItem(
                    result.result.currentPageContent,
                    result.result.currentPage,
                    result.result.totalPages
                )
            })
    }

    render() {

        const profileCardStyle = {
            borderRadius: '5px',
            backgroundColor: '#25c9f4',
            color: 'white',
            padding: '15px',

        }

        const pointsCardStyle = {
            borderRadius: '5px',
            backgroundColor: 'orange',
            color: 'white',
            padding: '15px',
            marginLeft: '1em',
            marginRight: '1em'
        }

        const transactionCardStyle = {
            borderRadius: '5px',
            backgroundColor: '#323de3',
            color: 'white',
            padding: '15px',

        }

        const rowCardStyle = {
            padding: '1em'
        }

        const bazaarItemCardsStyle = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: '1em',
            justifyContent: 'center'
        }

        return(
            <Container>
                <Row style={rowCardStyle}>
                    <Col style={profileCardStyle} className=''>
                        <Row>
                            <Col xs={4}>
                                <Image
                                    src={ProfilePicture} 
                                    width={100}
                                    alt='Profile'
                                    roundedCircle
                                />
                            </Col>
                            <Col className='my-auto'>
                                <h4>Aditya Budi</h4>
                                <p>Grade, Department</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={pointsCardStyle}>
                        <Row>
                            <Col xs={4}>
                                <Image
                                    src={CarrotPicture} 
                                    width={100}
                                    alt='Carrot Points'
                                    roundedCircle
                                />
                            </Col>
                            <Col className='my-auto'>
                                <h4>My Carrot Points:</h4>
                                <h4>500</h4>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={transactionCardStyle}>
                        <Row>
                            <Col xs={4}>
                                <Image
                                    src={CarrotTransPicture} 
                                    width={100}
                                    alt='Carrot Transaction'
                                    roundedCircle
                                />
                            </Col>
                            <Col className='my-auto'>
                                <h4>Carrot Transaction History</h4>
                                <Button variant="secondary" size="sm">
                                    View
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>  
                <div style={bazaarItemCardsStyle}>
                    {
                        this.props.data.map(item=> {
                            return <BazaarItemCard
                                title={item.name}
                                price={item.exchangeRate}
                                image={item.image}
                                key={item.id}
                            />
                        })
                    }
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state)=> ({
    data: state.bazaarItemReducer.data,
    currentPage: state.bazaarItemReducer.currentPage,
    totalPages: state.bazaarItemReducer.totalPages
})

const mapDispatchToProps = (dispatch)=> ({
    saveItem: (data, currentPage, totalPage)=> dispatch(saveCurrentPage({
        data, currentPage, totalPage
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Bazaar)