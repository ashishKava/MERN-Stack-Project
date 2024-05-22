import mongoose from "mongoose";
import { MONGO_URI } from "../src/config/index";

const connectDB = async (): Promise<void> => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
