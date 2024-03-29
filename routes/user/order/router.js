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
    login,
    checkRefreshToken,
    // basic,
    // getMe,
    getAll,
    getDetail,
    create,
    remove,
    // update,
} = require('./controller');

router.route('/login') // Đối tượng cần kiểm tra là tài khoản và mật khẩu gửi lên
    .post(
        validateSchema(loginSchema),
        passport.authenticate('localUser', { session: false }),
        login,
    )

router.route('/refresh-token').post(checkRefreshToken)

// router.route('/profile').get(passport.authenticate('jwtUser', { session: false }), getMe)

router.route('/')
    .get(
        passport.authenticate('jwtUser', { session: false }),
        getAll,
    )
    .post(validateSchema(createSchema),
        passport.authenticate('jwtUser', { session: false }),
        create)

router.route('/:id')
    .get(validateSchema(getDetailSchema),
        passport.authenticate('jwtUser', { session: false }),
        getDetail)
    // .patch(validateSchema(editSchema), passport.authenticate('jwtUser', { session: false }), update)
    .delete(
        validateSchema(getDetailSchema),
        passport.authenticate('jwtUser', { session: false }),
        remove,
    )

module.exports = router;