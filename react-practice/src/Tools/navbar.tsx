import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";
import { User } from '../interface/user'
import { Home } from '../Pages/Home';
import './navbar.scss'
interface myProps {
    user: User,
    loggedIn: boolean
    logOut: () => void
}

export class NavBar extends React.Component<myProps, {}>{
    constructor(props: any) {
        super(props);
        this.loginScenario.bind(this)
    }
    private signOut = () => {
        window.sessionStorage.removeItem('user')
        this.props.logOut()
    }
    private loginScenario = () => {
        if (this.props.loggedIn) return <button className="navbar__right" onClick={() => this.signOut()}>Signout</button>
        else return <Link className="navbar__right" to="/login">Login</Link>
    }
    render() {
        return (
            <div>
                <div className='navbar'>
                    <Link className="navbar__link" to="/">Home</Link>
                    <Link className="navbar__link" to="/profile">Profile</Link>
                    {this.loginScenario()}
                    <Link className="navbar__right" to="/signup">Signup</Link>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        )
    }
}

export default NavBar