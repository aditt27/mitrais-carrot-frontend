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
                <h4 style={{paddingBottom: '8px'}}>My Shared History</h4>
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
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
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