var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

var users = {};

io.on('connection', function (socket) {
	socket.on('my other event', function (msg) {
		console.log('connect msg', socket.id);

		for (let key in msg) {
			console.log(key);
			console.log(msg[key]);

			io.emit(key, msg[key]);
		}
	});

	// socket.on('user join', function (user) {
	// 	console.log('connect msg', socket.id);
	// });

	socket.on('connect', function (msg) {
		console.log('connect msg', socket.id);
	});

	socket.on('disconnect', function (msg) {
		console.log('disconnect msg', socket.id);
	});
});

http.listen(port, function () {
	console.log('listening on *:' + port);
});
