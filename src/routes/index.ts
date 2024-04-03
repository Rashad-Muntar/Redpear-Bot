import express from "express";
import {incomingMsgController, verifyTokenController} from "../controllers/message"
import { getPolicy, getPolicies, createPolicy } from "../controllers/policy";


const router = express.Router();

router.post("/webhook", incomingMsgController);
router.get("/webhook", verifyTokenController);
router.get("/policy", getPolicy);
router.get("/policies", getPolicies);
router.post("/newPolicy", createPolicy)


export default router;
