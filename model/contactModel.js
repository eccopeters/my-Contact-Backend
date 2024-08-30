import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Please add contact name"]
        },
        email: {
            type: String,
            required: [true, "Please add contact email"]
        },
        phone: {
            type: String,
            required: [true, "Please add contact phone"]
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model("Contact", ContactSchema)