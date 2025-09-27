class RestaurantController {
    constructor(restaurantModel) {
        this.restaurantModel = restaurantModel;
    }

    async createRestaurant(req, res) {
        try {
            const restaurantData = req.body;
            const newRestaurant = await this.restaurantModel.create(restaurantData);
            res.status(201).json(newRestaurant);
        } catch (error) {
            res.status(500).json({ message: 'Error creating restaurant', error });
        }
    }

    async getAllRestaurants(req, res) {
        try {
            const restaurants = await this.restaurantModel.findAll();
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching restaurants', error });
        }
    }

    async getRestaurantById(req, res) {
        try {
            const { id } = req.params;
            const restaurant = await this.restaurantModel.findByPk(id);
            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            res.status(200).json(restaurant);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching restaurant', error });
        }
    }

    async updateRestaurant(req, res) {
        try {
            const { id } = req.params;
            const restaurantData = req.body;
            const [updated] = await this.restaurantModel.update(restaurantData, {
                where: { id }
            });
            if (!updated) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            const updatedRestaurant = await this.restaurantModel.findByPk(id);
            res.status(200).json(updatedRestaurant);
        } catch (error) {
            res.status(500).json({ message: 'Error updating restaurant', error });
        }
    }

    async deleteRestaurant(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.restaurantModel.destroy({
                where: { id }
            });
            if (!deleted) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting restaurant', error });
        }
    }
}
module.exports = RestaurantController;