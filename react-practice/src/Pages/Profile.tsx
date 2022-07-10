import { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { pictureCardInterface } from "../interface/user";
import PictureCard from "../Tools/PictureCard";


function getName(size: number) {
    let retList = []
    for (let x = 0; x < size; x++) {
        let y: pictureCardInterface = {
            name: `${x}`, description: `aaaa`
        }
        retList.push(y)
    }
    return retList;
}

const cards = getName(12)


export class Profile extends Component {
    constructor(props: any) {
        super(props)
    }
    private showCards = () => {
        const row = []
        for (const iterator of cards) {
            row.push(<div key={iterator.name} style={{
                flex: "1 1 250px",
                maxWidth: "250px"
            }}>
                <PictureCard {...{ name: iterator.name, description: iterator.description }} />

            </div>)
        }
        return row
    }
    render() {
        return (
            <div>
                <Card>
                    <Card.Title>Name</Card.Title>
                    <Card.Subtitle>Subtitle</Card.Subtitle>
                </Card>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}>
                    {this.showCards()}
                </div>
            </div>

        )
    }
}