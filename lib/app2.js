var SerialPort = require("serialport");

const thePort = "/dev/ttyUSB0";
const tbaudRate = 2400;
const parsers = SerialPort.parsers;
const tparser = new parsers.Readline({
	delimiter: '\r\n'
});

var serialPort = new SerialPort("/dev/ttyUSB0", {
	baudRate: tbaudRate,
	
	// dataBits: 8,
	// parity: 'none',
  // stopBits: 1,
   parser: tparser
});


// var serialPort = new Serialport(portName, {
// 	baudRate: baudRate,
// 	dataBits: 8,
// 	parity: 'none',
// 	stopBits: 1,
// 	parser: parsers
// });

serialPort.on('data', function(data) { 
  // console.log(data);
	var reciveData = data.toString();
  reciveData = reciveData.replace(/(\r\n|\n|\r)/gm,"+");
	console.log(reciveData);
	// console.log(`${data}`);

 });
 