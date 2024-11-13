const EventEmitter = require("events");

const customEmitter = new EventEmitter();

customEmitter.on("response", (name, state) => {
    console.log(`data recieved: name ${name}, state ${state}`);
});

customEmitter.on("response", () => {
   const interval = setInterval(() => {
        customEmitter.emit("timer", "hi there");
    }, 2000);
    console.log("data recieved after interval");
    setTimeout(()=> {
        clearInterval(interval)
        console.log('stop timer')
    }, 6000)
});

customEmitter.on("timer", (message) => {
    console.log(message);
});

customEmitter.emit("response", 'Anna', 'FL');
