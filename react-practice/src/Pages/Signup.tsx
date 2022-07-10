import { Component, SyntheticEvent } from "react";
import { User } from "../interface/user";
import { AuthService } from "../services/AuthService";
interface SignupProps {
    loggedIn?: boolean
    login: (x: User) => void
}

interface SignupState {
    username: string
    password: string
}
interface SignupEvent {
    target: any
}
export class Signup extends Component<SignupProps, SignupState>{
    private authService: AuthService = new AuthService('')
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.submitEvent.bind(this)
    }
    private getUsername(event: SignupEvent) {
        this.setState({ username: event.target.value })
    }
    private getPassword(event: SignupEvent) {
        this.setState({ password: event.target.value })
    }
    private submitEvent = async (event: SyntheticEvent) => {
        event.preventDefault();
        let results: User | undefined = await this.authService.postLogin(this.state.username, this.state.password, 'http://localhost:8000/api/signup')
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