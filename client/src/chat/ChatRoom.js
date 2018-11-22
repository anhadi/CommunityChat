import React, { Component } from 'react';

export default class ChatRoom extends Component {
	constructor(props){
		super(props)

		this.state={
			typingMessage: ''
		}
	}

	startCheckingTyping = ()=>{
		console.log("Typing");
		// this.typingInterval = setInterval(()=>{
		// 	if((Date.now() - this.lastUpdateTime) > 300){
		// 		this.setState({typingMessage:'Person is now typing'})
		// 		this.stopCheckingTyping()
		// 	}
		// }, 300)

		window.setInterval(function(){
		  /// call your function here
		}, 5000);

		this.setState({typingMessage:'Person is now typing'})
	}

	stopCheckingTyping = ()=>{
		console.log("Stop Typing");
		if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
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
			return <li key={message.id}>{message.text}</li>
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