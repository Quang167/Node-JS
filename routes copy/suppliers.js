var express = require('express');
var router = express.Router();
const yup = require('yup');

const { appendFile, writeFile, generationID, writeFileSync } = require('../utils')


const suppliers = require('../data/suppliers.json');

/* GET users listing. */
// LIST PRODUCTS    
router.get('/', function(req, res, next) {
    res.status(200).json({
        code: 2001,
        message: 'Get success!',
        payload: suppliers
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

            const supplier = suppliers.find(c => c.id.toString() === id.toString());

            // res.status(201).json({
            //     code: 2001,
            //     message: 'Get detail success!',
            //     payload: product
            // });
            if (supplier) {
                return res.send({ ok: true, result: supplier });
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
            name: yup.string().max(100).required(),
            email: yup.string().required('Yêu cầu nhập email').email('Nhập email hợp lệ'),
            phone: yup.string().matches(phoneRegExp, 'SỐ ĐIỆN THOẠI BỊ SAI').required('Số dt không được bỏ trống'),
            address: yup.string(500).required(),
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { name, email, phone, address } = req.body;

            const foundExistsEmail = suppliers.find((item) => item.email === email);

            if (foundExistsEmail) {
                return (
                    res.status(400).json({
                        code: 2011,
                        message: 'Email đã tồn tại trong hệ thống',
                    })
                )

            }

            const foundExistsPhone = suppliers.find((item) => item.phone === phone);

            if (foundExistsPhone) {
                return (
                    res.status(400).json({
                        code: 2011,
                        message: 'Số ĐT đã tồn tại trong hệ thống',
                    })
                )

            }

            const initID = generationID();

            const newSuppliers = {
                id: initID,
                name,
                email,
                phone,
                address
            };

            suppliers.push(newSuppliers);

            const newS = suppliers.find((c) => c.id.toString() === initID.toString());


            writeFileSync('./data/suppliers.json', suppliers);

            res.status(201).json({
                code: 2011,
                message: 'Created success!!',
                payload: newS,
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
            name: yup.string().max(100).required(),
            email: yup.string().required('Yêu cầu nhập email').email('Nhập email hợp lệ'),
            phone: yup.string().matches(phoneRegExp, 'SỐ ĐIỆN THOẠI BỊ SAI').required('Số dt không được bỏ trống'),
            address: yup.string(500).required(),
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { name, email, phone, address } = req.body;
            //Check name đó có bị trùng không
            const { id } = req.params;
            const foundExistsEmail = suppliers.find((item) => item.id.toString() !== id.toString() && item.email === email);

            if (foundExistsEmail) {
                res.status(400).json({
                    code: 2011,
                    message: 'Email nhà cung cấp đã tồn tại trong hệ thống',
                });
            }

            const foundExistsPhone = suppliers.find((item) => item.id.toString() !== id.toString() && item.phone === phone);

            if (foundExistsPhone) {
                res.status(400).json({
                    code: 2011,
                    message: 'Số ĐT đã tồn tại trong hệ thống',
                });
            }
            //Check id đó có tồn tại không
            const checkSuppliersExits = suppliers.find((c) => c.id.toString() === id.toString());

            if (!checkSuppliersExits) {
                res.status(404).json({
                    code: 4041,
                    message: 'Not found',
                });
            }

            const updateSuppliers = {
                ...checkSuppliersExits,
                name,
                email,
                phone,
                address
            }

            const newListSuppliers = suppliers.map((c) => {
                if (c.id.toString() === id.toString()) {
                    return updateSuppliers;
                }

                return c;
            })


            writeFileSync('./data/suppliers.json', newListSuppliers);

            return res.status(200).json({
                payload: updateSuppliers,
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
            name: yup.string().max(100).required(),
            email: yup.string().required('Yêu cầu nhập email').email('Nhập email hợp lệ'),
            phone: yup.string().matches(phoneRegExp, 'SỐ ĐIỆN THOẠI BỊ SAI').required('Số dt không được bỏ trống'),
            address: yup.string(500).required(),
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { name, email, phone, address } = req.body;
            //Check name đó có bị trùng không
            const { id } = req.params;
            const foundExistsEmail = suppliers.find((item) => item.id.toString() !== id.toString() && item.email === email);

            if (foundExistsEmail) {
                res.status(400).json({
                    code: 2011,
                    message: 'Email nhà cung cấp đã tồn tại trong hệ thống',
                });
            }

            const foundExistsPhone = suppliers.find((item) => item.id.toString() !== id.toString() && item.phone === phone);

            if (foundExistsPhone) {
                res.status(400).json({
                    code: 2011,
                    message: 'Số ĐT đã tồn tại trong hệ thống',
                });
            }
            //Check id đó có tồn tại không
            const checkSuppliersExits = suppliers.find((c) => c.id.toString() === id.toString());

            if (!checkSuppliersExits) {
                res.status(404).json({
                    code: 4041,
                    message: 'Not found',
                });
            }

            const updateSuppliers = {
                ...req.body,
                id: Number(id),
            }

            const newListSuppliers = suppliers.map((c) => {
                if (c.id.toString() === id.toString()) {
                    return updateSuppliers;
                }

                return c;
            })


            writeFileSync('./data/suppliers.json', newListSuppliers);

            return res.status(200).json({
                payload: updateSuppliers,
            });

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err.message, provider: 'yup' });
        });

});
// Delete products
router.delete('/:id', function(req, res, next) {

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
            const { id } = req.params;

            const newSuppliersList = suppliers.filter((c) => c.id.toString() !== id.toString());

            writeFileSync('./data/products.json', newSuppliersList);

            res.status(200).json({
                message: 'Delete supplier success!',
            });

        })

    .catch((err) => {
        return res.status(400).json({ type: err.id, errors: err.errors, provider: 'yup' });
    });

});


module.exports = router;