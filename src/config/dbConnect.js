import mongoose from "mongoose";
let isConnected = false;
import dotenv from "dotenv";
dotenv.config();

export const connectToDB = async () => {
    if (isConnected) {
        console.log("Already connected to the database");
        return;
    }
    try {
        const db = await mongoose.connect("mongodb+srv://ajalaDamilola:2001@cluster0.6oadddu.mongodb.net/dev", {
            serverSelectionTimeoutMS: 10000,
            heartbeatFrequencyMS: 5000,
            connectTimeoutMS: 15000
        })
        isConnected = db.connections[0].readyState;
        console.log("Connected to the database successfully");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
}