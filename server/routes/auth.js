const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck, sellerCheck } = require("../middlewares/auth");

// controller
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
router.post("/current-seller", authCheck, sellerCheck, currentUser);

module.exports = router;
