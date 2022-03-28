import axios from "axios";
import React from "react"
import { Card, Col, Container, Row, Tab, Form, Table, Button } from "react-bootstrap";
import ActionButtons from "../components/ActionButtons";

class Groups extends React.Component {
    constructor() {
        super()
        this.state = {
            groupList: []
        }
    }
    async componentDidMount() {
        let groups = [];
        await axios.get("http://localhost:8081/api/v1/group").then(res => {
            const data = res.data.result
            // console.log(data.currentPageContent)
            if (data.currentPageContent) {
                let no = 1
                const group = data.currentPageContent
                // console.log(group)
                group.forEach(element => {
                    groups.push({
                                id: no++,
                                groupName: element.groupName,
                                manager: element.manager,
                                notes: element.notes,
                                points: element.points,
                            })
                    // console.log(groups)
                });
            }
        })
        // console.log(groups)
        this.setState({ groupList: groups })
    }

    groupListRow() {
        const { groupList } = this.state
        return groupList.map((group, i) => {
            return (
                <tr key={i}>
                    <td>{group.id}</td>
                    <td>{group.groupName}</td>
                    <td>{group.manager}</td>
                    <td>{group.points}</td>
                    <td>{group.notes}</td>
                    <td>
                        <ActionButtons />
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <Container className="p-5">

                <Tab.Content className="search-box">
                    <Card style={{ padding: "1.5em" }}>
                        <Row>
                            <Col md={12} className="align-self-start my-2">
                                <hr style={{
                                    width: "2em",
                                    backgroundColor: "orange",
                                    height: "0.2em"
                                }} align="left" />
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
                                        {this.groupListRow()}
                                    </tbody>
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