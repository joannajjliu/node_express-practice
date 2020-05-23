// reusaeable logging service

/* Behind the scenes (IIFE syntax/ module wrapper function)*/
// (function (exports, require, module, __filename, __dirname) {    
    console.log(__filename);
    console.log(__dirname);
    
    const EventEmitter = require('events'); // double UC naming to symbolize a class
    //const emitter = new EventEmitter(); //emitter object of EventEmitter class

    // url is an implementation detail; 
    //  we don't export it,
    //  it can change between iterations.
    var url = 'http://mylogger.io/log'; //url endpoint
    
    class Logger extends EventEmitter {
        log(message) {// function inside class is a class method
            // send an HTTP request:
            console.log(message);

            // Raise an event
            this.emit('messageLogged', { id: 1, url: 'http://'}); // make a noise, produce something
        }
    }



    /* export object from module:
        useful for multiple objects/ properties */
    // module.exports.log = log;
    
    // export only single function from module
    module.exports = Logger;
    


