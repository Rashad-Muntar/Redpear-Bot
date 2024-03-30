import Policy from "../models/policySchema";

let policyDetail = {
    name: "",
    brand:"",
    manufacturer: "",
    aesthetic_cover: false,
    model:"",
    address: "",
    premium: 0,
    policy_number: ""
} 

export const handleTemplate = async (message:any, template:string, phone_number: string) => {
    try {
        let update: any = {};

        switch (template) {
            case 'model_request':
                update.model = message?.text?.body;
                break;
            case 'maker_request':
                update.manufacturer = message?.text?.body;
                break;
            case 'aesthetic_cover_request':
                update.aesthetic_cover = message?.text?.body === "1" ? true : false;
                break;
            case 'brand_request':
                update.brand = message?.text?.body;
                break;
            case 'address_request':
                update.address = message?.text?.body;
                break;
            case 'name_request':
                update.name = message?.text?.body;
                break;
            default:
                console.log("Unknown template");
                break;
        }
// console.log(phone_number)
        // Update the document in the database
        // await Policy.findOneAndUpdate({phone_number: phone_number}, update);
        // await Policy.findOneAndUpdate({ phone_number: message?.from }, update, { new: true, upsert: true, maxTimeMS: 30000 });

    } catch (error) {
        console.error('Error updating policy:', error);
        throw error; // Propagate the error to the caller
    }
};