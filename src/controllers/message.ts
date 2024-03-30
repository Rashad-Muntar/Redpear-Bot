import { Request, Response } from 'express'
import templateService from  "../services/messageService"
import { registerPolicyService, getPolicy } from '../services/policyService';
import { handleTemplate } from '../utils/message';
import { templates } from '../data/message';
import axios from 'axios';

const {GRAPH_API_TOKEN, BEARER_TOKEN} = process.env;

let userExist = false
let currentStateIndex = 0; 

const  incomingMsgController = async (req: Request, res: Response) => {
const business_phone_number_id = req.body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;


try {
    const message = req?.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    // if(!userExist){
    //   const policy =  await getPolicy({phone_number: message?.from})
    //   if(policy == "Policy not found"){
    //     registerPolicyService({phone_number: message?.from})
    //     userExist = true
    //   }
    // }else{
    //   userExist = true
    // }

    if (!message) {
        console.error('No message found in request body');
        return res.sendStatus(400);
    }

    let currentState = templates[currentStateIndex]; 
    let nextStateIndex = currentStateIndex + 1;

    if (nextStateIndex >= templates.length) {
        nextStateIndex = 0;
    }

    if (currentState === "name_request") {
        const name = message?.text?.body.trim();
        const nameParts = name.split(" ");
        if (nameParts.length >= 2) {
            currentStateIndex = nextStateIndex;
        }
    } else {
        currentStateIndex = nextStateIndex;
    }

    currentState = templates[currentStateIndex];
    const dt =  handleTemplate(currentState, currentState, message?.from)
    const data = templateService.templateService(message, currentState)
    const headers = {
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json'
    };

    const response = await axios.post(`https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`, data, { headers });
    console.log('Message sent successfully:', response?.data.contacts[0].input);
    res.sendStatus(200);
} catch (error:any) {
  console.error('Error sending message:', error.response ? error.response.data : error.message);
  res.sendStatus(500);
}
}

const verifyTokenController = async(req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === GRAPH_API_TOKEN) {
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    res.sendStatus(403);
  }
}

export default {incomingMsgController, verifyTokenController}