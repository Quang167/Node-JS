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
    getAll,
    getDetail,
    create,
    remove,
    update,
} = require('./controller');
const allowRoles = require('../../../middlewares/checkRole');

const {
    passportConfigAdmin,
    passportConfigLocalAdmin,
} = require('../../../middlewares/passportAdmin');

passport.use(passportConfigAdmin);
passport.use(passportConfigLocalAdmin);

// router.route('/login') // Đối tượng cần kiểm tra là tài khoản và mật khẩu gửi lên
//     .post(
//         validateSchema(loginSchema),
//         passport.authenticate('localAdmin', { session: false }),
//         login,
//     )

// router.route('/refresh-token')
//     .post(checkRefreshToken)

router.route('/')
    .get(
        // passport.authenticate('jwtAdmin', { session: false }),
        // allowRoles('GET_ALL_EMPLOYEE'),
        getAll,
    )
    .post(
        validateSchema(createSchema),
        passport.authenticate('jwtAdmin', { session: false }),
        create)

router.route('/:id')
    .get(validateSchema(getDetailSchema), getDetail)
    .patch(
        validateSchema(editSchema),
        passport.authenticate('jwtAdmin', { session: false }),
        update)
    .delete(
        passport.authenticate('jwtAdmin', { session: false }), // CHECK TOKEN IS VALID
        validateSchema(getDetailSchema), // CHECK PARAMS
        remove, // HANDLE DELETE
    )

module.exports = router;