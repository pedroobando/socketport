const SerialPort = require('serialport')
const CCTalk = require('@serialport/parser-cctalk')
const tbaudRate = 2400;
const port = new SerialPort('/dev/ttyUSB0', {
	baudRate: tbaudRate,});

const parser = port.pipe(new CCTalk())
parser.on('data', function(data) { 
  // console.log(data);
  var reciveData = data.toString();
  console.log(reciveData);
});
