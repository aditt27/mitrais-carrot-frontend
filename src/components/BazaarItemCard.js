import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const BazaarItemCard = (props)=> {

    const location = useLocation()

    const imageStyle = {
        height: '200px',
        objectFit: 'contain'
    }

    return (
        <Card style={{ width: '262px', margin: '4px' }}>
            <Card.Img variant="top" src={props.image} style={imageStyle} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.price} Carrots</Card.Text>
                <Button as={Link} to={`${location.pathname}/rewardDetail`} state={{itemId: props.id}} variant="success">View Details</Button>
            </Card.Body>
            
        </Card>
    )

}

export default BazaarItemCard