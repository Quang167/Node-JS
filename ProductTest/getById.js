const { default: mongoose } = require('mongoose');
const { Product } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');


try {
    const id = '6467689c2ff4d6b4dadfdbd6';


    Product.findById(id).then((result) => {
        console.log(result);
    });
} catch (err) {
    console.log(err);
}