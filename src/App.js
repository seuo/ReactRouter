import React, {Component} from 'react';
import { Router, Link, navigate } from '@reach/router';
import './App.css';
import RouteProject from './Components/route-projects';
import RouteType from './Components/route-type';
import RouteAddProject from './Components/route-addprojects'; 
import RouteEditProject from './Components/route-editproject';
import RouteLogin from './Components/route-login';
import RouteNotFound from './Components/route-notfound';   
import {getTypes,getSingleUser} from './Components/api';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      types:[],
      currentUser: null
    }
  }
  setCurrentUser = (user) => {
    this.setState({currentUser:user})
  }

  componentDidMount(){

    getTypes().then(res => this.setState({types:res.data}))
    
    var userId = localStorage.getItem('userId')

    if (userId) {
      getSingleUser(userId).then(res => this.setState({
        currentUser:res.data}))
    }
  }

  handleLogoutClick = () => {
    localStorage.removeItem('userId')
    this.setState({
      currentUser:null
    })
    navigate('login')
  }

  
  render(){
    var {types,currentUser} = this.state
    return (

      <div className="app">

         
          <div className="header">
          { 
            currentUser ? (<span>Welcome {currentUser.name}</span>) : null
          }
             <i className="fas fa-bars"></i>
            <ul className="menu">
            <Link to="projects">Projects</Link> |
            {
              types.map(type => <Link to={'/types/'+type.id}>{type.name}</Link>)
            }
            {
             currentUser ? (
               <>
                <Link to="/projects/create">Add a project</Link>
                <li><a onClick={this.handleLogoutClick} href="">Logout</a></li>
              </>
             ) : (
               <>
                <Link to="/login">Login</Link>
                <li><a href="">Signup</a></li>
              </>
             )
            }

            
            
            </ul>
          </div>

          <Router>
            <RouteProject path="/projects"/>
            <RouteType path="/types/:id"/>
            {currentUser ? <RouteAddProject path="/projects/create"/> : null}
            {currentUser ? <RouteEditProject path="/projects/:id/edit"/> : null}
            <RouteLogin setCurrentUser={this.setCurrentUser} path="/login"/>
            <RouteNotFound default/>
          </Router>

        
      </div>
    );
  }
}

export default App;
