import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
    name: {
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
    mode:{
        type: String,
    },
    aesthetic_cover:{
        type: Boolean,
    },
    address:{
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
})

const Policy = mongoose.model('Policy', policySchema);

export default Policy;