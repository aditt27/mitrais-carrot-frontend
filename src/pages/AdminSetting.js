import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { getParameters } from '../apis/ParameterApi'

const AdminSetting = ()=> {

    const[data, setData] = useState([])

    const loadParameters = ()=> {
        getParameters().then(result=> {
            console.log(result)
            setData(result.result)
        })
    }

    const editParam = (id)=> {
        const index = data.findIndex(item=> item.id === id)
        const param = data[index]

    }

    useEffect(()=> {
        loadParameters()
    }, [])

    return(
        <div style={{padding: '1em'}}>
            <hr style={{
                width: "2em",
                backgroundColor: "orange",
                height: "0.2em"
            }} align="left"/>
            <h4 className="box-title">SETTING</h4>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(item=>{
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.value}</td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </div>
    )
}

export default AdminSetting