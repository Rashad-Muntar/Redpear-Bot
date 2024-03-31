import { Request, Response } from 'express'
import { getPolicyService, registerPolicyService, getPoliciesService } from '../services/policyService';

export const getPolicies = async (req: Request, res: Response) => {
    const policies = await getPoliciesService();
    res.send({ status: "OK", data: policies });
}

export const getPolicy = async (req: Request, res: Response) => {
    const {phone_number} = req.params;
    const policies = await getPolicyService({phone_number});
    res.send({ status: "OK", data: policies });
}

export const createPolicy = async (req: Request, res: Response) => {
    const { 
        full_name,
        brand,
        manufacturer,
        aesthetic_cover,
        phone_number,
        model,
        email_address,
        premium,
        policy_number } = req.body;
    const policy = await registerPolicyService({  
        full_name,
        brand,
        manufacturer,
        aesthetic_cover,
        phone_number,
        model,
        email_address,
        premium,
        policy_number })
    res.json({ data: policy});
}


