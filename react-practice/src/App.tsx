import React from 'react';
import { NavBar } from './Tools/navbar';
import { User } from './interface/user';
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  Link
} from "react-router-dom";
import { Home } from './Pages/Home'
import { Login } from './Pages/Login';
import history from './interface/history';
import { Profile } from './Pages/Profile';
import { Signup } from './Pages/Signup';
import './App.scss';

interface AppUser {
  user: User,
  loggedIn: boolean
}
export class App extends React.Component<any, AppUser> {
  constructor(props: any) {
    super(props)
    this.logMeIn.bind(this)
    let logIn = window.sessionStorage.getItem('user') ? true : false
    this.state = {
      user: { username: '', password: '', _id: '' },
      loggedIn: logIn
    }
  }
  private logMeIn = (e: any): void => {
    if (e) {
      console.log('logged in', e)
      this.setState({ 'user': e, 'loggedIn': true })
      window.sessionStorage.setItem('user', this.state.user.token!)
    }

  }
  user: User = { username: '', password: '', _id: '' }
  public render() {
    return (
      <div className="App">
        <Routes >
          <Route path='/' element={<NavBar user={this.state.user} loggedIn={this.state.loggedIn} logOut={() => this.setState({ loggedIn: false })} />} >
            <Route index element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<div>
              <Login loggedIn={this.state.loggedIn} login={this.logMeIn} />
              {this.state.loggedIn ? <Navigate to='/profile' /> : <></>}
            </div>
            } />
            <Route path='/signup' element={<div>
              <Signup loggedIn={this.state.loggedIn} login={this.logMeIn} />
              {this.state.loggedIn ? <Navigate to='/profile' /> : <></>}
            </div>
            } />
          </Route>
        </Routes>
      </div >
    )
  }
}
export default App