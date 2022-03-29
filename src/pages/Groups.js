import axios from "axios";
import React from "react"
import { Card, Col, Row, Tab, Form, Table, Button, ButtonGroup } from "react-bootstrap";
import GroupForm from "../components/EditGroupForm";

class Groups extends React.Component {
    constructor() {
        super()
        this.state = {
            groupList: [],
            showModal: false
        }

    }

    toggleModal() {
        console.log(this.state.showModal)
        this.setState({ showModal: !this.state.showModal });
    }

    onModalInputChanged = (modalInput) => {
        console.log('add new group : ', modalInput )
    }

    async componentDidMount() {
        let groups = [];
        await axios.get("http://localhost:8081/api/v1/group").then(res => {
            const data = res.data.result
            if (data.currentPageContent) {
                let no = 1
                const group = data.currentPageContent
                group.forEach(element => {
                    groups.push({
                        number: no++,
                        groupId: element.id,
                        groupName: element.groupName,
                        manager: element.manager,
                        notes: element.notes,
                        points: element.points,
                    })
                });
            }
        })
        console.log(groups)
        this.setState({ groupList: groups })
    }

    handleOnClick() {
        alert("button clicked")
    }

    logInput(name) {
        console.log(name)
    }

    groupListRow() {
        const { groupList } = this.state
        return groupList.map((group, i) => {
            return (
                <tr key={i}>
                    <td>{group.number}</td>
                    <td>{group.groupName}</td>
                    <td>{group.manager}</td>
                    <td>{group.points}</td>
                    <td>{group.notes}</td>
                    <td>
                        <ButtonGroup>
                            <Button onClick={(() => this.handleOnClick())}>Details</Button>
                            <Button style={{ backgroundColor: "orange" }} onClick={(() => this.handleOnClick())}>Edit</Button>
                            <Button onClick={(() => this.handleOnClick())} style={{ backgroundColor: "red" }}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <Tab.Content className="search-box">
                <Card style={{ padding: "1.5em" }}>
                    <GroupForm 
                        show={this.state.showModal} 
                        toggle={() => this.toggleModal()}  
                        type={"Add"}
                        getInput={this.logInput}/>
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
                            <Button onClick={() => this.toggleModal()}>
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
                                    {this.groupListRow()}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
            </Tab.Content>
        )
    }
}

export default Groups;