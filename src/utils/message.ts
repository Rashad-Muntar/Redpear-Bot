import Policy from "../models/policySchema";
import { messages } from "../data/message";
import { getPolicyByPhoneNumberService } from "../services/policyService"
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

type GetTemplateProps = Pick<TemplateProps,  "buttons" | "text">;

export const createTemplate = (message:any, templateName:string, options: GetTemplateProps) => {
    const { buttons, text } = options;

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


export const checkExist = async (number: string) => {
    const userExist  = await getPolicyByPhoneNumberService(number)
    return userExist
}


