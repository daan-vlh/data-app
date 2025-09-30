import { Router } from "express";

const router = Router();

// Home route
router.get("/", (req, res) => {
  res.send("Hello World!");
});

export default router;
