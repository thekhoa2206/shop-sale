const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email, role } = req.user;
  console.log(req.user.role);
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture, role },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
      role
    }).save();
    console.log("USER CREATED", newUser);
    // res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    res.json(user);
  } catch (err) {
    throw new Error(err);
  }
};