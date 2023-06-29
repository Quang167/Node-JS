const express = require('express');
const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const {
    getDetailSchema,
    createSchema,
} = require('./validations');
const {
    getDetail,
    create,
    remove,
} = require('./controller');



router.route('/')
    // .get(
    //     passport.authenticate('jwtUser', { session: false }),
    //     getAll,
    // )
    .post(validateSchema(createSchema),
        passport.authenticate('jwtUser', { session: false }),
        create)

router.route('/:id')
    .get(validateSchema(getDetailSchema),
        passport.authenticate('jwtUser', { session: false }),
        getDetail)
    .delete(
        passport.authenticate('jwtUser', { session: false }), // CHECK TOKEN IS VALID
        // allowRoles('DELETE_CUSTOMER'), // CHECK USER HAS ROLE
        validateSchema(getDetailSchema), // CHECK PARAMS
        remove, // HANDLE DELETE
    )

module.exports = router;