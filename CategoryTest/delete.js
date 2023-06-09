const { default: mongoose } = require('mongoose');
const { Category } = require('../models');

mongoose.connect('mongodb://127.0.0.1:27017/batch-29-30-database');


try {
    const id = '64676e2f0373fddcaeba0e0e';

    Category.findByIdAndDelete(id).then((result) => {
        console.log(result);
    });

    // Category.deleteOne({ _id: id }).then((result) => {
    //     console.log(result);
    // });
} catch (err) {
    console.log(err);
}