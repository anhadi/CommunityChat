import React, { Component } from 'react';
import io from 'socket.io-client'

import LoginForm from './LoginForm';
import ChatRoom from './ChatRoom';

// const socketURL = 'https://vast-headland-39512.herokuapp.com/';
const socketURL = '172.27.139.88:5000'

export default class Login extends Component {
	constructor(props){
		super(props);

		this.state={
			socket:null,
			user: ''
		}
	}

	initSocket = () => {
		const socket = io(socketURL);

		socket.on('connect', () => {
			console.log('Socket is connected!')

			socket.emit('createMessage', {
				from: 'client',
				to: 'server',
				text: 'this is from client',
				createdAt: 123
			});
		})

		socket.on('disconnect', () => {
			console.log('Disconnected from server!')
		})

		socket.on('newMessage', (data) => {
			console.log('New email:', data);
		})

		this.setState({socket});
	}

	componentDidMount(){
		this.initSocket();
	}

	enterChat = (user) => {
		this.setState({user})
	}

	render(){
		const { socket } = this.state
		return(
			<div>
				<p>This is the Login.js page</p>
				{ this.state.user ? 
					<ChatRoom />
					:
					<LoginForm  socket={socket} enterChat={this.enterChat}/>
				}
			</div>
		)
	}
}