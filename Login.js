import React, { Component } from 'react';
import io from 'socket.io-client'

const socketURL = 'https://vast-headland-39512.herokuapp.com/';

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