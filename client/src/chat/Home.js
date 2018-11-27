import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Home extends Component {
	render(){
		return(
			<div>
				<p>This is the Home.js page</p>
				<ul>
				<li><Link to='/login'>Login</Link></li>
				<li><Link to='/chatRoom'>ChatRoom</Link></li>
				<li><Link to='/TestSideBar'>TestSideBar</Link></li>
				</ul>
			</div>
		)
	}
}