const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs');

// Mongoose Datatypes:
// https://mongoosejs.com/docs/schematypes.html

// Validator
// https://mongoosejs.com/docs/validation.html#built-in-validators

const employeeSchema = new Schema({
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
        }
    },
    address: {
        type: String,
        maxLength: [500, 'Địa chỉ nhà khách hàng không được vượt quá 500 ký tự'],
        unique: [true, 'Địa chỉ nhà nhân viên không được trùng'],
        required: [true, 'Địa chỉ không được bỏ trống'],
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
        unique: [true, 'Email nhân viên không được trùng'],
    },
    birthday: {
        type: Date,
    },
    password: {
        type: String,
        min: [6, "Password tối thiểu phải 6 kí tự"],
        max: [12, "Password phải nhỏ hơn 12 kí tự"],
        required: true
    },
}, {
    versionKey: false,
    timeStamp: true,
}, );

// Virtuals
employeeSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

employeeSchema.pre('save', async function(next) {
    try {
        // generate salt key
        const salt = await bcrypt.genSalt(10); // 10 ký tự
        // generate password = salt key + hash key
        const hashPass = await bcrypt.hash(this.password, salt);
        // override password
        this.password = hashPass;
        next();
    } catch (err) {
        next(err);
    }
});

// employeeSchema.methods.isValidPass = async function(pass) {
//   try {
//     return await bcrypt.compare(pass, this.password);
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// employeeSchema.pre('save', function a(next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, (hashErr, hash) => {
//       if (hashErr) return next(hashErr);

//       user.password = hash;
//       next();
//     });
//   });
// });

const Employee = model('Employee', employeeSchema);
module.exports = Employee;