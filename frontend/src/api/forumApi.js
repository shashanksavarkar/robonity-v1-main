import API from "./axios";

// Fetch all threads
export const fetchThreads = () => API.get("/forum");

// Fetch single thread by ID
export const fetchThreadById = (id) => API.get(`/forum/${id}`);

// Create a new thread
export const createThread = (threadData) => API.post("/forum", threadData);

// Post a reply to a thread
export const postReply = (id, replyData) => API.post(`/forum/${id}/reply`, replyData);
