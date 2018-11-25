import React, { Component } from 'react';

export default class ChatRoom extends Component {
	constructor(props){
		super(props)

		this.state={
			typingMessage: '',
			message: ''
		}
	}

	handleChange = (e) => {
		const { typingMessage } = this.props 
		const message = e.target.value

		if(!typingMessage) {
			this.props.userTyping()
		}

		this.setState({message})
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { socket } = this.props
		const { message } = this.state
		const username = this.props.user
		socket.emit('sendMessage', {username, message});
		this.setState({message:''})
	}

	render(){
		const { userList, messages, typingMessage } = this.props
		const inputField = this.state.message
 		const user = userList.map((user) => {
			return <li key={user.id}>{user.username}</li>
		})

		const message = messages.map((message) => {
			return <li key={message.id}><b>{message.author}</b> <i>{message.date}</i> : {message.text}</li>
		})

		return(
			<div>
				<p>This is the ChatRoom.js page</p>
				<div>
					<h3>Users</h3>
					<ul>
						{user}
					</ul>
					<hr />
					<h3>Messages</h3>
					<ul>
						{message}
						<div>{typingMessage ? typingMessage : null }</div>
						<form onSubmit={this.handleSubmit}>
							<input 
								ref={(input) => {this.textInput = input} } 
								type='text' 
								id='messageField'
								onChange={this.handleChange}
								autoComplete='off'
								autoFocus={true}
								value={inputField}
							/>
						</form>
					</ul>
				</div>
			</div>
		)
	}
}