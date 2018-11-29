import React, { Component } from 'react';

export default class LoginForm extends Component {
	constructor(props){
		super(props);

		this.state={
			username: '',
			error: '', 
			userList: []
		}
	}

	handleVerifyUser = ({error, userList, newUser}) => {
		const user = newUser
		if(error){
			this.setState({error})
		} else {
			this.setState({error,userList})
			this.props.enterChat(user, userList)
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
			<div className='loginForm'>
				<p>Welcome to CommunityChat!</p>
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