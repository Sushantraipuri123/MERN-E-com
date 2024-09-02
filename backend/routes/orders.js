var express = require('express');
var router = express.Router();

var orderController = require('../controllers/orderController');

// Route to create a new order
router.post('/createOrder', orderController.createOrder);

// Route to  get my orders
router.get('/my-orders/:id', orderController.myOrders);

router.get('/recived-orders/:id', orderController.recivedOrders);

// Route to cancel an order
router.put('/cancel-order/:orderId', orderController.cancelOrder);

// Route to get order information by orderId
router.get('/getOrderById/:id', orderController.getOrderById);

router.put('/ship-order/:orderId', orderController.shipOrder);


module.exports = router;
