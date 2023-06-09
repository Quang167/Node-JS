const http = require('http');
const fs = require('fs');
http.createServer(function(req, res) {
        fs.readFile('demohtml.html', function(err, data) {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.write(data);
            return res.end(data);
        });
    })
    .listen(3001, '127.0.0.1', () => {
        console.log('Sever running at http://127.0.0.1:3001')
    })

// const { sayHello, sayHi } = require('./first');
// const { sayHello : Hello, sayHi :Hi } = require('./first');
// // const saySomeThing = require('./first');

// sayHello();
// sayHi('Han');

// Hello();
// Hi();