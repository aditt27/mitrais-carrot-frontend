import React from "react";
import { Button, Modal, Form, Col } from "react-bootstrap";

class GroupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: '',
            manager: '',
            carrot: '',
            notes: ''
        }
    }

    saveInput = () => {
        this.props.getInput(this.state.name)
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>{this.props.type} Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text" onChange={(e) => this.setState({name: e.target.value})} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Manager: </Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Carrot: </Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Notes: </Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.toggle}>Close</Button>
                    <Button variant="primary" onClick={this.saveInput}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default GroupForm