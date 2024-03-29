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
    getMe,
    getAll,
    getDetail,
    create,
    // remove,
    update,
} = require('./controller');
// const allowRoles = require('../../../middlewares/checkRole');



router.route('/login') // Đối tượng cần kiểm tra là tài khoản và mật khẩu gửi lên
    .post(
        validateSchema(loginSchema),
        // passport.authenticate('localUser', { session: false }),
        login,
    )

router.route('/refresh-token').post(checkRefreshToken)

router.route('/profile') // Đối tượng cần kiểm tra là token có hợp lệ hay không
    .get(passport.authenticate('jwtUser', { session: false }), getMe)

// router.route('/changepass').get(passport.authenticate('jwtUser', { session: false }), changePass)


router.route('/')
    .get(
        getAll,
    )

router.route('/')
    // .get(
    //     // passport.authenticate('jwtUser', { session: false }),
    //     // allowRoles('GET_ALL_CUSTOMER'),
    //     getAll,
    // )
    .post(validateSchema(createSchema), create)

router.route('/')


router.route('/:id')
    .get(validateSchema(getDetailSchema),
        // passport.authenticate('jwtUser', { session: false }), 
        getDetail)
    .patch(validateSchema(editSchema), passport.authenticate('jwtUser', { session: false }), update)
    // .delete(
    //     passport.authenticate('jwtUser', { session: false }), // CHECK TOKEN IS VALID
    //     allowRoles('DELETE_CUSTOMER'), // CHECK USER HAS ROLE
    //     validateSchema(getDetailSchema), // CHECK PARAMS
    //     remove, // HANDLE DELETE
    // )

module.exports = router;