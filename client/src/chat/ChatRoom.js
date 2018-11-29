import React, { Component } from 'react';

import Sidebar from './Sidebar';
import MessagesDisplay from './MessagesDisplay';
import PrivateMessagesDisplay from './PrivateMessagesDisplay';


export default class ChatRoom extends Component {
	constructor(props){
		super(props)

		this.state={
			view:''
		}
	}

	privateView = (user) => {
		const view = user.id
		if (this.props.user.id !== view) {
			this.setState({view});
		}
	}

	publicView = () => {
		this.setState({
			view: ''
		})
	}

	render(){
		const { userList, messages, typingMessage, socket, user, privateMessages } = this.props
		const { view } = this.state
 		const userLink = userList.map((user) => {
			return <li key={user.id} onClick={() => this.privateView(user)}>{user.username} {user.id}</li>
		})
		const mainChatLi = <li onClick={this.publicView}>Community Chat</li>

		return(
			
			<div style={{ display: "flex" }}>
		        <Sidebar secret={mainChatLi} userList={userList}/>
		        <div className='sidediv'
		          style={{
		            padding: "10px",
		            width: "275px",
		            height: "100vh",
		            background: "#373a47"
		          }}
		        >
		        {mainChatLi}
		        <ul>

		        	{userLink}
		        </ul>
		        </div>

		        {view ? 
		        	<PrivateMessagesDisplay 
		        		privateMessages={privateMessages}
			        	typingMessage={typingMessage}
			        	socket={socket}
			        	user={user}
			        	view={view}
			        /> 
		        	:
		        	<MessagesDisplay 
			        	messages={messages}
			        	typingMessage={typingMessage}
			        	socket={socket}
			        	user={user}
	        		/> 
	        	}
		        
		        
		      </div>
		)
	}
}