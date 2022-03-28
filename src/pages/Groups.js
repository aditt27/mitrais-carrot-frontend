import React from "react"
import { Card, Col, Container, Row, Tab, Form, Table, Button } from "react-bootstrap";

class Groups extends React.Component {
    render() {
        return (
            // <h1>Staff Group</h1>
            <Container className="p-5">
                
                <Tab.Content className="search-box">
                    <Card style={{padding: "1.5em"}}>
                        <Row>
                            <Col md={12} className="align-self-start my-2">
                                <hr style={{
                                    width: "2em",
                                    backgroundColor: "orange",
                                    height: "0.2em"
                                }} align="left"/>
                                <h4 className="box-title">STAFF GROUP LIST</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="align-self-start my-2">
                                <Button>Add New</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="my-2">
                                <Form.Group className="float-right form-inline">
                                    <Form.Label>SEARCH: &nbsp;</Form.Label>
                                    <Form.Control type="text" style={{width: "15vw"}} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className="my-2">
                                <Table striped bordered hover>
                                    <thead>
                                        <th>#</th>
                                        <th>Group Name</th>
                                        <th>Manager Name</th>
                                        <th>Carrot</th>
                                        <th>Note</th>
                                        <th>Action</th>
                                    </thead>
                                </Table>
                            </Col>
                        </Row>
                    </Card>
                </Tab.Content>
            </Container>
        )
    }
}

export default Groups;