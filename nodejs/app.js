// require is a function unique to node (not browsers)
//      require is local to modules (passed as a parameter in IIFE (module wrapper function))
// const catches errors at compile time, than at run time


// Node modules:
const path = require('path');
const os = require('os');
const fs = require('fs');



// function sayHello(name) {
//     console.log("Hello " + name);
// }

// sayHello("Mosh");

// console.log(global); // THE global object
// console.log(module); //module is NOT part of the global object

// returns path root, dir, base, ext, and name
var pathObj = path.parse(__filename);

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

// console.log("Total Memory: " + totalMemory);
// console.log(`Free Memory: ${freeMemory}`);

const files = fs.readdirSync('./');
console.log(`files: ${files}`);

fs.readdir('./', (err, resultArr) => {
    if (err) console.log('Error: ', err);
    else console.log("Result: ", files);
})


const EventEmitter = require('events'); // double UC (Pascal case) naming to symbolize a class

// Raise: logging (data: message)
const Logger = require('./logger'); //custom defined class
const logger = new Logger();

// Register a listener
logger.on('messageLogged', (arg) => { // arg, e, or eventArg
    console.log("Listener called:", arg);
});

logger.log('message');

const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("hello world!");
        res.end();
    }

    if (req.url === '/api/courses') {//stringify converts array to a string, using JSON syntax
        res.write(JSON.stringify([1, 2, 3]));
        res.end(); //require res.end() to write to response
    }
}); //creates a webserver; is net.server => an event emitter

server.on('connection', (socket) => {
    console.log("New connection ...")
});

server.listen(3000);

console.log('Listening on port 3000...');
