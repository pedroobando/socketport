// buena guia: https://ubuntuperonista.blogspot.com/2017/09/como-me-conecto-traves-de-conexion-serial-ttl-ubuntu.html
// serialport: https://github.com/node-serialport/node-serialport#readme
// Muestra los puertos USB
// $ dmesg | grep tty

const serialPort = require('serialport');
const byteLength =require('@serialport/parser-byte-length');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const portIp = 3000;
const baudRate = 2400;
const portName = "/dev/ttyACM0"; //COM1, COM2

const puertoSerial = serialPort(portName, {
  baudRate
});

function onOpenPort() {
  try {
    console.log(`Puerto conectado: ${portName}`, );  
  } catch (error) {
    console.error(`error apertura ${error}`);
  }
}

function onData(data) {
  try {
    var reciveData = reverse(data.toString());
    reciveData = reciveData.replace(/(\r\n|\n|\r|\=)/gm,"");
    console.log(reciveData);
    io.emit('lectura', reciveData);
  } catch (error) {
    console.error(error);
  }
}

const lecturaPuerto = puertoSerial.pipe(new byteLength({length: 8}));
try {
  lecturaPuerto.on('open', onOpenPort);
  lecturaPuerto.on('data', onData);
} catch (error) {
  console.error(`Error lectura`);
}

io.on('connection', (socket) => {
  // socket.emit('lectura', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
  console.log('Usuario Conectado');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.listen(portIp, () => {
  console.log(`Servidor corriendo en el puerto: ${portIp}`);
  console.log(`http://localhost:${portIp}/`);
});
// WARNING: app.listen(80) will NOT work here!


function reverse(str){
  let reversed = "";
  for (var i = str.length - 1; i >= 0; i--){
    reversed += str[i];
  }
  return reversed;
}
