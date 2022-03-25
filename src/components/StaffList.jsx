import { Tab, Container, Row, Col, Form, Card, Table } from 'react-bootstrap';
import { Component } from 'react';

class StaffInGroup extends Component {

    render() {
        return (
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
                                <h4 className="box-title">STAFF IN GROUP LIST</h4>
                            </Col>
                            <Col md="12" className="my-2">
                                <Form.Group className="float-right">
                                    <Form.Label>STAFF GROUP</Form.Label>
                                    <Form.Control as="select" defaultValue="no_group" style={{width: "15vw"}}>
                                        <option>No Group</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Control>
                                </Form.Group>
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
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Office</th>
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

export default StaffInGroup