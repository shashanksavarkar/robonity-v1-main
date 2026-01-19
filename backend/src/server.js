import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import connectDB from "./config/db.js";
import "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import roboshareRoutes from './routes/roboshareRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import statRoutes from './routes/statRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", registrationRoutes);
app.use('/api/roboshare', roboshareRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/about', aboutRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
