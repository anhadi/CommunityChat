import React, { Component } from 'react';

import Sidebar from './Sidebar';
import MessagesDisplay from './MessagesDisplay';


export default class ChatRoom extends Component {
	constructor(props){
		super(props)

		this.state={}
	}

	render(){
		const { userList, messages, typingMessage, socket, user } = this.props
 		const userLink = userList.map((user) => {
			return <li key={user.id}>{user.username}</li>
		})
		const secret ='CHATROOM'

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
		        	{userLink}
		        </ul>
		        </div>

		        <MessagesDisplay 
		        	messages={messages}
		        	typingMessage={typingMessage}
		        	socket={socket}
		        	user={user}
	        	/>
		        
		      </div>
		)
	}
}