import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";
import { Links, User } from '../interface/user'
import { Home } from '../classes/Home';
import LinkList from './LinkList';
import './navbar.scss'
interface myProps {

    links: Links[]
}

export class NavBar extends React.Component<myProps, {}>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='navbar'>
                    <LinkList key={'aye'} links={this.props.links} />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        )
    }
}

export default NavBar