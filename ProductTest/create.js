const { default: mongoose } = require('mongoose');
const { Product } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');

try {
    const product = {
        name: 'Giày em bé',
        price: 50000,
        discount: 10,
        stock: 30,
        categoryId: '6467689c2ff4d6b4dadfdbd6',
        supplierId: '6469cf38619e12a7614c16d6',
    };

    const newProduct = new Product(product);
    console.log('««««« newProduct »»»»»', newProduct);

    newProduct
        .save()
        .then((result) => {
            console.log('««««« result »»»»»', result);
        });
} catch (err) {
    console.log(err);
}