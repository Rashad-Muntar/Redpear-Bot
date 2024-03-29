import express from "express";
import messageController from  "../controllers/message"

const router = express.Router();

router.post("/webhook", messageController.incomingMsgController);
router.get("/webhook", messageController.verifyTokenController);


export default router;
