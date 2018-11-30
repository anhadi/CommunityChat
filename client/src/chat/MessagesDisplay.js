import React, { Component } from 'react';

export default class MessagesDisplay extends Component {
	constructor(props){
		super(props)

		this.state={
			message: ''
		}
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
			<div className='messagesDisplay d-flex'>
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
					    <div class="input-group my-1">
						  <input 
							type="text" 
							ref={(input) => {this.textInput = input} } 
							id='messageField'
							onChange={this.handleChange}
							autoComplete='off'
							autoFocus={true}
							value={inputField}
							class="form-control" 
							placeholder="Recipient's username" 
							aria-label="Recipient's username" 
							aria-describedby="basic-addon2" />
						  <div class="input-group-append">
						    <button onSubmit={this.handleSubmit} onClick={this.handleSubmit} class="btn btn-outline-secondary" type="button">Button</button>
						  </div>
						</div>
					</form>
		        </div>

		     </div>
			)
	} 
}