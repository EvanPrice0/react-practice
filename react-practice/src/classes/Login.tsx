import { Component, SyntheticEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../interface/user";
import { AuthService } from "../services/AuthService";
interface LoginProps {
    loggedIn?: boolean
    login: (x: User) => void
}

interface LoginState {
    username: string
    password: string
}
interface LoginEvent {
    target: any
}
export class Login extends Component<LoginProps, LoginState>{
    private authService: AuthService = new AuthService('')
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.submitEvent.bind(this)
    }
    private getUsername(event: LoginEvent) {
        this.setState({ username: event.target.value })
    }
    private getPassword(event: LoginEvent) {
        this.setState({ password: event.target.value })
    }
    private submitEvent = async (event: SyntheticEvent) => {
        event.preventDefault();
        let results: User | undefined = await this.authService.postLogin(this.state.username, this.state.password, 'http://localhost:8000/api/login')
        if (results != undefined) {
            this.props.login(results)

        }
        console.log(results)
    }


    render() {
        return (
            <>
                <form>
                    <input value={this.state.username} onChange={(e) => this.getUsername(e)} />
                    <input value={this.state.password} onChange={(e) => this.getPassword(e)} />
                    <input type='button' name='submit' onClick={this.submitEvent} />
                </form >
            </>
        )
    }
}