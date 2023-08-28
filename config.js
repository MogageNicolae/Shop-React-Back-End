import mongoose from "mongoose";
/**
 * Connect to the MongoDB database
 * @param connectionUrl : string - The connection url.
 */
export const connectDB = async (connectionUrl) => {
    try {
        await mongoose.connect(connectionUrl);
        console.log('Connected to database');
    }
    catch (error) {
        console.error('Error connecting to database:', error);
    }
};
