import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    responded: {
        type: Boolean,
    },
},{timestamps: true})

const Message = mongoose.model('Polcy', messageSchema);

export default Message;