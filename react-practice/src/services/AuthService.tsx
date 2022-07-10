import { Component } from "react";
import { User } from "../interface/user";
import axios from 'axios';

interface AuthServiceProps {
    userName: string
    password: string
    loggedIn: boolean
    stateOf?: () => void
}
interface AuthServiceState {
    user: User
}

export class AuthService extends Component<AuthServiceProps, AuthServiceState>{
    constructor(props: any) {
        super(props)
    }

    async postLogin(username: string, password: string, endpoint: string): Promise<User | undefined> {
        console.log(username, password)
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/JSON',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };

        const resp = await axios.post(endpoint, { username, password }, { headers: headers }
        );
        if (resp.status === 200) return resp.data as User
        else return undefined
    }
}