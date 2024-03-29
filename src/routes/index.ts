import express from "express";
import messageController from  "../controllers/message"

const router = express.Router();

router.post("/webhook", messageController.incomingMsgController);


export default router;
