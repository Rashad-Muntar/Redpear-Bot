import { Request, Response } from 'express'
import { messageService } from '../services/messageService';

const {GRAPH_API_TOKEN} = process.env;

export const incomingMsgController = async (req: Request, res: Response) => {
  const business_phone_number_id = req.body.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;
  const message = req?.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  await messageService(message, business_phone_number_id)
  res.sendStatus(200);
}


export const verifyTokenController = async(req: Request, res: Response) => {
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

