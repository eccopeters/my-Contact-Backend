import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
       type: String,
       required: [true, "Please enter a valid email"],
       unique: [true, "User with email already exists"] 
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    }

}, {
    timestamps: true,
}
)

export default mongoose.model("User", UserSchema)