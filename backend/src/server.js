import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import morgan from "morgan";
import connectDB from "./config/db.js";
import "./config/passport.js";
import { securityMiddleware } from "./middlewares/security.js";
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
import forumRoutes from './routes/forumRoutes.js';
import { errorHandler } from "./middlewares/errorMiddleware.js";
import logger from "./config/logger.js";

dotenv.config();
connectDB();

const app = express();

// Security Middleware (Helmet + Rate Limit)
app.use(securityMiddleware);

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://robonity-v1-main.vercel.app/"],
    credentials: true
}));
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
app.use('/api/forum', forumRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        logger.error(`\nError: Port ${PORT} is already in use.`);
        logger.error(`To fix, run: kill -9 $(lsof -t -i:${PORT})\n`);
        process.exit(1);
    } else {
        throw error;
    }
});
