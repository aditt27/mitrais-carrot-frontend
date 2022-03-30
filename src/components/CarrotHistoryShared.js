import { Pagination } from '@mui/material'
import React from 'react'
import { Table } from 'react-bootstrap'

class CarrotHistoryShared extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            itemPerPage: 10
        }
    }

    render() {

        return(
            <div>
                <hr style={{
                            width: "2em",
                            backgroundColor: "orange",
                            height: "0.2em"
                        }} align="left"/>
                        <h5>MY SHARED HISTORY</h5>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                <div style={{justifyContent:'end', display: 'flex', paddingBottom: '1em'}} >
                    <Pagination
                        color='primary'
                        count={0}
                        page={2}
                    />
                </div>
            </div>
        )
    }
}

export default CarrotHistoryShared