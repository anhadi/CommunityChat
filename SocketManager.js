const io = require('./index.js').io

var userList = []

module.exports = function (socket) {
	console.log('New user connected: ', socket.id)

	socket.emit('newMessage', {
		from: 'server',
		text: 'this is a new message',
		createdAt: 123
	});

	socket.on('verifyUser', (username) => {
		console.log('I will now check if this username is in userlist', username)

		if(isUser(userList, username)){
			console.log('name is already taken')
			console.log('these are the currently on users', userList)
		} else {
			console.log('name not in user list')
			userList.push(username);
			console.log('these are the currently on users', userList)
		}
		
	})

	socket.on('createMessage', (newMessage) => {
		console.log('You have a new message:', newMessage)
	})

	socket.on('disconnect', () => {
		console.log(`User has left the chat`);
	})
}

function isUser(userList, username) {
	return userList.includes(username)
}