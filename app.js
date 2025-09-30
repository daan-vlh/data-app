import express from "express";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.js";
import apiRoutes from "./routes/api.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Event listeners for the connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Register route groups
app.use("/", indexRoutes);
app.use("/api", apiRoutes);
app.use("/messages", (await import("./routes/messages.js")).default);
app.use("/users", (await import("./routes/users.js")).default);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
