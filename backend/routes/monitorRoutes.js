import express from "express";
import { monitorUrl, alertIncognito } from "../controllers/monitoringController.js";
import { verifyExtension } from "../middleware/extensionAuth.js";

const router = express.Router();

router.post("/check-url", verifyExtension, monitorUrl);
router.post("/incognito-alert", verifyExtension, alertIncognito);

export default router;
