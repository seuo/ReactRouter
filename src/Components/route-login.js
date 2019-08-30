import React, {Component} from 'react';
import {navigate} from '@reach/router';
import {addProjects} from './api';
import {authenticate,getSingleUser} from './api';

class RouteLogin extends Component {
	constructor(props){
		super(props);
		this.state = {
			message:''
		}
	}

	handleFormSubmit = (e) => {
		e.preventDefault();

		var formData = new FormData(this.form);
		var data = {
			username:formData.get('username-input'),
			password:formData.get('password-input'),
		}

		var {setCurrentUser} = this.props
		authenticate(data)
		.then(res => {
			var user = res.data
			setCurrentUser(user)
			return user
		})
		
		.then(user => {
			if(user) {
				localStorage.setItem('userId',user.id)
				navigate('/projects')
			}
			else {
				this.setState({message:'Invalid username or password'})
			}
		})

	}



    render(){
      return (
        <div className="main">
        <h3>Login</h3>
					<form onSubmit={this.handleFormSubmit} ref={(el) => {this.form = el}}>

					<div className="form-group">
						<label htmlFor="name-input">Username</label>
						<input type="text" className="form-control" name="username-input" id="username-input" placeholder="Enter username"/>
					</div>

					<div className="form-group">
						<label htmlFor="name-input">Password</label>
						<input type="password" className="form-control" name="password-input" id="password-input" placeholder="Enter password"/>
					</div>


					<button type="submit" className="btn btn-primary">Login</button>
					<p>{this.state.message}</p>
					</form>
      </div>
      )
    }
}

export default RouteLogin;