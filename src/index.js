import "dotenv/config";
import express from "express";
import connectDB from "./db/db.js"

const app = express();
 
// ;(async() => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URL}`)       
//        app.on("error", (error) => {
//         console.log("ERR",error);
//        })
//        app.listen(process.env.PORT,() => {console.log(`The app is running on port ${process.env.PORT}`)})
//     } catch (error) {
//         console.error("ERROR",error)        
//     }
// })()

connectDB();

