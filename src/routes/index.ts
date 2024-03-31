import express from "express";
import messageController from  "../controllers/message"
import { getPolicy, getPolicies, createPolicy } from "../controllers/policy";


const router = express.Router();

router.post("/webhook", messageController.incomingMsgController);
router.get("/webhook", messageController.verifyTokenController);
router.get("/policy/phone_number", getPolicy);
router.get("/policies", getPolicies);
router.post("/newPolicy", createPolicy)


export default router;
