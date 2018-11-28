import React, { Component } from 'react';

import Sidebar from './Sidebar';

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

	scrollToBottom = () => {
	  this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
	  this.scrollToBottom();
	}

	componentDidUpdate() {
	  this.scrollToBottom();
	}



	render(){
		const { userList, messages, typingMessage } = this.props
		const inputField = this.state.message
 		const user = userList.map((user) => {
			return <li key={user.id}>{user.username}</li>
		})
		const secret ='CHATROOM'


		const message = messages.map((message) => {
			return <li key={message.id}><b>{message.author}</b> <i>{message.date}</i> : {message.text}</li>
		})

		return(
			
			<div style={{ display: "flex" }}>
		        <Sidebar secret={secret} userList={userList}/>
		        <div className='sidediv'
		          style={{
		            padding: "10px",
		            width: "275px",
		            height: "100vh",
		            background: "#373a47"
		          }}
		        >
		        {secret}
		        <ul>
		        	{user}
		        </ul>
		        </div>

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
		      </div>
		)
	}
}