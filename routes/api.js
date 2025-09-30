import { Router } from "express";

const router = Router();

// Example JSON route
router.get("/info", (req, res) => {
  res.json({
    message: "This is a JSON response",
    version: "1.0.0",
    status: "ok",
  });
});

export default router;
