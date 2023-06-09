const fs = require('fs');

// function này sẽ tạo ra content mới liên tục trong file
function appendFile(name = 'file.txt', content = '') {
    fs.appendFile(name, content, function(err) {
        if (err) throw err;
        console.log('Success!');
    });
}

// function này sẽ ghi đè lên file cũ thành 1 content mới 
function writefile(name = 'file.txt', content = '') {
    fs.writeFile(name, content, function(err) {
        if (err) throw err;
        console.log('Success!');
    });
}

module.exports = {
    appendFile,
    writefile,
};