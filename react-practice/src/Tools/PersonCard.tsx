import { Component } from "react"
import { Card, Button } from "react-bootstrap"
import { pictureCardInterface } from '../interface/user'
import Image from './linnet.jpg'
export class PersonCard extends Component<pictureCardInterface, {}>{
    constructor(props: any) {
        super(props)
    }
    render() {
        return (<Card>
            <Card.Img variant="top" src={Image} height="140px" width="100px" />
            <Card.Body>
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Subtitle>
                    {this.props.description}
                </Card.Subtitle>
            </Card.Body>
        </Card>)
    }
}
export default PersonCard;