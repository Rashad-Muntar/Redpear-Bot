import { messages } from "../data/message";
import { generateMsg } from "../utils/message";
import { getPolicyByPhoneNumberService } from "./policyService";
import axios from "axios";

const processedMessages = new Set<string>();
let messageSent:string;
let data:any;
let userNumber:string
let policyDetail: { 
    full_name: string
    email: string
    brand: string
    model: string
    year: string
    extraCover: boolean
    picture: string
    premium: number
} = { 
    full_name: '', 
    email: '',
    brand: '',
    model: '',
    year: '',
    extraCover: false,
    picture: '',
    premium: 0

};

const {GRAPH_API_TOKEN, BEARER_TOKEN} = process.env;

export const templateService = (message:any, currentState:string) => {
    try {
        const data = {
            messaging_product: 'whatsapp',
            to: message?.from,
            type: 'template',
            template: {
                name: currentState,
                language: {
                    code: 'en_US'
                }
            }
        };
      return data
    } catch (error: any) {
      return error.message;
    }
};

export const messageService = async (message:any, business_number_id:number) => {
   
    userNumber = message?.from
    try {
  
        if (processedMessages.has(message.from)) {
            return
        }

        if (message.text.body === "Hi") {
            data = generateMsg(message, messages.welcome.text);
            messageSent = messages.welcome.name;
        } else if (messageSent === messages.welcome.name) {
            const name = message?.text?.body.trim();
            const nameParts = name.split(" ");
            if (nameParts.length < 2) {
                data = generateMsg(message, messages.welcome.text);
                messageSent = messages.welcome.name;
            }else{
                data = generateMsg(message, messages.email.text);
                const name = message?.text?.body.trim();
                messageSent = messages.email.name;
                policyDetail.full_name = message?.text?.body
            }
        } else if (messageSent === messages.email.name) {
            data = generateMsg(message, messages.brand.text);
            policyDetail.email = message?.text?.body
        } else if (messageSent === messages.brand.name) {
            data = generateMsg(message, messages.model.text);
            messageSent = messages.model.name;
            policyDetail.brand = message?.text?.body
        } else if (messageSent === messages.model.name) {
            data = generateMsg(message, messages.year.text);
            messageSent = messages.year.name;
            policyDetail.model = message?.text?.body
        } else if (messageSent === messages.year.name) {
            data = generateMsg(message, messages.extraCover.text);
            messageSent = messages.extraCover.name;
            policyDetail.year = message?.text?.body
        } else if (messageSent === messages.extraCover.name) {
            data = generateMsg(message, messages.picture.text);
            messageSent = messages.picture.name;
            policyDetail.extraCover = message?.text?.body
        } else if (messageSent === messages.picture.name) {
            const variables = ['150', 'google.com'];
            data = generateMsg(message, messages.premium.text, variables);
            messageSent = messages.premium.name;
            policyDetail.premium = message?.text?.body
        }else if (messageSent === messages.premium.name) {
            const variables = ['Rashad', '1st March 2024', '1st March 2024', '001'];
            data = generateMsg(message, messages.summary.text, variables);
            messageSent = messages.summary.name;
        }else {
            console.log("Done");
        }

        console.log(policyDetail)
        const headers = {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json'
        };
  
        const response = await axios.post(`https://graph.facebook.com/v18.0/${business_number_id}/messages`, data, { headers });

        processedMessages.add(message.id);
  
        return response
    } catch (error:any) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
}