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
			<div class="loginFormContainer d-flex flex-column align-items-center justify-content-center">
			<div className='loginForm'>
				<p className='h2'>Welcome to CommunityChat!</p>
				<form onSubmit={this.handleSubmit}>
					<div class="input-group my-1">
						<input 
							type="text" 
							ref={(input) => {this.textInput = input} } 
							id='usernameField'
							onChange={this.handleChange}
							autoComplete='off'
							autoFocus={true}
							class="form-control" 
							placeholder="Username" 
							aria-label="Username" 
							aria-describedby="basic-addon2"
						/>
						<div class="input-group-append">
							<button onSubmit={this.handleSubmit} onClick={this.handleSubmit} class="btn btn-outline-secondary" type="button">Enter</button>
						</div>
					</div>
				</form>




			</div>
			</div>
		)
	}
}