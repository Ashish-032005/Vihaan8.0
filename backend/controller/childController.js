import Child from "../models/child.js";
import { v4 as uuidv4 } from "uuid";
import Parent from '../models/parent.js'; 
// import Child from '../models/Child.js';

// Create a new child for the parent
 const createChild = async (req, res) => {
  const { name, email, age } = req.body;

  try {
    // Find the parent by ID (assuming parent ID is available in the `req.parent` from middleware)
    const parent = await Parent.findById(req.parent._id);
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    // Create a new child instance
    const newChild = new Child({
      name,
      email,
      age,
      parent: parent._id, // link the child to the parent
    });

    // Save the new child to the database
    await newChild.save();

    // Add this new child to the parent's children list
    parent.children.push(newChild._id);
    await parent.save();

    res.status(201).json({
      message: "Child created successfully",
      child: newChild,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all children for logged-in parent
export const getChildren = async (req, res) => {
  try {
    const children = await Child.find({ parent: req.user.id });
    res.status(200).json(children);
  } catch (err) {
    res.status(500).json({ message: "Error fetching children", error: err.message });
  }
};
