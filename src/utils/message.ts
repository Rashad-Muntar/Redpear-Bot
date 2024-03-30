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

export const handleTemplate = (message:any, template:string) => {
    let update = {};
    switch (template) {
        case 'picture_request':
            console.log("Sending picture request template");
            break;
        case 'model_request':
            policyDetail.model = message?.text?.body
            break;
        case 'maker_request':
            policyDetail.manufacturer = message?.text?.body
            break;
        case 'aesthetic_cover_request':
            policyDetail.aesthetic_cover = message?.text?.body === "1" ? true : false
            break;
        case 'brand_request':
            policyDetail.brand = message?.text?.body
            break;
        case 'address_request':
            policyDetail.address = message?.text?.body
            break;
        case 'name_request':
            policyDetail.name = message?.text?.body
            break;
        default:
            console.log("Unknown template");
            break;
    }
    return policyDetail
};