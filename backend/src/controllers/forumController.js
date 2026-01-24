import Thread from "../models/Thread.js";

// @desc    Get all threads
// @route   GET /api/forum
// @access  Public
export const getThreads = async (req, res) => {
    try {
        const threads = await Thread.find()
            .populate("author", "name avatar")
            .sort({ createdAt: -1 });
        res.json(threads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single thread
// @route   GET /api/forum/:id
// @access  Public
export const getThreadById = async (req, res) => {
    try {
        const thread = await Thread.findById(req.params.id)
            .populate("author", "name avatar")
            .populate("replies.author", "name avatar");

        if (thread) {
            // Increment views
            thread.views += 1;
            await thread.save();
            res.json(thread);
        } else {
            res.status(404).json({ message: "Thread not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a thread
// @route   POST /api/forum
// @access  Private
export const createThread = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
    }

    try {
        const thread = new Thread({
            title,
            content,
            author: req.user._id,
        });

        const createdThread = await thread.save();

        // Populate author before returning so frontend can display it immediately
        await createdThread.populate("author", "name avatar");

        res.status(201).json(createdThread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reply to a thread
// @route   POST /api/forum/:id/reply
// @access  Private
export const addReply = async (req, res) => {
    const { text } = req.body;

    try {
        const thread = await Thread.findById(req.params.id);

        if (thread) {
            const reply = {
                text,
                author: req.user._id,
            };

            thread.replies.push(reply);
            await thread.save();

            // Re-fetch to populate the new reply's author 
            // (Optimization: can also just return the simple object if frontend handles it)
            const updatedThread = await Thread.findById(req.params.id)
                .populate("author", "name avatar")
                .populate("replies.author", "name avatar");

            res.status(201).json(updatedThread);
        } else {
            res.status(404).json({ message: "Thread not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
