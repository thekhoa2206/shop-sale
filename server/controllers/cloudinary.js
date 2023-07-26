const cloudinary = require("cloudinary");
const { sellerCheck, adminCheck } = require("../middlewares/auth");
const User = require("../models/user");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
exports.upload = async (req, res) => {
  const { email } = req.user;
  const findUser = await User.findOne({ email }).exec();
  if (findUser.role === "admin") {
    // adminCheck(req, res, next);
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } else if (findUser.role === "seller") {
    // sellerCheck(req, res, next);
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
    });
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } else {
    res.status(403).json({
      err: "Access denied.",
    });
  }

};

exports.remove = (req, res) => {
  const { role } = req.user;
  if (role === "admin") {
    adminCheck(req, res);
    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
      if (err) return res.json({ success: false, err });
      res.send("ok");
    });
  } else if (role === "seller") {
    sellerCheck(req, res);
    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
      if (err) return res.json({ success: false, err });
      res.send("ok");
    });
  }
};
