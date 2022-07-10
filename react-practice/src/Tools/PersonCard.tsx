import { Component } from "react"
import { Card, Button } from "react-bootstrap"
import { pictureCardInterface } from '../interface/user'

export class PersonCard extends Component<pictureCardInterface, {}>{
    constructor(props: any) {
        super(props)
    }
    render() {
        return (<Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Subtitle>
                    {this.props.description}
                </Card.Subtitle>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>)
    }
}
export default PersonCard;