var express = require('express');
var router = express.Router();

var orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/createOrder', orderController.createOrder);

// Route to  get my orders
router.get('/my-orders/:id', orderController.myOrders);

router.get('/recived-orders/:id', orderController.recivedOrders);


module.exports = router;
