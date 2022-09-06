import React from "react";
import { Location, Outlet } from "react-router-dom";
import PersonCard from "../Tools/PersonCard";
import { Links } from "../interface/user";
import { useLocation } from "react-router-dom";
import LinkList from "../Tools/LinkList";
import { Sidebar } from "./Home.style";


export class Home extends React.Component<{ links: Links[] }, {}> {
    constructor(props: any) {
        super(props)
    }

    render() {
        let linnet = { _id: '0', name: "Linnet Mbogo", description: "Welcome to my Blog" }
        return (
            <div style={{
                display: "flex",
                flexWrap: 'nowrap',
            }}>
                <Sidebar><div style={{ flex: 1 }}>
                    <PersonCard {...linnet}></PersonCard>
                </div>
                    <div style={{ flex: 4 }}>
                        hey
                    </div>
                </Sidebar>
                <div style={{
                    flex: 4,
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    <Outlet />
                </div>
                <Sidebar>
                    <LinkList key={'asdf'} links={this.props.links} />
                </Sidebar>
            </div>)
    }
}
export default Home;