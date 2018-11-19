import React, { Component } from 'react';
import io from 'socket.io-client'

// const socketURL = 'https://vast-headland-39512.herokuapp.com/';
const socketURL = '172.27.139.88:5000'

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
		})

		socket.on('disconnect', () => {
			console.log('Disconnected from server!')
		})

		this.setState({socket});
	}

	componentDidMount(){
		this.initSocket();
	}

	render(){
		return(
			<div>
				<p>This is the Login.js page</p>
			</div>
		)
	}
}