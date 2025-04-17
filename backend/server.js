import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import childRoutes from "./routes/child.js";
import monitorRoutes from './routes/monitorRoutes.js';
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/api/auth", authRoutes);
import mongoose from "mongoose";

 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
connectDB();


app.use('/api/monitor', monitorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/child", childRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
