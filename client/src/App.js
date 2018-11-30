import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './chat/Home.js';
import Login from './chat/Login.js';
import ChatRoom from './chat/ChatRoom.js';
import styles from './App.css'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/chatRoom' component={ChatRoom}/>
        </Switch>
      </div>
    );
  }
}

export default App;