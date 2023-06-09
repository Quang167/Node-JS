const { default: mongoose } = require('mongoose');
const { Customer } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');

try {
    const customer = {
        firstName: 'Nguyễn',
        lastName: 'Xuân Quang',
        birthday: '2002-07-16',
        email: 'c@gmail.com',
        phoneNumber: '0777907833',
        address: 'Phạm Văn Nghị',
    };

    const newCustomer = new Customer(customer);
    console.log('««««« newCustomer »»»»»', newCustomer);
    newCustomer.save().then((result) => {
        console.log('««««« result »»»»»', result);
    });
} catch (err) {
    console.log(err);
}