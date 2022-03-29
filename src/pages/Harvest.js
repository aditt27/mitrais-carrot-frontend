import React from "react";
import { Card, Col, Row, Tab, Form, Table, Button, ButtonGroup } from "react-bootstrap";

export default class Harvest extends React.Component {
    render() {
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
                            <h4 className="box-title">HARVEST PLAN</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="align-self-start my-2">
                            <Button onClick={() => alert('test')}>
                                Add New
                            </Button>

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
                                        <th>Group Name</th>
                                        <th>Manager Name</th>
                                        <th>Carrot</th>
                                        <th>Note</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
            </Tab.Content>
        )
    }
}