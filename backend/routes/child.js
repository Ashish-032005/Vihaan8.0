import express from "express";
import { createChild, getChildren } from "../controller/childController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-child", verifyToken, createChild);
router.get("/all", verifyToken, getChildren);

export default router;
