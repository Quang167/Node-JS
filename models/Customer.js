const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const customerSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'Vui lòng nhập họ của khách hàng'],
        maxLength: [50, 'Họ khách hàng không được quá 50 kí tự'],
    },
    lastName: {
        type: String,
        required: [true, 'Vui lòng nhập tên của khách hàng'],
        maxLength: [50, 'Tên khách hàng không được quá 50 kí tự'],
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(value) {
                const phoneRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
                return phoneRegex.test(value);
            },
            message: `{value} không phải là số điện thoại hợp lệ`,
        },
    },
    address: {
        type: String,
        maxLength: [500, 'Địa chỉ nhà khách hàng không được vượt quá 500 ký tự'],
        unique: [true, 'Địa chỉ nhà khách hàng không được trùng'],
        required: [true, 'Địa chỉ nhà không được bỏ trống'],
    },
    email: {
        type: String,
        validate: {
            validator: function(value) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: `{VALUE} không phải là email hợp lệ!`,
            // message: (props) => `{props.value} is not a valid email!`,
        },
        required: [true, 'Email không được bỏ trống'],
        unique: [true, 'Email không được trùng'],

    },
    birthday: {
        type: Date,
    }

}, {
    versionKey: false,
    timeStamp: true,
}, );

customerSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
})

// Config
customerSchema.set('toJSON', { virtuals: true });
customerSchema.set('toObject', { virtuals: true });
//
customerSchema.plugin(mongooseLeanVirtuals);

const Customer = model('Customer', customerSchema);
module.exports = Customer;