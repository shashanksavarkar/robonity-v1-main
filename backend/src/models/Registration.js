import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
  eventId: String,
  teamName: String,
  captainName: String,
  email: String,
  contact: String,
  members: [String],
  paymentScreenshot: String
}, { timestamps: true });

export default mongoose.model("Registration", registrationSchema);
