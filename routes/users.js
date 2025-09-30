import express from "express";
import User from "../models/User.js";
const router = express.Router();

// GET: Retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

// POST: Add a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User added successfully!",
      userData: savedUser,
    });
  } catch (err) {
    res.status(400).json({ error: "Failed to add user" });
  }
});

// PUT: Update an existing user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.json({
        message: "User updated successfully!",
        userData: updatedUser,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update user" });
  }
});

// DELETE: Remove a user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: "User deleted successfully!" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to delete user" });
  }
});

export default router;
