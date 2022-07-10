import { Component } from "react"
import { Card, Button } from "react-bootstrap"

export class PictureCard extends Component<{ name: string, description: string }, {}>{
    constructor(props: any) {
        super(props)
    }
    render() {
        return (<Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{this.props.name}</Card.Title>
                <Card.Text>
                    {this.props.description}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>)
    }
}
export default PictureCard;