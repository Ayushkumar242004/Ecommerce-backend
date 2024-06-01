const Address = require("../models/address.model");
const cartService = require("../services/cart.service");
const Order = require('../models/order.model');
const OrderItem=require('../models/orderItems')
async function createOrder(user, shipAddress) {
  let address;

  if (shipAddress._id) {
    let existAddress = await Address.findById(shipAddress._id);
    address = existAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();

    user.address.push(address); // Corrected typo
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = []; // Changed the variable name to avoid conflict

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem); // Pushing created order item to the array
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shipAddress: address,
  });

  const savedOrder = await createdOrder.save();
  return savedOrder;
}


async function placeOrder(orderid) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.status = "COMPLETED";

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function delieverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIEVERED";

  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" }})
      .lean();

    return orders;
  } catch {
    throw new Error(error.message);
  }
}

async function getAllOrders(orderId) {
  return await Order.find()

    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}


module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  delieverOrder,
  cancelOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
