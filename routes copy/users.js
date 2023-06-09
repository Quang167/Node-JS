var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/res', function(req, res, next) {
    res.send('this is post method');
});
router.get('/res', function(req, res, next) {
    res.send('this is second method');
});
router.get('/res', function(req, res, next) {
    res.send('this is first method');
});
router.put('/res', function(req, res, next) {
    res.send('this is put method');
});
router.delete('/res', function(req, res, next) {
    res.send('this is delete method');
});


module.exports = router;