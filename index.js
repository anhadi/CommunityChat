const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http'); 

const app = express();
var server = http.createServer(app);
var io = socketIO(server)

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/expressHome', (req,res) => {
    res.send('Hello from expressHome!')
});

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

io.on('connection', (socket) => {
	console.log('New user connected: ', socket.id)
})

const port = process.env.PORT || 5000;

server.listen(port, (err) => {
	if(err){
		console.log(err)
	}else{
		console.log('App is listening on port ' + port);
	}
});