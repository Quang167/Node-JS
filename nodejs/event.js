const EventEmitter = require('events');

const myEmitter = new EventEmitter(); //EventEmitter : là một class chính thức được sử dụng để tạo ra các sự kiện.

// myEmitter.on('eventName', () => {
//     console.log('My event was triggered');
// });

// myEmitter.emit('eventName');


// myEmitter.on('myEvent', (data) => {
//     console.log('My event was triggered with data:', data);
//   });

//   myEmitter.emit('myEvent', 'Hello World');

myEmitter.on('myEvent', (data) => {
    console.log('My event was triggered with data:', data.content);
});

myEmitter.emit('myEvent', { content: 'Hello Quang' });