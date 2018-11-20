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
		console.log('I will now check if this username is in userlist')
	})

	socket.on('createMessage', (newMessage) => {
		console.log('You have a new message:', newMessage)
	})

	socket.on('disconnect', () => {
		console.log(`User has left the chat`);
	})
}

function isUser(userList, username) {
	return username in userList
}