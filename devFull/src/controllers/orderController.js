class OrderController {
  constructor(orderModel, whatsappService) {
    this.orderModel = orderModel;
    this.whatsappService = whatsappService;
  }

  async createOrder(req, res) {
    try {
      const orderData = req.body;
      const newOrder = await this.orderModel.create(orderData);
      await this.whatsappService.sendNotification(newOrder);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedOrder = await this.orderModel.updateStatus(id, status);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error updating order status", error });
    }
  }

  async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await this.orderModel.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order", error });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await this.orderModel.findAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  }
}

module.exports = OrderController;
