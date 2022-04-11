import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, Form } from 'react-bootstrap'
import { getParameters, editParameter } from '../apis/ParameterApi'

const AdminSetting = ()=> {

    const[data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [parameter, setParameter] = useState({});

    const loadParameters = ()=> {
        getParameters().then(result=> {
            console.log(result)
            setData(result.result)
        })
    }

    const handleClick = (e) => {
      console.log(e.target.value);
      setParameter(data[e.target.value])
      setShow(true);
    }

    const handleClose = () => {
      setShow(false);
    }

    const handleEdit = () => {
      editParameter(parameter).then(result => {
        console.log(result);
        setShow(false);
        loadParameters()
      })
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

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Share Carrot</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" disabled value={parameter.name} />
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label>CARROT AMOUNT</Form.Label>
                    <Form.Control type="number" min={1} value={parameter.value} onChange={(e) => setParameter({...parameter, value: e.target.value})} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  CANCEL
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                  EDIT
                </Button>
              </Modal.Footer>
            </Modal>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((item, index)=>{
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.value}</td>
                            <td>
                              <Button value={index}  onClick={handleClick}>Edit</Button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </Table>
        </div>
    )
}

export default AdminSetting