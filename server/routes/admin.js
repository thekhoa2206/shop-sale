const express = require("express");
const { auth } = require("../firebase");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const { orders, orderStatus, getUsers, userRole, deleteUser } = require("../controllers/admin");

// routes
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order-status", authCheck, adminCheck, orderStatus);
router.get("/admin/users", authCheck, adminCheck, getUsers)
router.post("/admin/update-user", authCheck, adminCheck, userRole);
router.delete("/admin/delete-user", authCheck, adminCheck, deleteUser);

module.exports = router;
