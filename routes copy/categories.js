var express = require('express');
var router = express.Router();
const yup = require('yup');

const { appendFile, writeFile, generationID, writeFileSync } = require('../utils')


const categories = require('../data/categories.json');

/* GET users listing. */
// LIST PRODUCTS    
router.get('/', function(req, res, next) {
    res.status(200).json({
        code: 2001,
        message: 'Get success!',
        payload: categories
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

            const category = categories.find(c => c.id.toString() === id.toString());

            // res.status(201).json({
            //     code: 2001,
            //     message: 'Get detail success!',
            //     payload: product
            // });
            if (category) {
                return res.send({ ok: true, result: category });
            }

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err.errors, provider: 'yup' });
        });

});

// Create a new product
router.post('/', function(req, res, next) {
    // router.post('/:name/:price/:description', function(req, res, next) {
    // const { name, price, description } = req.params
    const validationSchema = yup.object({
        body: yup.object({
            name: yup.string().max(50).required(),
            description: yup.string(),
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { name, description } = req.body;

            const foundExists = categories.find((item) => item.name === name);

            if (foundExists) {
                res.status(400).json({
                    code: 2011,
                    message: 'Tên thể loại đã tồn tại trong hệ thống',
                });
            }

            const initID = generationID();

            const newCategories = {
                id: initID,
                name,
                description,
            };

            categories.push(newCategories);

            const newC = categories.find((c) => c.id.toString() === initID.toString());


            writeFileSync('./data/categories.json', categories);

            res.status(201).json({
                code: 2011,
                message: 'Created success!!',
                payload: newC,
            });
            console.log('««««« newC »»»»»', newC);

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err, provider: 'yup' });
        });

});

// Update product by method patch
router.patch('/:id', function(req, res, next) {
    // router.post('/:name/:price/:description', function(req, res, next) {
    // const { name, price, description } = req.params
    const validationSchema = yup.object({
        body: yup.object({
            name: yup.string().max(50).required(),
            description: yup.string(),
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { name, description } = req.body;
            //Check name đó có bị trùng không
            const { id } = req.params;
            const foundExists = categories.find((item) => item.id.toString() !== id.toString() && item.name === name);

            if (foundExists) {
                res.status(400).json({
                    code: 2011,
                    message: 'Tên thể loại đã tồn tại trong hệ thống',
                });
            }
            //Check id đó có tồn tại không
            const checkCategoriesExits = categories.find((c) => c.id.toString() === id.toString());

            if (!checkCategoriesExits) {
                res.status(404).json({
                    code: 4041,
                    message: 'Not found',
                });
            }

            const updateCategories = {
                ...checkCategoriesExits,
                name,
                description,
            }

            const newListCategories = categories.map((c) => {
                if (c.id.toString() === id.toString()) {
                    return updateCategories;
                }

                return c;
            })


            writeFileSync('./data/categories.json', newListCategories);

            return res.status(200).json({
                payload: updateCategories,
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
    const validationSchema = yup.object({
        body: yup.object({
            name: yup.string().max(50).required(),
            description: yup.string(),
        }),
    });

    validationSchema
        .validate({ body: req.body }, { abortEarly: false })
        .then(() => {
            console.log('Validation passed');

            const { name, description } = req.body;
            //Check name đó có bị trùng không
            const { id } = req.params;
            const foundExists = categories.find((item) => item.id.toString() !== id.toString() && item.name === name);

            if (foundExists) {
                res.status(400).json({
                    code: 2011,
                    message: 'Tên thể loại đã tồn tại trong hệ thống',
                });
            }
            //Check id đó có tồn tại không
            const checkCategoriesExits = categories.find((c) => c.id.toString() === id.toString());

            if (!checkCategoriesExits) {
                res.status(404).json({
                    code: 4041,
                    message: 'Not found',
                });
            }

            const updateCategories = {
                ...req.body,
                id: Number(id),
            }

            const newListCategories = categories.map((c) => {
                if (c.id.toString() === id.toString()) {
                    return updateCategories;
                }

                return c;
            })


            writeFileSync('./data/categories.json', newListCategories);

            return res.status(200).json({
                payload: updateCategories,
            });

        })
        .catch((err) => {
            return res.status(400).json({ type: err.name, errors: err, provider: 'yup' });
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

            const newCategoriesList = categories.filter((c) => c.id.toString() !== id.toString());

            writeFileSync('./data/products.json', newCategoriesList);

            res.status(200).json({
                message: 'Delete products success!',
            });

        })

    .catch((err) => {
        return res.status(400).json({ type: err.id, errors: err.errors, provider: 'yup' });
    });

});


module.exports = router;