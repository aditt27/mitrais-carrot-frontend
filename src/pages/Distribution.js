import { useState, useEffect } from "react";
import { Card, Col, Row, Tab, Form, Table, Button, Modal, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pagination } from '@mui/material'
import { getActiveBarn, getBarnTransaction, getManager, postDistribution } from "../apis/Distribution";

export default function Distribution() {
  const [activeBarn, setActiveBarn] = useState({
    year: 0,
    totalCarrot: 0,
    carrotLeft: 0
  });
  const [barnTransactions, setBarnTransactions] = useState([]);
  const [show, setShow] = useState(false);
  const [managers, setManagers] = useState([]);
  const [userId, setUserId] = useState(undefined);
  const [amount, setAmount] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleReset = () => {
    setUserId(undefined);
    setAmount(1);
    setValidated(false);
  }

  const handleShare = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (form.checkValidity() === true) {
      postDistribution(userId, amount)
        .then( async (res) => {
          if(res.message === "Insufficient Barn Amount") {
            setFailed(true)
          } else {
            await getBarnTransaction(page)
            await getActiveBarn();

            setSuccess(true);
            setFailed(false)
            handleReset();

            setTimeout(() => {
              setSuccess(false);
              setShow(false);
            }, 500);
          }
        });
    }

    setValidated(true);
  }

  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    getActiveBarnData();
    getBarnTransactionData(1);

    getManager().then(res => {
      const data = res.result.currentPageContent;
      setManagers(data);
    })
  }, []);

  const getActiveBarnData = () => {
    getActiveBarn().then(res => {
      const data = res.result.currentPageContent;
      setActiveBarn(data[0]);
    })
  }

  const getBarnTransactionData = (page) => {
    getBarnTransaction(page).then(res => {
      const data = res.result.content;
      setBarnTransactions(data);
      setTotalPage(res.result.totalPages)
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
              <Form noValidate validated={validated} onSubmit={handleShare}>
                <Modal.Header closeButton>
                  <Modal.Title>Share Carrot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Alert show={success} variant="success">
                    Carrot share success
                  </Alert>

                  <Alert show={failed} variant="danger">
                    Insufficient Barn Amount
                  </Alert>

                  <Form.Group className="mb-3">
                    <Form.Label>RECIPIENT</Form.Label>
                    <Form.Control as="select" required value={userId} onChange={(e) => setUserId(parseInt(e.target.value))}>
                      <option></option>
                      {renderManagerOptions()}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Choose recipient
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label>CARROT AMOUNT</Form.Label>
                    <Form.Control type="number" min={1} required value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                    <Form.Control.Feedback type="invalid">
                      Carrot amount cannot blank
                    </Form.Control.Feedback>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    CANCEL
                  </Button>
                  <Button variant="primary" type="submit">
                    SHARE NOW
                  </Button>
                </Modal.Footer>
              </Form>
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
                onChange={(e, page) => getBarnTransactionData(page)}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </Tab.Content>
  )
}