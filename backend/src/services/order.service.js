const { orderModel } = require('../models/order.model');
const { eventEmitter } = require('../events/eventEmitter');

const orderService = {
  async createOrder(orderData) {
    const order = await orderModel.create(orderData);
    
    // Emit event
    eventEmitter.emit('order:created', order);
    
    return order;
  },

  async getOrderById(orderId) {
    return await orderModel.findById(orderId);
  },

  async getOrders(filters = {}) {
    const query = {};
    
    if (filters.userId) query.userId = filters.userId;
    if (filters.status) query.status = filters.status;
    if (filters.symbol) query.symbol = filters.symbol;

    return await orderModel.find(query)
      .limit(filters.limit || 50)
      .skip(filters.offset || 0)
      .sort({ createdAt: -1 });
  },

  async countOrders(filters = {}) {
    const query = {};
    
    if (filters.userId) query.userId = filters.userId;
    if (filters.status) query.status = filters.status;
    if (filters.symbol) query.symbol = filters.symbol;

    return await orderModel.countDocuments(query);
  },

  async cancelOrder(orderId) {
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status: 'cancelled', cancelledAt: new Date() },
      { new: true }
    );

    if (order) {
      eventEmitter.emit('order:cancelled', order);
    }

    return order;
  },

  async updateOrderStatus(orderId, status) {
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (order) {
      eventEmitter.emit('order:updated', order);
    }

    return order;
  },

  formatOrder(order) {
    if (!order) return null;

    return {
      id: order._id || order.id,
      userId: order.userId,
      symbol: order.symbol,
      side: order.side,
      type: order.type,
      quantity: order.quantity,
      price: order.price,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  },
};

module.exports = { orderService };
