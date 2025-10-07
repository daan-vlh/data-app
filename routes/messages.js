import express from "express";
import Message from "../models/Message.js";
const router = express.Router();

// GET: Retrieve all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("sender", "username email")
      .populate("recipients", "username email");
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

// POST: Add a new message
router.post("/", async (req, res) => {
  try {
    // Assuming you get senderUser and recipientUsers from req.body or database
    const { text, senderUser, recipientUsers } = req.body;

    const newMessage = new Message({
      text,
      sender: senderUser._id,
      recipients: recipientUsers.map((user) => user._id),
    });

    await newMessage.save();
    res.status(201).json({ message: "Message created!", data: newMessage });
  } catch (err) {
    res.status(400).json({ error: "Failed to create message" });
  }
});

// PUT: Update an existing message
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMessage = await Message.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedMessage) {
      res.json({
        message: "Message updated successfully!",
        messageData: updatedMessage,
      });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to update message" });
  }
});

// DELETE: Remove a message by ID
router.delete("/", async (req, res) => {
  const { id } = req.query;
  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (deletedMessage) {
      res.json({ message: "Message deleted successfully!" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to delete message" });
  }
});

export default router;
