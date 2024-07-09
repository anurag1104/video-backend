import "dotenv/config";
import connectDB from "./db/db.js"
import { app } from "./app.js";

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
const port = process.env.PORT || 3000;
connectDB()
.then( () => {
    app.listen(port, () => {
        console.log(`Server is running on port :${port}`)
    })
})
.catch( (error) => {
    console.log("Monog DB connection error",error)
})
