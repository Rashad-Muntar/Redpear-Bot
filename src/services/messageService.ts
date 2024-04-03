import { messages } from "../data/message";
import { generateMsg } from "../utils/message";
import { createPolicyService, updatePolicyService } from "./policyService";
import { checkExist } from "../utils/message";
import axios from "axios";

const processedMessages = new Set<string>();
let isUserChecked: boolean
let messageSent:string;
let data:any;
let userNumber:string
let newValue:number;
let variables:any
const initialPremium = 100

let policyDetail: { 
    full_name: string
    phone_number: string
    email: string
    brand: string
    model: string
    year: string
    extraCover: boolean
    picture: string
    premium: number
    policy_number: string
} = { 
    full_name: '', 
    email: '',
    brand: '',
    model: '',
    phone_number: '',
    year: '',
    extraCover: false,
    picture: '',
    premium: 0,
    policy_number:''

};

const {BEARER_TOKEN} = process.env;

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
        console.log(isUserChecked)
        if(!isUserChecked){
            const userExist  = await checkExist(message?.from)
            console.log(userExist)
            if(!userExist){
              const policy = await createPolicyService({phone_number: message?.from})
              console.log(policy)
            }
            isUserChecked = true
        }

     
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
            messageSent = messages.brand.name;
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
            let valueToSave: boolean
            const value = message?.text?.body.trim();
            if(value === "1" || value === "Yes" || value === "yes"){
                newValue = initialPremium+50
                variables = [newValue, 'https://paystack.com/pay/264ja7n01r'];
                valueToSave=true
            }else{
                variables = [initialPremium, 'google.com'];
                valueToSave=false
            }
            data = generateMsg(message, messages.picture.text);
            messageSent = messages.picture.name;
            policyDetail.extraCover = valueToSave
            
        } else if (messageSent === messages.picture.name) {
            data = generateMsg(message, messages.premium.text, variables);
            messageSent = messages.premium.name;
            policyDetail.premium = newValue
        }else if (messageSent === messages.premium.name) {
            const variables = ['Rashad', '1st March 2024', '1st March 2024', '001'];
            data = generateMsg(message, messages.summary.text, variables);
            messageSent = messages.summary.name;
        }else {
            const data = await updatePolicyService({
                full_name: policyDetail.full_name,
                phone_number: message?.from,
                brand: policyDetail.brand,
                year: policyDetail.year,
                model: policyDetail.model,
                aesthetic_cover: policyDetail.extraCover,
                email_address: policyDetail.email,
                premium: policyDetail.premium,
                policy_number: policyDetail.policy_number
            })
            console.log("From Service  == ", data)
        }
       
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