import React from "react";
import { Login } from "./Login";
import history from "../interface/history";
import { Outlet } from "react-router-dom";



export class Home extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                Homes
                <Outlet />
            </div>)
    }
}
export default Home;