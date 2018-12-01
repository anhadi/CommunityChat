const io = require('./index.js').io

var userList = []

module.exports = function (socket) {
	console.log('New user connected: ', socket.id)

	socket.emit('newMessage', {
		from: 'server',
		text: 'this is a new message',
		createdAt: 123,
		user: {
			username: "NAME",
			id: 123
		}
	});

	socket.on('verifyUser', (username, callback) => {
		console.log('I will now check if this username is in userlist', username)

		if(isUser(userList, username)){
			console.log('name is already taken')
			console.log('these are the currently on users', userList)
			callback({error: 'ERROR: name already taken', userList});
		} else {
			console.log('name not in user list')
			const newUser = addNewUser(username, socket)
			console.log('these are the currently on users', userList)
			console.log('this is what you will send as newUser', newUser)
			callback({error: '', userList, newUser});
		}
		
	})

	socket.on('newUser', (user) => {
		console.log('***** newUser was emitted succesfully from Login to Index.js')

		io.emit('newUserEnterChat', { user, userList} );
	})

	socket.on('userTyping', (user) => { 
		const username = user.username;
		socket.broadcast.emit('activateTypingMessage', username)
	})

	socket.on('sendMessage', ({user, message}) => {
		console.log(user.id, socket.id)
		io.emit('newMessage', {user, message});

	})

	socket.on('privateMessage', ({receiver, sender, author, message, date,id}) => {
		
		const test='lskdfjlskdjfsldf'

		const newChat = {
			receiver, sender, author, message, date, id
		}
		console.log(newChat);	
		io.to(receiver).emit('newPrivateMessage', newChat);
		if(receiver !== sender){
			socket.emit('newPrivateMessage', newChat)
		}



	})

	socket.on('disconnect', () => {
		const username = removeUser(socket.id);
		io.emit('userLeftChat', {userList, username});
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
	var remove;
	userList = userList.filter( user => {
		if( user.id !== id) {
			return true
		}
		remove = user.username;
		return false
	})

	return remove;
}

function addNewUser(username,socket) {
	const user = {
		username,
		id: socket.id
	}
	userList.push(user);

	return user;
}




