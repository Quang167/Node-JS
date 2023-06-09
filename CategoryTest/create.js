const { default: mongoose } = require('mongoose');
const { Category } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');

try {
    const category = {
        name: 'Thời trang nữ',
        description: 'Mô tả ...',
    };

    const newCategory = new Category(category);
    console.log('««««« newCategory »»»»»', newCategory);
    newCategory.save().then((result) => {
        console.log('««««« result »»»»»', result);
    });
} catch (err) {
    console.log(err);
}