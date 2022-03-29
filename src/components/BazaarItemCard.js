import React from 'react'
import { Button, Card } from 'react-bootstrap'

class BazaarItemCard extends React.Component {
    render() {
        return (
            <Card style={{ width: '250px', margin: '4px' }}>
                <Card.Img variant="top" src={this.props.image} />
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>{this.props.price} Carrots</Card.Text>
                    <Button variant="success">Buy</Button>
                </Card.Body>
                
            </Card>
        )
    }
}

export default BazaarItemCard