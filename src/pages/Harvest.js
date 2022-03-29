import axios from "axios";
import React from "react";
import { Card, Col, Row, Tab, Form, Table, Button, ButtonGroup } from "react-bootstrap";

export default class Harvest extends React.Component {
    constructor() {
        super()
        this.state = {
            barnList: []
        }

    }

    async componentDidMount() {
        let barns = [];
        await axios.get("http://localhost:8081/api/v1/barn").then(res => {
            const data = res.data.result
            if (data.currentPageContent) {
                let no = 1
                const barn = data.currentPageContent
                barn.forEach(element => {
                    barns.push({
                        number: no++,
                        id: element.id,
                        year: element.year,
                        totalCarrot: element.totalCarrot,
                        carrotLeft: element.carrotLeft,
                        shareExpireDate: element.shareExpireDate,
                        exchangeExpireDate: element.exchangeExpireDate,
                        isActive: element.isActive,
                    })
                });
            }
        })
        console.log(barns)
        this.setState({ barnList: barns })
    }

    renderBarnTable() {
        const { barnList } = this.state
        return barnList.map((barn, i) => {
            return (
                <tr key={i}>
                    <td>{barn.number}</td>
                    <td>{barn.year}</td>
                    <td>{barn.totalCarrot}</td>
                    <td>{barn.carrotLeft}</td>
                    <td>{barn.shareExpireDate}</td>
                    <td>{barn.exchangeExpireDate}</td>
                    <td>{barn.isActive? "active" : "inactive"}</td>
                    <td>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <Button style={{ backgroundColor: "orange" }} onClick={(() => alert('extend expiry date'))}>Extend</Button>
                            <Button onClick={(() => alert("add more"))}>Add More</Button>
                        </div>
                    </td>
                </tr>
            )
        })
    }
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
                                        <th colSpan={1} rowSpan={2}>#</th>
                                        <th colSpan={1} rowSpan={2}>Year</th>
                                        <th colSpan={2} rowSpan={1}>Barn</th>
                                        <th colSpan={2} rowSpan={1}>Expired At</th>
                                        <th colSpan={1} rowSpan={2}>Active</th>
                                        <th colSpan={1} rowSpan={2}>Action</th>
                                    </tr>
                                    <tr>
                                        <th rowSpan={1} colSpan={1}>Total</th>
                                        <th rowSpan={1} colSpan={1}>Left</th>
                                        <th rowSpan={1} colSpan={1}>Share</th>
                                        <th rowSpan={1} colSpan={1}>Exchange</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBarnTable()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
            </Tab.Content>
        )
    }
}