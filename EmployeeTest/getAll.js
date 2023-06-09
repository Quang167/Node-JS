const { default: mongoose } = require('mongoose');
const { Supplier } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');


try {
    Supplier.find().then((result) => {
        console.log(result);
    });
} catch (err) {
    console.log(err);
}