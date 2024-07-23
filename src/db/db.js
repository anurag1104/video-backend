import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`\nMonogoDB connected !! DB host : ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("Error", error);
        process.exit(1); // for exiting a process
    }
}

export default connectDB;