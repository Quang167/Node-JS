const { default: mongoose } = require('mongoose');
const { Product } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');

try {
    Product
        .find()
        .populate('category')
        .populate('supplier')
        .lean({ virtuals: true })
        .then((result) => {
            console.log(result);
        });
} catch (err) {
    console.log(err);
}