import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { saveExchangeHistoryCurrentPage } from '../stores/exchangeHistory'
import { getExchangeHistoryBazaarItem, updateStatusExchangeRequest } from '../apis/BazaarExchangeApi'
import { Pagination } from '@mui/material'

const PendingExchange = (props)=> {

    const [itemPerPage, setItemPerPage] = useState(10)
    const [modalShow, setModalShow] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [modalType, setModalType] = useState('')
    const [loading, setLoading] = useState(false)
    const [itemId, setItemId] = useState(-1)

    const loadExchangeHistory = ()=> {
        getExchangeHistoryBazaarItem(
            true, 
            0, 
            itemPerPage,
            'approveStatus',
            'pending'
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
            'approveStatus',
            'pending'
        ).then(result=> {
            console.log(result)
            props.saveItem(
                result.result.currentPageContent,
                result.result.currentPage,
                result.result.totalPages
            )
        })
    }

    const handleModalClose = ()=> {
        setModalShow(false)
        setItemId(-1)
    }

    const handleModalOpen = (e, itemId = undefined)=> {
        switch(e.target.name) {
            case 'approveRequest':
                setModalTitle('Approve Exchange Request')
                setModalType('approve')
                break
            case 'denyRequest':
                setModalTitle('Deny Exchange Request')
                setModalType('deny')
                break
            default:
                break
        }
        setItemId(itemId)
        setModalShow(true)
    }

    const handleUpdateExchangeStatus = ()=> {
        setLoading(true)

        const status = modalType==='approve'? 'approved': 'denied'
        updateStatusExchangeRequest(
            itemId, 
            status,
            props.userId
        ).then(result=> {
            console.log(result)
            setLoading(false)
            handleModalClose()
            loadExchangeHistory()
        })
    }

    useEffect(()=> {
        loadExchangeHistory()
    }, [])

    return (
        <div style={{padding: '1em'}}>
            <hr style={{
                width: "2em",
                backgroundColor: "orange",
                height: "0.2em"
            }} align="left"/>
            <h4>PENDING EXCHANGE</h4>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Requester</th>
                        <th>Reward Request</th>
                        <th>Exchange Rate</th>
                        <th>Request Date</th>
                        <th>Action</th>
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
                            <td className='text-center'>
                                    <Button className='btn-block' variant='success' onClick={(e)=>{handleModalOpen(e, item.id)}} name='approveRequest' >
                                        Approve
                                    </Button>
                                    <Button className='btn-block' variant='danger' onClick={(e)=>{handleModalOpen(e, item.id)}} name='denyRequest' >
                                        Deny
                                    </Button>
                                </td>
                        </tr>
                    })
                }
                </tbody>
            </Table>

            <div style={{justifyContent:'end', display: 'flex'}} >
                <Pagination id='pagination'
                    color='primary'
                    count={props.totalPages}
                    page={props.currentPage + 1}
                    onChange={(e, page)=> handlePageChange(e, page)}
                />
            </div>

            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to {modalType} this request?
                    <br/>
                    <Button variant="success" className='float-right' disabled={loading} onClick={handleUpdateExchangeStatus}>
                        {loading? 'loading..': modalType}
                    </Button>
                </Modal.Body>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(PendingExchange)