const router = require('express').Router();

router.use('/orders', require('./order/orderRoutes'));

module.exports = router;
