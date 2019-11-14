'use strict'
// buena guia: https://ubuntuperonista.blogspot.com/2017/09/como-me-conecto-traves-de-conexion-serial-ttl-ubuntu.html
// serialport: https://github.com/node-serialport/node-serialport#readme
// Muestra los puertos USB
// $ dmesg | grep tty


const Serialport = require('serialport');
const ByteLength = require('@serialport/parser-byte-length')

const Express = require('express');
var app = Express();
const Server = require('http').Server(app);
const io = require('socket.io').listen(Server);

const parsers = Serialport.parsers;

// COM1 - COM2
const portName = "/dev/ttyACM0";
const baudRate = 2400;

// const parser = new parsers.Readline({
// 	delimiter: '\r\n'
// });

var myPort = new Serialport(portName, {
	baudRate: baudRate
});
const parser = myPort.pipe(new ByteLength({length: 8}))
parser.on('open', onOpen);

function onOpen() {
	console.log(`Ardunino conectado Port:` + portName);
}

parser.on('data', onData);


io.on('connection', (socket) => {
	console.log('Usuario Conectado...!')
});

function onData(data) {
	var reciveData = reverse(data.toString());
  reciveData = reciveData.replace(/(\r\n|\n|\r|\=)/gm,"");
  // console.log(`${reciveData}`);

	io.emit('lectura', reciveData);
}

app.get('/', (req, res) => {
  // const rutaHtml = __dirname.replace(/(\r\n|\lib)/gm,"public");
	res.sendfile(__dirname + '/public/index.html');
})

Server.listen(8080, () => {
	console.log('Servidor corriendo en puerto: 8080');
  console.log('http://localhost:8080/');
  // console.log(__dirname.replace(/(\r\n|\lib)/gm,"public"));
});


function reverse(str){
  let reversed = "";
  for (var i = str.length - 1; i >= 0; i--){
    reversed += str[i];
  }
  return reversed;
}
