const express = require("express");
const router = express.Router();

const { dbConnect, currentDB } = require("../controllers/db");

router.post("/switch-db", dbConnect);
router.get("/current-db", currentDB)

module.exports = router;
