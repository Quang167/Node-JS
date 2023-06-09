const { appendFile, writefile } = require('./fs/fsWrite');

// writefile('D:/SoftTech/Back-end/Node-demo/files/example.txt', 'Xin chao moi nguoi');
appendFile('./files/example.txt', 'Xin chao moi nguoi 123\n');