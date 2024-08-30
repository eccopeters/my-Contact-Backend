import mongoose from "mongoose"
import asyncHanler from "express-async-handler"

const connectDB = async (url)=>{
    try {
        await mongoose.connect(url)
        console.log("Database Connected Successfully")
        
    } catch (error) {
        console.log(error)
    }

}
export default connectDB