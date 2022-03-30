import { Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getExchangeHistoryBazaarItem } from '../apis/BazaarExchangeApi'
import { saveExchangeHistoryCurrentPage } from '../stores/exchangeHistory'

const BazaarClaimed = (props)=> {

    const [itemPerPage, setItemPerPage] = useState(10)

    const loadExchangeHistory = ()=> {
        getExchangeHistoryBazaarItem(
            true, 
            0, 
            itemPerPage,
            '',
            ''
        ).then(result=> {
            console.log(result)
            props.saveItem(
                result.result.currentPageContent,
                result.result.currentPage,
                result.result.totalPages
            )
        })
    }

    const handlePageChange = (e, page)=> {
        getExchangeHistoryBazaarItem(
            true, 
            page-1, 
            itemPerPage,
            '',
            ''
        ).then(result=> {
            console.log(result)
            props.saveItem(
                result.result.currentPageContent,
                result.result.currentPage,
                result.result.totalPages
            )
        })
    }

    useEffect(()=> {
        loadExchangeHistory()
    }, [])

    return (
        <div style={{padding: '1em'}}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Requester</th>
                        <th>Reward Request</th>
                        <th>Exchange Rate</th>
                        <th>Request Date</th>
                        <th>Request Status</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.data.map(item=>{
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.username}</td>
                            <td>{item.itemName} <br/>itemId: {item.itemId}</td>
                            <td>{item.exchangeRate}</td>
                            <td>{item.exchangeDate}</td>
                            <td>{item.exchangeStatus}</td>
                        </tr>
                    })
                }
                </tbody>
            </Table>

            <div style={{justifyContent:'end', display: 'flex'}} >
                <Pagination
                    color='primary'
                    count={props.totalPages}
                    page={props.currentPage + 1}
                    onChange={(e, page)=> handlePageChange(e, page)}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    data: state.exchangeHistoryReducer.data,
    currentPage: state.exchangeHistoryReducer.currentPage,
    totalPages: state.exchangeHistoryReducer.totalPages,
    userId: state.authReducer.userData.id
})

const mapDispatchToProps = (dispatch)=> ({
    saveItem: (data, currentPage, totalPages)=> dispatch(saveExchangeHistoryCurrentPage({
        data, currentPage, totalPages, undefined
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(BazaarClaimed)