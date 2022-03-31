import { Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { getNotificationByUserId } from '../apis/user'

const Notification = (props)=> {

    const [notifData, setNotifData] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const loadNotification = ()=> {
        getNotificationByUserId(
            true,
            0,
            10,
            props.userId
        ).then(result=> {
            console.log(result)
            setNotifData(result.result.currentPageContent)
            setTotalPages(result.result.totalPages)
            setCurrentPage(result.result.currentPage)
        })
    }

    const handlePageChange = (e, page)=> {
        getNotificationByUserId(
            true,
            page-1,
            10,
            props.userId
        ).then(result=> {
            console.log(result)
            setNotifData(result.result.currentPageContent)
            setTotalPages(result.result.totalPages)
            setCurrentPage(result.result.currentPage)
        })
    }

    useEffect(()=> {
        if(props.userId) {
            loadNotification()
        }
    }, [props.userId])

    return(
        <div style={{padding: '1em'}}>
            <hr style={{
                width: "2em",
                backgroundColor: "orange",
                height: "0.2em"
            }} align="left"/>
            <h5>NOTIFICATION</h5>

            <Table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                {
                    notifData.map(item=> {
                        return <tr key={item.id}>
                            <td>{item.subject}</td>
                            <td>{item.message}</td>
                            <td>{item.createdDate}</td>
                        </tr>
                    })
                }
                </tbody>
            </Table>

            <div style={{justifyContent:'end', display: 'flex'}} >
                <Pagination
                    color='primary'
                    count={totalPages}
                    page={currentPage + 1}
                    onChange={(e, page)=> handlePageChange(e, page)}
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    userId: state.authReducer.userData.id,
})

export default connect(mapStateToProps, null)(Notification)