const SerialPort = require('serialport')
// const CCTalk = require('@serialport/parser-cctalk')
const ByteLength = require('@serialport/parser-byte-length')
const tbaudRate = 2400;
const port = new SerialPort('/dev/ttyUSB0', {
	baudRate: tbaudRate,});

// const parser = port.pipe(new CCTalk())
const parser = port.pipe(new ByteLength({length: 8}))
parser.on('data', function(data) { 
  // console.log(data);
  var reciveData = data.toString();
  const realData = reverse(reciveData);
  console.log(realData);
});


function reverse(str){
  let reversed = "";    
  for (var i = str.length - 1; i >= 0; i--){        
    reversed += str[i];
  }    
  return reversed;
}