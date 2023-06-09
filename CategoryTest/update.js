const { default: mongoose } = require('mongoose');
const { Category } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');


try {
    const id = '6467689c2ff4d6b4dadfdbd6';

    const data = { name: 'Thời trang em bé' };

    Category.findByIdAndUpdate(id, data, {
        new: true,
    }).then((result) => {
        console.log(result);
    });
} catch (err) {
    console.log(err);
}