const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http'); 

const app = express();
const SocketManager = require('./SocketManager');
var server = http.createServer(app);
var io = module.exports.io = socketIO(server);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/expressHome', (req,res) => {
    res.send('Hello from expressHome!')
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

var userList = []

io.on('connection', function (socket) {
	console.log('New user connected: ', socket.id)

	socket.emit('newMessage', {
		from: 'server',
		text: 'this is a new message',
		createdAt: 123
	});

	socket.on('verifyUser', (username, callback) => {
		console.log('I will now check if this username is in userlist', username)

		if(isUser(userList, username)){
			console.log('name is already taken')
			console.log('these are the currently on users', userList)
			callback({error: 'ERROR: name already taken', userList});
		} else {
			console.log('name not in user list')
			addNewUser(username, socket)
			console.log('these are the currently on users', userList)
			callback({error: '', userList});
		}
		
	})

	socket.on('newUser', (username) => {
		console.log('***** newUser was emitted succesfully from Login to Index.js')

		const newUser = userList.filter((user) => user.username === userList)

		if (newUser === []) {
			addNewUser(username, socket);
		}

		io.emit('newUserEnterChat', { username, userList} );
	})

	socket.on('userTyping', (username) => { 
		io.emit('activateTypingMessage', username)
	})

	socket.on('sendMessage', ({username, message}) => {
		io.emit('newMessage', {username, message});

	})

	socket.on('disconnect', () => {
		console.log(userList)
		console.log(`User has left the chat`);
		removeUser(socket.id);
		io.emit('userLeftChat', userList);
		console.log(userList)
	})
})

function isUser(userList, name) {
	var x = 0;
	userList.forEach((user) => {
		if(user.username === name){
			x++;
		}
	})

	if(x>0){
		return true 
	}
}

function removeUser(id) {
	userList = userList.filter( user => {
		if( user.id !== id) {
			return true
		}
		return false
	})
}

function addNewUser(username,socket) {
	userList.push({
		username,
		id: socket.id
	});
}


const port = process.env.PORT || 5000;

server.listen(port, (err) => {
	if(err){
		console.log(err)
	}else{
		console.log('App is listening on port: ' + port);
	}
});