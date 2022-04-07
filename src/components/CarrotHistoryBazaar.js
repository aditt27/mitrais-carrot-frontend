import { Pagination } from '@mui/material'
import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getExchangeHistoryBazaarItem } from '../apis/BazaarExchangeApi'
import { saveExchangeHistoryCurrentPage } from '../stores/exchangeHistory'

class CarrotHistoryBazaar extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            itemPerPage: 10
        }
    }

    componentDidMount() {
        this.loadExchangeHistory()
    }

    loadExchangeHistory() {
        getExchangeHistoryBazaarItem(
            true, 
            0, 
            this.state.itemPerPage,
            'userId',
            this.props.userId
        ).then(result=> {
            console.log(result)
            this.props.saveItem(
                result.result.currentPageContent,
                result.result.currentPage,
                result.result.totalPages,
                this.props.userId
            )
        })
    }

    handlePageChange = (e, page)=> {
        getExchangeHistoryBazaarItem(
            true, 
            page-1, 
            this.state.itemPerPage,
            'userId',
            this.props.userId
        ).then(result=> {
            console.log(result)
            this.props.saveItem(
                result.result.currentPageContent,
                result.result.currentPage,
                result.result.totalPages,
                this.props.userId
            )
        })
    }

    render() {

        const transactionCardStyle = {
            borderRadius: '5px',
            backgroundColor: '#523bf0',
            color: 'white',
            padding: '15px',

        }

        const rowCardStyle = {
            paddingLeft: '1em',
            paddingRight: '1em',
            paddingBottom: '1em'
        }

        return(
            <div>
                <hr style={{
                    width: "2em",
                    backgroundColor: "orange",
                    height: "0.2em"
                }} align="left"/>
                <h5>MY BAZAAR HISTORY</h5>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Exchange Rate</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map(item=> {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.itemName}</td>
                                <td>{item.itemDescription}</td>
                                <td>{item.exchangeRate}</td>
                                <td>{item.exchangeStatus}</td>
                                <td>{item.exchangeDate}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
                <div style={{justifyContent:'end', display: 'flex', paddingBottom: '1em'}} >
                    <Pagination
                        color='primary'
                        count={this.props.totalPages}
                        page={this.props.currentPage + 1}
                        onChange={(e, page)=> this.handlePageChange(e, page)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> ({
    data: state.exchangeHistoryReducer.data,
    currentPage: state.exchangeHistoryReducer.currentPage,
    totalPages: state.exchangeHistoryReducer.totalPages,
    userId: state.authReducer.userData.id,
})

const mapDispatchToProps = (dispatch)=> ({
    saveItem: (data, currentPage, totalPages, userId)=> dispatch(saveExchangeHistoryCurrentPage({
        data, currentPage, totalPages, userId
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(CarrotHistoryBazaar)