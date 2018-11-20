import React, { Component } from 'react';

export default class LoginForm extends Component {
	constructor(props){
		super(props);

		this.state={
			username: '',
			error: ''
		}
	}

	handleVerifyUser = ({error}) => {
		const { username } = this.state
		if(error){
			this.setState({error})
		} else {
			this.setState({error})
			this.props.enterChat(username)
		}
	}

	handleChange = (e) => {
		const username = e.target.value.trim()

		this.setState({username})
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { socket } = this.props
		const { username } = this.state

		socket.emit('verifyUser', username, this.handleVerifyUser)
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
						autoFocus={true}
						/>
					<div>{error ? error : null }</div>
					<div>{username}</div>
				</form>
			</div>
		)
	}
}