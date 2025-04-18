// Called from extension to send current URL
import jwt from "jsonwebtoken";
import Child from "../models/child.model.js";

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
export const alertIncognito = async (req, res) => {
    const { url } = req.body;
  
    // Optional: avoid duplicates by checking last entry or timestamp logic
    req.child.incognitoAlerts.push({
      url,
      timestamp: new Date()
    });
  
    await req.child.save();
  
    console.log("Incognito usage alert from:", req.child.name, "URL:", url);
  
    res.status(200).json({ message: "Incognito alert stored" });
  };
  
  