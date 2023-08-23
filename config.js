import mongoose from "mongoose";
export const connectDB = async (connectionUrl) => {
    try {
        await mongoose.connect(connectionUrl);
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Error connecting to database:', error);
    }
};
