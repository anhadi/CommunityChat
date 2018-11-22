const io = require('./index.js').io

var userList = []

module.exports = function (socket) {
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
			userList.push({
				username,
				id: socket.id
			});
			console.log('these are the currently on users', userList)
			callback({error: '', userList});
		}
		
	})

	socket.on('newUser', (user) => {
		console.log('***** newUser was emitted succesfully from Login to SocketManager')
		io.emit('newUserEnterChat', user);
	})

	socket.on('createMessage', (newMessage) => {
		console.log('You have a new message:', newMessage)

	})

	socket.on('disconnect', () => {
		console.log(userList)
		console.log(`User has left the chat`);
		removeUser(socket.id);
		console.log(userList)
	})
}

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









