import React, { Component } from 'react';

export default class MessagesDisplay extends Component {
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

		const { socket, user } = this.props
		const { message } = this.state
		socket.emit('sendMessage', {user, message});
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
		const { messages, typingMessage } = this.props
		const inputField = this.state.message

		const message = messages.map((message) => {
			return <li key={message.id}><b>{message.author}</b> <i>{message.date}</i> : {message.text}</li>
		})

		return(
			<div className='messagesDisplay'>
			        <div className='messagesPadding'>
			          <div className='messages'>
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