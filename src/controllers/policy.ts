import { Request, Response } from 'express'
import { getPolicyService, createPolicyService, getPoliciesService } from '../services/policyService';

export const getPolicies = async (req: Request, res: Response) => {
    const policies = await getPoliciesService();
    res.send({ status: "OK", data: policies });
}

export const getPolicy = async (req: Request, res: Response) => {
    const {id} = req.body;
    const policy = await getPolicyService({id});
    res.json({ data: policy});
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
    const policy = await createPolicyService({  
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


