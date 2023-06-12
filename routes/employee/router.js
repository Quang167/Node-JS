const express = require('express');
const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
    loginSchema,
    getDetailSchema,
    createSchema,
    editSchema,
} = require('./validations');
const {
    login,
    checkRefreshToken,
    basic,
    getMe,
    getAll,
    getDetail,
    create,
    remove,
    update,
} = require('./controller');
const allowRoles = require('../../middlewares/checkRole');

router.route('/login') // Đối tượng cần kiểm tra là tài khoản và mật khẩu gửi lên
    .post(
        validateSchema(loginSchema),
        passport.authenticate('local', { session: false }),
        login,
    )

router.route('/refresh-token')
    .post(checkRefreshToken)

router.route('/basic')
    .get(passport.authenticate('basic', { session: false }), basic)

router.route('/profile') // Đối tượng cần kiểm tra là token có hợp lệ hay không
    .get(passport.authenticate('jwt', { session: false }), getMe)

router.route('/')
    .get(
        passport.authenticate('jwt', { session: false }),
        allowRoles('GET_ALL_EMPLOYEE'),
        getAll,
    )
    .post(passport.authenticate('jwt', { session: false }),
        allowRoles('CREATE_EMPLOYEE'),
        validateSchema(createSchema),
        create
    )


router.route('/:id')
    .get(
        passport.authenticate('jwt', { session: false }),
        validateSchema(getDetailSchema),
        allowRoles('GET_DETAIL_EMPLOYEE'),
        getDetail)

.patch(
    passport.authenticate('jwt', { session: false }),
    allowRoles('UPDATE_EMPLOYEE'),
    validateSchema(editSchema),
    update)

.delete(
    passport.authenticate('jwt', { session: false }),
    allowRoles('DELETE_EMPLOYEE'),
    validateSchema(getDetailSchema),
    remove)

module.exports = router;