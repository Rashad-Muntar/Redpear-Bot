import Policy from "../models/policySchema";
import { CustomTemplateProps, TemplateProps } from "../types";
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



// const createCustomTemplate = async (message:any, currentState:string) => {
//     try {
//         let customTemplate;

//         switch (currentState) {
//             case "name_request":
//                 // Customize template for name request
//                 customTemplate = createNameRequestTemplate(message);
//                 break;
//             case "address_request":
//                 // Customize template for address request
//                 customTemplate = createAddressRequestTemplate(message);
//                 break;
//             case "brand_request":
//                 // Customize template for brand request
//                 customTemplate = createBrandRequestTemplate(message);
//                 break;
//             // Add cases for other template types as needed

//             default:
//                 // Handle default case or unrecognized template names
//                 console.error("Unrecognized template name:", currentState);
//                 customTemplate = null;
//                 break;
//         }

//         return customTemplate;
//     } catch (error:any) {
//         return error.message;
//     }
// };
type GetTemplateProps = Pick<TemplateProps,  "buttons" | "text">;

export const createTemplate = (message:any, templateName:string, options: GetTemplateProps) => {
    const { buttons, text } = options;

    // Customize template structure
    const customTemplate: CustomTemplateProps = {
        messaging_product: 'whatsapp',
        to: message?.from,
        type: 'template',
        template: {
            name: templateName,
            language: {
                code: 'en'
            },
            text: text
            // Add other common fields as needed
        }
    };

    // // Add variables to template if provided
    // if (variables) {
    //     customTemplate.template.variables = variables;
    // }

    // // Add buttons to template if provided
    // if (buttons) {
    //     customTemplate.template.buttons = buttons;
    // }

    return customTemplate;
};


