const { default: mongoose } = require('mongoose');
const { Supplier } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');


try {
    const id = '6469d0410f04c1040128ee87';

    const data = {
        email: 'b@gmail.com',
        phoneNumber: '0777907832',
        address: 'Tp HCM'
    };

    Supplier.findByIdAndUpdate(id, data, {
        new: true,
    }).then((result) => {
        console.log(result);
    });
} catch (err) {
    console.log(err);
}