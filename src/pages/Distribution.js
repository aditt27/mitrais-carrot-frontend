import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Tab, Form, Table, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pagination } from '@mui/material'

export default function Distribution() {
  const [activeBarn, setActiveBarn] = useState({
    year: 0,
    totalCarrot: 0,
    carrotLeft: 0
  });
  const [barnTransactions, setBarnTransactions] = useState([]);
  const [show, setShow] = useState(false);
  const [managers, setManagers] = useState([]);
  const [userId, setUserId] = useState(1);
  const [amount, setAmount] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleClose = () => {
    setShow(false);
  }

  const handleShare = () => {
    axios.post('http://localhost:8081/api/v1/barn/carrot-distribution', { userId, amount }).then(res => {
      setShow(false);
      getBarnTransaction(page)
      getActiveBarn();
    })
  }

  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    getActiveBarn();
    getBarnTransaction(1);

    axios.get("http://localhost:8081/api/v1/user?filterBy=role&filterValue=Manager").then(res => {
      const data = res.data.result.currentPageContent;
      setManagers(data);
    })
  }, []);

  const getActiveBarn = () => {
    axios.get("http://localhost:8081/api/v1/barn?filterBy=active-only").then(res => {
      const data = res.data.result.currentPageContent;
      setActiveBarn(data[0]);
    })
  }

  const getBarnTransaction = (page) => {
    axios.get(`http://localhost:8081/api/v1/barn-transaction?page=${page-1}`).then(res => {
      const data = res.data.result.content;
      setBarnTransactions(data);
      setTotalPage(res.data.result.totalPages)
      setPage(page)
    })
  }

  const renderBarnTransactionDataTable = () => {
    return barnTransactions.map((barnTransaction, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{barnTransaction.sharedTo}</td>
          <td>{barnTransaction.jobFamily}</td>
          <td>{barnTransaction.grade}</td>
          <td>{barnTransaction.amount}</td>
          <td>{barnTransaction.note}</td>
          <td>{barnTransaction.date}</td>
        </tr>
      )
    });
  }

  const renderManagerOptions = () => {
    return managers.map((manager) => {
      return (
        <option value={manager.id} key={manager.id}>{manager.name}</option>
      )
    })
  }

  return (
    <Tab.Content className="search-box">
      <Card style={{ padding: "1.5em" }}>
        <Row>
          <Col md={12} className="align-self-start my-2">
            <hr style={{
              width: "2em",
              backgroundColor: "orange",
              height: "0.2em"
            }} align="left" />
            <h5>Distribution Detail</h5>
            <Table>
              <tbody>
                <tr>
                  <th>Year</th>
                  <td>{activeBarn.year}</td>
                </tr>
                <tr>
                  <th>Harvest</th>
                  <td>{activeBarn.totalCarrot.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Distributed Carrot</th>
                  <td>{(activeBarn.totalCarrot - activeBarn.carrotLeft).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Carrot in Barn</th>
                  <td>{activeBarn.carrotLeft.toLocaleString()}</td>
                </tr>

              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="my-2">
            <hr />
            <h5>Shared Carrot</h5>
          </Col>
        </Row>
        <Row className="d-flex align-self-center">
          <Col md={12} className="my-2">
            <Button onClick={handleShow}>
              <FontAwesomeIcon icon="plus-circle" className="mr-1" />
              SHARE CARROT
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Share Carrot</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>RECEPIENT</Form.Label>
                    <Form.Control as="select" value={userId} onChange={(e) => setUserId(parseInt(e.target.value))}>
                      <option></option>
                      {renderManagerOptions()}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label>CARROT AMOUNT</Form.Label>
                    <Form.Control type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  CANCEL
                </Button>
                <Button variant="primary" onClick={handleShare}>
                  SHARE NOW
                </Button>
              </Modal.Footer>
            </Modal>

          </Col>
        </Row>
        <Row>
          <Col md="12" className="my-2">
            <Form.Group className="float-right form-inline">
              <Form.Label>SEARCH: &nbsp;</Form.Label>
              <Form.Control type="text" style={{ width: "15vw" }} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="my-2">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Shared to</th>
                  <th>JF</th>
                  <th>Grade</th>
                  <th>Carrot</th>
                  <th>Note</th>
                  <th>Shared at</th>
                </tr>
              </thead>
              <tbody>
                {renderBarnTransactionDataTable()}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="my-2">
            <div style={{ justifyContent: 'end', display: 'flex' }} >
              <Pagination
                color='primary'
                count={totalPage}
                page={page}
                onChange={(e, page) => getBarnTransaction(page)}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </Tab.Content>
  )
}