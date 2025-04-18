import express from "express";
import { monitorUrl, alertIncognito } from "../controller/monitorController.js";
import { verifyExtension } from "../middleware/extensionAuth.js";

const router = express.Router();

router.post("/check-url", verifyExtension, monitorUrl);
router.post("/incognito-alert", verifyExtension, alertIncognito);

export default router;
