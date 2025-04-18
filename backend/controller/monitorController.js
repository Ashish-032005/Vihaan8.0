// Called from extension to send current URL
import jwt from "jsonwebtoken";
import Child from "../models/child.js";

export const monitorUrl = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {  childEmail } = decoded;
    const { domain, category = "general", timeSpent = 20 } = req.body;

    const child = await parent.findOne({ email: childEmail });
    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    const existingUrl = child.monitoredUrls.find((url) => url.domain === domain);
    if (existingUrl) {
      existingUrl.timeSpent += timeSpent;
    } else {
      child.monitoredUrls.push({ domain, category, timeSpent });
    }

    await child.save();
    res.status(200).json({ message: "URL time updated successfully" });
  } catch (error) {
    console.error("Monitor URL Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Called from extension when incognito detected without permission
// import Child from "../models/child.js";

export const alertIncognito = async (req, res) => {
  const {  url } = req.body;
  const email =req.user.email

  if (!email || !url) {
    return res.status(400).json({ message: "Email and URL are required" });
  }

  try {
    const child = await Child.findOne({ email });

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const recentAlert = child.incognitoAlerts.find(alert =>
      alert.url === url && new Date(alert.timestamp) > fiveMinutesAgo
    );

    if (recentAlert) {
      return res.status(200).json({ message: "Duplicate alert skipped" });
    }

    child.incognitoAlerts.push({ url, timestamp: now });
    await child.save();

    console.log("Incognito usage alert from:", child.email, "URL:", url);
    res.status(200).json({ message: "Incognito alert stored" });

  } catch (err) {
    console.error("Error storing incognito alert:", err);
    res.status(500).json({ message: "Server error" });
  }
};

  
  