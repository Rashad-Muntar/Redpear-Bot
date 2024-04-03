import Policy from "../models/policySchema";
import { messages } from "../data/message";

import { CustomTemplateProps, TemplateProps } from "../types";


interface PolicyDetail {
    full_name?: string;
    email?: string;
    brand?: string;
    model?: string;
    year?: string;
    extraCover?: string;
    premium?: string;
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

    return customTemplate;
};

export const generateMsg = (message: any, messageItem: string, variables?: string[]) => {
    console.log(messageItem);
    let formattedMessage = messageItem;
    
    if (variables) {
        variables.forEach((value, index) => {
            const placeholder = `{{${index + 1}}}`;
            formattedMessage = formattedMessage.replace(placeholder, value);
        });
    }

    const customMessage = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: message && message?.from,
        type: "text",
        text: {
            preview_url: false,
            body: formattedMessage
        }
    };
    return customMessage;
};


export const messageEngine = (message:any) => {
    let messageSent = '';
    const policyDetail: PolicyDetail = {};
    let data
   
    switch (messageSent) {
        case '':
            if (message.text.body === "Hi") {
                data = generateMsg(message, messages.welcome.text);
                messageSent = messages.welcome.name;
            }
            break;
        case messages.welcome.name:
            data = generateMsg(message, messages.email.text);
            messageSent = messages.email.name;
            policyDetail.full_name = message?.text?.body;
            break;
        case messages.email.name:
            data = generateMsg(message, messages.brand.text);
            messageSent = messages.brand.name;
            policyDetail.email = message?.text?.body;
            break;
        case messages.brand.name:
            data = generateMsg(message, messages.model.text);
            messageSent = messages.model.name;
            policyDetail.brand = message?.text?.body;
            break;
        case messages.model.name:
            data = generateMsg(message, messages.year.text);
            messageSent = messages.year.name;
            policyDetail.model = message?.text?.body;
            break;
        case messages.year.name:
            data = generateMsg(message, messages.extraCover.text);
            messageSent = messages.extraCover.name;
            policyDetail.year = message?.text?.body;
            break;
        case messages.extraCover.name:
            data = generateMsg(message, messages.picture.text);
            messageSent = messages.picture.name;
            policyDetail.extraCover = message?.text?.body;
            break;
        case messages.picture.name:
            const variables = ['150', 'google.com'];
            data = generateMsg(message, messages.premium.text, variables);
            messageSent = messages.premium.name;
            policyDetail.premium = message?.text?.body;
            break;
        case messages.premium.name:
            const summaryVariables = ['Rashad', '1st March 2024', '1st March 2024', '001'];
            data = generateMsg(message, messages.summary.text, summaryVariables);
            messageSent = messages.summary.name;
            break;
        default:
            console.log("Done");
            break;
    }
    return data
}


