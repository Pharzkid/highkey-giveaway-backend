// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🌱 Connected to MongoDB for seeding");

    await User.deleteMany();

    const hashedPassword = await bcrypt.hash("Marciem123", 10);

    const user = new User({
      fullName: "Marcie Morin",
      email: "Marciem1966@gmail.com",
      phone: "+1 407 912 67916",
      password: hashedPassword,
      balance: 10600,
      transactions: [
        {
          amount: 600,
          narration: "Refunded Registration",
          date: new Date(),
          from: "HighKey",
        },
        {
          amount: 5000,
          narration: "Bonus Credit",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          from: "HighKey",
        },
        {
          amount: 5000,
          narration: "Giveaway",
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          from: "HighKey",
        },
      ],
    });

    await user.save();
    console.log("✅ User seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding user:", err);
    mongoose.connection.close();
  }
};

seedUser();
