const { Router } = require("express");
const User = require("../models/userModel");
const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body.user_data;
  // const newUser = new User({
  //   name,
  //   email,
  //   password,
  // });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already used 🤐" });
    }
    await User.create({
      name,
      email,
      password,
    });

    return res.status(200).send("Your account was Created successfully 🥳");
  } catch (err) {
    res.status(404);
    throw new Error("A problem accured while creating your account 🤐");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      const { password, createdAt, updatedAt, ...resUser } = user._doc;
      res.status(200).json(resUser);
    } else {
      return res
        .status(400)
        .json({ message: "Incorrect email or password 😞" });
    }
  } catch (err) {
    res.status(404);
    throw new Error("A problem accured while logging you in 🤕");
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json(users);
  } catch (err) {
    res.status(404);
    throw new Error("A problem accured while logging you in 🤕");
  }
});

router.post("/delete-user", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    user.isActive = false;
    await user.save();
    res.status(200).json({ message: "Account desactiveted tomporarely" });
  } catch (err) {
    res.status(404);
    throw new Error("A problem accured while deleting the customer account 🤕");
  }
});

module.exports = router;
