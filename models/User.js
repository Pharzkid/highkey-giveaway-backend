// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  balance: { type: Number, default: 10600 },
  transactions: [
    {
      amount: Number,
      narration: String,
      date: Date,
      from: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
export default User;
