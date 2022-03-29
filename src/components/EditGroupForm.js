import React from "react";
import { Button, Modal } from "react-bootstrap";


// const GroupForm = (props) => {
//     return (
//         <Modal show={props.show}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add Form</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>test modal</Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={props.toggle}>Close</Button>
//             </Modal.Footer>

//         </Modal>
//     )
// }
class GroupForm extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>test modal</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.toggle}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default GroupForm