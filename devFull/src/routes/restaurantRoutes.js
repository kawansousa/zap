const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');

const restaurantController = new RestaurantController();

// Rotas para gerenciamento de restaurantes
router.post('/', restaurantController.createRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;