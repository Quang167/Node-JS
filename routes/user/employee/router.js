const express = require('express');
const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const {
    loginSchema,
    getDetailSchema,
    createSchema,
    editSchema,
} = require('./validations');
const {
    // getMe,
    getAll,
    getDetail,
    // create,
    // remove,
    // update,
} = require('./controller');

// router.route('/profile').get(passport.authenticate('jwtUser', { session: false }), getMe)

router.route('/')
    .get(
        getAll,
    )

router.route('/:id')
    .get(validateSchema(getDetailSchema),
        getDetail)


module.exports = router;