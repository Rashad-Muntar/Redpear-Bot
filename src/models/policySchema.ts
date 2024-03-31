import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    full_name: {
        type: String,
    },
    phone_number:{
        type: String,
    },
    brand: {
        type: String,
    },
    manufacturer:{
        type: String,
    },
    model:{
        type: String,
    },
    aesthetic_cover:{
        type: Boolean,
    },
    email_address:{
        type: String,
    },
    description: {
        type: String,
      
    },
    premium: {
        type: Number,
    },
    policy_number:{
        type: String
    }
},{timestamps: true})

const Policy = mongoose.model('Policy', policySchema);

export default Policy;