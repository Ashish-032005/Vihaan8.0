import express from "express";
import { createChild, getChildren } from "../controllers/childController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, createChild);
router.get("/all", verifyToken, getChildren);

export default router;
