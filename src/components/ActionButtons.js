import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

class ActionButtons extends React.Component {
    render() {
        return (
            <ButtonGroup>
                <Button>Details</Button>
                <Button style={{backgroundColor:"orange"}}>Edit</Button>
                <Button style={{backgroundColor:"red"}}>Delete</Button>
            </ButtonGroup>
        )
    
    }
}

export default ActionButtons