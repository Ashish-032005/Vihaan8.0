import Child from "../models/child.js";

export const verifyExtension = async (req, res, next) => {
  const token = req.headers["x-extension-token"];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const child = await Child.findOne({ extensionToken: token });
    if (!child) return res.status(403).json({ message: "Invalid token" });

    req.child = child;
    next();
  } catch (err) {
    res.status(500).json({ message: "Auth error", error: err.message });
  }
};
