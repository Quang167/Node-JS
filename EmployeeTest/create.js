const { default: mongoose } = require('mongoose');
const { Employee } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');

try {
    const employee = {
        firstName: 'Nguyễn',
        lastName: 'Xuân Quang',
        birthday: '16/07/2002',
        email: 'Quang@gmail.com',
        phoneNumber: '0258963147',
        address: 'Phạm Văn Nghị',
    };

    const newEmployee = new Employee(employee);
    console.log('««««« newEmployee »»»»»', newEmployee);
    newEmployee.save().then((result) => {
        console.log('««««« result »»»»»', result);
    });
} catch (err) {
    console.log(err);
}