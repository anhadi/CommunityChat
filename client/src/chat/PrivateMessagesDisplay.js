import React, { Component } from 'react';

const uuidv4 = require('uuid/v4');

export default class PrivateMessagesDisplay extends Component {
	constructor(props){
		super(props)

		this.state={
			message: ''
		}
	}

	handleChange = (e) => {
		const { typingMessage } = this.props 
		const message = e.target.value

		if(!typingMessage) {
			this.userTyping()
		}

		this.setState({message})
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const { socket, user, view } = this.props
		const { message } = this.state
		const id = uuidv4();
		const now = new Date();
		const date = now.toLocaleString();

		socket.emit('privateMessage', ({
			receiver: view, 
			sender: user.id,
			author: user.username,
			message,
			date,
			id
		}));
		this.setState({message:''})
	}

	scrollToBottom = () => {
	  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
		
	  	this.scrollToBottom();
	}

	componentDidUpdate() {
	  this.scrollToBottom();
	}

	userTyping = () => {
		const { user, socket } = this.props		
		socket.emit('userTyping', user);
	}


	render(){
		const { privateMessages, typingMessage, view, user } = this.props
		const inputField = this.state.message

		// const message = privateMessages.map((message) => {
		// 	return <li key={message.id}><b>{message.author}</b> <i>{message.date}</i> : {message.message}</li>
		// })

		var message = privateMessages.filter((message) => {
			if(message.sender === view || (message.receiver === view && message.sender === user.id)){
				return true
			} else {
				return false
			}
		})


		message = message.map((message) => {
			return <li key={message.id}><b>{message.author}</b> <i>{message.date}</i> : {message.message}</li>
		})

		// const message = privateMessages.filter((message) => {
		// 	return message.sender === view
		// })

		return(
			<div className='messagesDisplay'>
			        <div className='messagesPadding'>
			          <div className='messages'>
			          	THIS MESSAGES DIV IS FROM PrivateMessagesDisplay {view}
			            <ul>
							{message}
						</ul>
						<div style={{ float:"left", clear: "both" }}
				             ref={(el) => { this.messagesEnd = el; }}>
				        </div>
			          </div>
			         </div>
		          <div className='typingMessage'>{typingMessage ? typingMessage : null }</div>
		          <div className='messageInput'>
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

		          </div>

		        </div>
			)
	} 
}