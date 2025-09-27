const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();
const orderController = new OrderController();

// Rotas para gerenciamento de pedidos
router.post('/', orderController.createOrder.bind(orderController));
router.get('/:id', orderController.getOrder.bind(orderController));
router.put('/:id/status', orderController.updateOrderStatus.bind(orderController));
router.get('/', orderController.getAllOrders.bind(orderController));

module.exports = router;