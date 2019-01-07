var os = require ('os');
var fs = require('fs');
var EventEmitter = require('events');
var Logger = require('./logger');

//displaying memory
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log("total memory: " + totalMemory);
console.log("free memory: " + freeMemory);

//reading directory
const files = fs.readdirSync('./');
console.log(files);
fs.readdir('./', function(err, files){
 if (err) console.log('Error', err);
 else console.log('Result', files);
});
//events
var emitter = new EventEmitter();

//register listener
emitter.on('messageLogged', (e) => {
  console.log('Listener Called', e);
});

//raise an event
emitter.emit('messageLogged', { id: 1, url: 'http://' });

var logger = new Logger();

//listener 2
logger.on('messageLogged', (arg) =>{
console.log('listener called' , arg);
});
logger.log('message');
