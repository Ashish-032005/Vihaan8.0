import Parent from "../models/parent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Register
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Parent.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const parent = await Parent.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Parent registered successfully", parentId: parent._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const parent = await Parent.findOne({ email });
    if (!parent) return res.status(404).json({ message: "User not found" });

    const validPass = await bcrypt.compare(password, parent.password);
    if (!validPass) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: parent._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, parentId: parent._id, name: parent.name });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
