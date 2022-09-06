import React from 'react';
import { NavBar } from './Tools/navbar';
import { Links, User } from './interface/user';
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  Link
} from "react-router-dom";
import { Home } from './classes/Home'
import { Login } from './classes/Login';
import BlogHomeFunction from './functions/BlogHomeFunction';
import { Signup } from './classes/Signup';
import BlogProvider from "./hooks/BlogProvider";

import './App.scss';
import BlogHomeClass from './classes/BlogHomeClass';
import { HomePage } from './functions/HomePage';
import { Button } from 'react-bootstrap';

interface AppUser {
  user: User,
  loggedIn: boolean
}
export class App extends React.Component<any, AppUser> {
  constructor(props: any) {
    super(props)
    this.logMeIn.bind(this)
    let logIn = window.localStorage.getItem('user') ? true : false
    this.state = {
      user: { username: '', password: '', _id: '', image: '' },
      loggedIn: logIn
    }
  }
  private logMeIn = (e: User): void => {
    if (e) {
      console.log('logged in', e)
      this.setState({ 'user': e, 'loggedIn': true })
      console.log(e.username)
      window.localStorage.setItem('user', e.token!)
      window.localStorage.setItem('username', e.username)
    }

  }
  private signOut = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('username')
    this.setState({ loggedIn: false })
  }
  private loginScenario = () => {
    if (this.state.loggedIn) return <Button key={Math.random.toString()} className="navbar__right" onClick={() => this.signOut()}>Signout</Button>
    else return <Link key={Math.random.toString()} className="navbar__right" to="/login">Login</Link>
  }
  links: Links[] = [
    { _id: '0', className: "navbar__link", path: '/', name: 'Home' }, { _id: '1', className: "navbar__link", path: '/blogHome', name: 'Blog Home' }, //{ _id: '2', className: "navbar__link", path: '/blogHomeFunction', name: 'Blog Home' },
    //{ _id: '6', className: "navbar__link", path: '/newBlog', name: 'New Blog' }//, { _id: '4', className: "navbar__link", path: '/login', name: 'SignInOut', callback: () => this.loginScenario() }, { _id: '5', className: "navbar__right", path: '/signup', name: 'Signup' }
  ]
  public render() {
    return (
      <>
        <Routes >
          <Route path='/' element={
            <NavBar key={'12aa'} links={this.links} />
          }>
            <Route path='/' element={<Home links={this.links.slice(0, this.links.length - 2)} />}>
              <Route index element={<HomePage />} />
              <Route path='/blogHome' element={<BlogHomeClass new={false} />} />
              <Route path='/newBlog' element={<BlogProvider><BlogHomeClass new={true} /></BlogProvider>} />
            </Route>
            <Route path='/login' element={<div>
              <Login loggedIn={this.state.loggedIn} login={this.logMeIn} />
              {this.state.loggedIn ? <Navigate to='/blogHome' /> : <></>}
            </div>

            } />
            <Route path='/signup' element={<div>
              <Signup loggedIn={this.state.loggedIn} login={this.logMeIn} />
              {this.state.loggedIn ? <Navigate to='/blogHome' /> : <></>}
            </div>
            } />
          </Route>
        </Routes>
      </>
    )
  }
}
export default App