const Order = require("./order.model");

// Helper: Normalize payment method
const normalizePaymentMethod = (method) => {
  if (method === 'Online') return 'online';
  if (method === 'Cash on Delivery') return 'cashOnDelivery';
  return null;
};

// ✅ Create a new order
const createAOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      phone,
      productIds,
      totalPrice,
      paymentMethod,
    } = req.body;

    const normalizedMethod = normalizePaymentMethod(paymentMethod);
    const validMethods = ['online', 'cashOnDelivery'];

    if (!validMethods.includes(normalizedMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    const newOrder = new Order({
      name,
      email,
      address,
      phone,
      productIds,
      totalPrice,
      paymentMethod: normalizedMethod,
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// ✅ Get orders by user email
const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// ✅ Delete an order (admin only)
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
