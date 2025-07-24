const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

// ✅ Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, "Ali@321");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

// ✅ Get current logged-in user (/me)
userRouter.get("/me", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).send("User not found");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// ✅ Get all users (for admin)
userRouter.get("/getAllUsers", async (req, res) => {
  const users = await User.find().select("-password");
  res.send(users);
});

// ✅ Get single user by ID
userRouter.get("/getUser/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

// ✅ Add user manually
userRouter.post("/addUser", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newUser = new User({ firstName, lastName, email, password });
  await newUser.save();
  res.send("User added manually");
});

// ✅ Edit user
userRouter.patch("/editUser/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(updatedUser);
});

// ✅ Delete user
userRouter.delete("/deleteUser/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});

module.exports = { userRouter };
