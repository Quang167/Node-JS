const { default: mongoose } = require('mongoose');
const { Supplier } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');

try {
    const supplier = {
        name: 'Nhà cung cấp C',
        email: 'c@gmail.com',
        phoneNumber: '0777907833',
        address: 'Ha Noi',
    };

    const newSupplier = new Supplier(supplier);
    console.log('««««« newSupplier »»»»»', newSupplier);
    newSupplier.save().then((result) => {
        console.log('««««« result »»»»»', result);
    });
} catch (err) {
    console.log(err);
}