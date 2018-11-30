import React, { Component } from 'react';

import MessagesDisplay from './MessagesDisplay';
import PrivateMessagesDisplay from './PrivateMessagesDisplay';


export default class ChatRoom extends Component {
	constructor(props){
		super(props)

		this.state={
			view:'',
			displaySidebar:true
		}
	}

	privateView = (user) => {
		const clicked = user.id
		const { view } = this.state
		if (view !== clicked) {
			this.setState({view:clicked});
		} else {
			this.setState({view:''});
		}
	}

	publicView = () => {
		this.setState({
			view: ''
		})
	}

	displaySidebar = () => {
		this.setState(prevState => ({
			displaySidebar: !prevState.displaySidebar
		}))
		
		console.log('you clicked button! displaySidebar is now true')
	}

	render(){
		const { userList, messages, typingMessage, socket, user, privateMessages } = this.props
		const { view, displaySidebar } = this.state
		const userLinks = userList.filter((userItem) => {
			if(userItem.id !== user.id){
				return true
			} else {
				return false
			}
		})
 		const userLink = userLinks.map((user) => {
			return <div className={view===user.id ? "userDiv userDivActive border-right-0 rounded p-3 my-2 mx-4 text-right text-warning border border-info" : "userDiv rounded p-3 my-2 text-right border border-info"} key={user.id} onClick={() => this.privateView(user)}>{user.username}</div>
		})
		const mainChatLi = <div className="p-3 h3" onClick={this.publicView}>Community<br /> Chat</div>

		return(
			<div className="d-flex">				
			  <div className={displaySidebar ? "sidediv text-truncate maindiv d-md-flex d p-4" : "d-none"}>
			  	
			  	<div className="d-flex flex-column">
			  		{mainChatLi}
			  		{userLink}
		        </div>
			  </div>

			  <div className="maindiv p-4 flex-fill">
			  	<div className="d-inline" onClick={this.displaySidebar}><i class="fa fa-bars" style={{fontSize: "28px"}}></i> </div>
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

				
			</div>
		)
	}
}