const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    next();
    //console.log(req.headers.authtoken)
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
    console.log(err);
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};

exports.sellerCheck = async (req, res, next) => {
  const { email } = req.user;

  const sellerUser = await User.findOne({ email }).exec();

  if (sellerUser.role !== "seller") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};

