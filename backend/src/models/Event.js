import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  date: String, title: String, location: String, description: String, fullDetails: String
});

export default mongoose.model("Event", eventSchema);
