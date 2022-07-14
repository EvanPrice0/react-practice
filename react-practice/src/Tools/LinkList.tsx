import { Component } from "react";
import { Link } from 'react-router-dom'
import { Links } from "../interface/user";

interface LinkListProps {
    links: Links[]
}

export class LinkList extends Component<LinkListProps>{
    constructor(props: LinkListProps) {
        super(props)
    }

    getLinks = () => {
        let rows: any[] = []
        this.props.links.forEach((link) => {
            if (!link.callback) rows.push(<Link key={link.name + Math.random().toString()} className={link.className} to={link.path}>{link.name}</Link>)
            else rows.push(link.callback())
        })
        return rows
    }

    render() {
        return <>
            {this.getLinks()}
        </>
    }
}
export default LinkList;
