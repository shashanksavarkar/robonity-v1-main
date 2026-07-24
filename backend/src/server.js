import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { securityMiddleware } from "./middlewares/security.js";
import authRoutes from "./routes/authRoutes.js";
import roboshareRoutes from './routes/roboshareRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import { errorHandler } from "./middlewares/errorMiddleware.js";
import logger from "./config/logger.js";

dotenv.config();
connectDB();

const app = express();

// Trust the proxy (Render/Vercel) to enable HTTPS in callbacks
app.set("trust proxy", 1);

// Default Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Security Middleware (Helmet + Rate Limit)
app.use(securityMiddleware);

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000", "https://robonity-v1-main.vercel.app", "https://robonity-v1-main.vercel.app/"],
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/roboshare', roboshareRoutes);
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
