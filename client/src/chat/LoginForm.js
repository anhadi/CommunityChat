import React, { Component } from 'react';

export default class LoginForm extends Component {
	constructor(props){
		super(props);

		this.state={
			username: '',
			error: ''
		}
	}

	handleChange = (e) => {
		this.setState({username:e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault();
	}

	render(){
		const { username, error } = this.state;

		return(
			<div>
				<p>This is the LoginForm.js page</p>
				<form onSubmit={this.handleSubmit}>
					<h2>Username</h2>
					<input
						ref={(input) => {this.textInput = input} } 
						type='text' 
						id='usernameField'
						onChange={this.handleChange}
						autoComplete='off'
						/>
					<div>{error ? error : null }</div>
					<div>{username}</div>
				</form>
			</div>
		)
	}
}