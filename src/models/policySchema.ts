import mongoose from "mongoose";
const policySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true,
    },
    premium: {
        type: String,
    },
    Benefit: {
        type: String,
    },
    sold:{
        type: Boolean,
    }
})

const Policy = mongoose.model('Polcy', policySchema);

export default Policy;