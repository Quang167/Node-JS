const { default: mongoose } = require('mongoose');
const { Category } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');


try {
    const id = '6467689c2ff4d6b4dadfdbd6';


    Category.findById(id).then((result) => {
        console.log(result);
    });
} catch (err) {
    console.log(err);
}