import React, { Component } from 'react';
import io from 'socket.io-client'

import LoginForm from './LoginForm';

// const socketURL = 'https://vast-headland-39512.herokuapp.com/';
const socketURL = '172.25.64.46:5000'

export default class Login extends Component {
	constructor(props){
		super(props);

		this.state={
			socket:null
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

	render(){
		const { socket } = this.state
		return(
			<div>
				<p>This is the Login.js page</p>
				<LoginForm  socket={socket}/>
			</div>
		)
	}
}