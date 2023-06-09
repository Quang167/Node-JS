var express = require('express');
var router = express.Router();
const yup = require('yup');

const { appendFile, writeFile, generationID, writeFileSync } = require('../utils')


const customers = require('../data/customers.json');

/* GET users listing. */
// LIST PRODUCTS    
router.get('/', function(req, res, next) {
    res.status(200).json({
        code: 2001,
        message: 'Get success!',
        payload: customers
    });
});

//LIST DETAILS PRODUCTS
router.get('/:id', function(req, res, next) {

    const validationSchema = yup.object().shape({
        id: yup.number().test('idLength', 'Must be 13 characters long', val => {
            if (!val) return true;
            console.log('««««« val »»»»»', val);
            return val.toString().length === 13;
        }),
    });


    validationSchema
        .validate(req.params, { abortEarly: false })
        .then(() => {

            const id = req.params.id;

            const customer = customers.find(c => c.id.toString() === id.toString());

            // res.status(201).json({
            //     code: 2001,
            //     message: 'Get detail success!',
            //     payload: product
            // });
            if (customer) {
                return res.send({ ok: true, result: customer });
            }

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err.message, provider: 'yup' });
        });

});

// Create a new product
router.post('/', function(req, res, next) {
    // router.post('/:name/:price/:description', function(req, res, next) {
    // const { name, price, description } = req.params

    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    const validationSchema = yup.object({
        body: yup.object({
            firstName: yup.string().max(50).required(),
            lastName: yup.string().max(50).required(),
            email: yup.string().required('Yêu cầu nhập email').email('Nhập email hợp lệ'),
            phone: yup.string(null).matches(phoneRegExp, 'SỐ ĐIỆN THOẠI BỊ SAI').required('Số dt không được bỏ trống'),
            address: yup.string(500).required(),
            birthday: yup.date()
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { firstName, lastName, email, phone, address, birthday } = req.body;

            const foundExistsEmail = customers.find((item) => item.email === email);

            if (foundExistsEmail) {
                res.status(400).json({
                    code: 2011,
                    message: 'Email đã tồn tại trong hệ thống',
                });
            }

            const foundExistsAddress = customers.find((item) => item.address === address);

            if (foundExistsAddress) {
                res.status(400).json({
                    code: 2011,
                    message: 'Địa chỉ đã tồn tại trong hệ thống',
                });
            }

            const initID = generationID();

            const newCustomers = {
                id: initID,
                firstName,
                lastName,
                email,
                phone,
                address,
                birthday
            };

            customers.push(newCustomers);

            const newC = customers.find((c) => c.id.toString() === initID.toString());


            writeFileSync('./data/customers.json', customers);

            res.status(201).json({
                code: 2011,
                message: 'Created success!!',
                payload: newC,
            });

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err, provider: 'yup' });
        });

});

// Update product by method patch
router.patch('/:id', function(req, res, next) {
    // router.post('/:name/:price/:description', function(req, res, next) {
    // const { name, price, description } = req.params
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    const validationSchema = yup.object({
        body: yup.object({
            firstName: yup.string().max(50).required(),
            lastName: yup.string().max(50).required(),
            email: yup.string().required('Yêu cầu nhập email').email('Nhập email hợp lệ'),
            phone: yup.string(null).matches(phoneRegExp, 'SỐ ĐIỆN THOẠI BỊ SAI').required('Số dt không được bỏ trống'),
            address: yup.string(500).required(),
            birthday: yup.date()
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { firstName, lastName, email, phone, address, birthday } = req.body;
            //Check name đó có bị trùng không
            const { id } = req.params;
            const foundExistsEmail = customers.find((item) => item.id.toString() !== id.toString() && item.email === email);

            if (foundExistsEmail) {
                res.status(400).json({
                    code: 2011,
                    message: 'Tên thể loại đã tồn tại trong hệ thống',
                });
            }

            const foundExistsAddress = customers.find((item) => item.id.toString() !== id.toString() && item.address === address);

            if (foundExistsAddress) {
                res.status(400).json({
                    code: 2011,
                    message: 'Địa chỉ đã tồn tại trong hệ thống',
                });
            }
            //Check id đó có tồn tại không
            const checkCustomersExits = customers.find((c) => c.id.toString() === id.toString());

            if (!checkCustomersExits) {
                res.status(404).json({
                    code: 4041,
                    message: 'Not found',
                });
            }

            const updateCustomers = {
                ...checkCustomersExits,
                ...req.body,
            }

            const newListCustomers = customers.map((c) => {
                if (c.id.toString() === id.toString()) {
                    return updateCustomers;
                }

                return c;
            })


            writeFileSync('./data/customers.json', newListCustomers);

            return res.status(200).json({
                payload: updateCustomers,
            });

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err.message, provider: 'yup' });
        });

});

// Update product by method put
router.put('/:id', function(req, res, next) {
    // router.post('/:name/:price/:description', function(req, res, next) {
    // const { name, price, description } = req.params
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    const validationSchema = yup.object({
        body: yup.object({
            firstName: yup.string().max(50).required(),
            lastName: yup.string().max(50).required(),
            email: yup.string().required('Yêu cầu nhập email').email('Nhập email hợp lệ'),
            phone: yup.string(null).matches(phoneRegExp, 'SỐ ĐIỆN THOẠI BỊ SAI').required('Số dt không được bỏ trống'),
            address: yup.string(500).required(),
            birthday: yup.date()
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { firstName, lastName, email, phone, address, birthday } = req.body;
            //Check name đó có bị trùng không
            const { id } = req.params;
            const foundExistsEmail = customers.find((item) => item.id.toString() !== id.toString() && item.email === email);

            if (foundExistsEmail) {
                res.status(400).json({
                    code: 2011,
                    message: 'Tên thể loại đã tồn tại trong hệ thống',
                });
            }

            const foundExistsAddress = customers.find((item) => item.id.toString() !== id.toString() && item.address === address);

            if (foundExistsAddress) {
                res.status(400).json({
                    code: 2011,
                    message: 'Địa chỉ đã tồn tại trong hệ thống',
                });
            }
            //Check id đó có tồn tại không
            const checkCustomersExits = customers.find((c) => c.id.toString() === id.toString());

            if (!checkCustomersExits) {
                res.status(404).json({
                    code: 4041,
                    message: 'Not found',
                });
            }

            const updateCustomers = {
                ...req.body,
                id: Number(id),
            }

            const newListCustomers = customers.map((c) => {
                if (c.id.toString() === id.toString()) {
                    return updateCustomers;
                }

                return c;
            })


            writeFileSync('./data/customers.json', newListCustomers);

            return res.status(200).json({
                payload: updateCustomers,
            });

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err.message, provider: 'yup' });
        });

});
// Delete products
router.delete('/:id', function(req, res, next) {

    const validationSchema = yup.object().shape({
        id: yup.number().required(),
    });

    validationSchema
        .validate(req.params, { abortEarly: false })
        .then(() => {
            const { id } = req.params;

            const newCustomersList = customers.filter((c) => c.id.toString() !== id.toString());

            writeFileSync('./data/products.json', newCustomersList);

            res.status(200).json({
                message: 'Delete products success!',
            });

        })

    .catch((err) => {
        return res.status(400).json({ type: err.id, errors: err.errors, provider: 'yup' });
    });

});


module.exports = router;