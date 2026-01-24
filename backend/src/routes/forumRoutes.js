import express from "express";
import { getThreads, createThread, getThreadById, addReply } from "../controllers/forumController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(getThreads)
    .post(protect, createThread);

router.route("/:id")
    .get(getThreadById);

router.route("/:id/reply")
    .post(protect, addReply);

export default router;
