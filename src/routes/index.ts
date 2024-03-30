import express from "express";
import messageController from  "../controllers/message"
import { getPolicyDetail, getAllPolicies } from "../controllers/policy";


const router = express.Router();

router.post("/webhook", messageController.incomingMsgController);
router.get("/webhook", messageController.verifyTokenController);
router.get("/policy/phone_number", getPolicyDetail);
router.get("/policies", getAllPolicies);


export default router;
