function sayHello(name = 'Quang') {
    console.log('««««« Hello »»»»»', name);
}

function sayHi(name = 'Quang') {
    console.log('««««« Hi »»»»»', name);
}

// module.exports = sayHello;
module.exports = {
    sayHello,
    sayHi
};