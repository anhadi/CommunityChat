import React, { Component } from 'react';

export default class ChatRoom extends Component {
	constructor(props){
		super(props)

		this.state={
			typingMessage: ''
		}
	}

	handleChange = (e) => {
		const { typingMessage } = this.props 

		if(!typingMessage) {
			this.props.userTyping()
		}
	}

	render(){
		const { userList, messages, typingMessage } = this.props
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
						<form>
							<input 
								ref={(input) => {this.textInput = input} } 
								type='text' 
								id='messageField'
								onChange={this.handleChange}
								autoComplete='off'
								autoFocus={true}
							/>
						</form>
					</ul>
				</div>
			</div>
		)
	}
}