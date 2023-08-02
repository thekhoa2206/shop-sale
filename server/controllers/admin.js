const Order = require("../models/order");
const User = require("../models/user");
const admin = require("../firebase");

//orders, orderStatus

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};

exports.getUsers = async (req, res) => {
  let allUsers = await User.find({})
    .sort("-createdAt")
    .exec();
  res.json(allUsers);
};

exports.userRole = async (req, res) => {
  const { userId, role } = req.body;

  let updated = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true }
  ).exec();

  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  const userRecord = await admin.auth().getUserByEmail(user.email);
  const uid = userRecord.uid;
  try {
    await admin.auth().deleteUser(uid);
    await User.findByIdAndDelete(userId);
    console.log(`Successfully deleted user with UID: ${uid}`);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}