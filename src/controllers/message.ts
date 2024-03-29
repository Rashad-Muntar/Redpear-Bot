import { Request, Response } from 'express'
import axios from 'axios';

const {GRAPH_API_TOKEN, PHONE_NUMBER} = process.env;

const  incomingMsgController = async (req: Request, res: Response) => {
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
    // console.log(GRAPH_API_TOKEN, PHONE_NUMBER)
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
    if (message?.type === "text") {
      const business_phone_number_id = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          text: { body: "Echo: " + message.text.body },
          context: {
            message_id: message.id,
          },
        },
      });

      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id,
        },
      });
    }
  
    res.sendStatus(200);
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