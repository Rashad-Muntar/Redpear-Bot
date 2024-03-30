import { Request, Response } from 'express'
import { getPolicy, registerPolicyService, getPolicies } from '../services/policyService';

export const getAllPolicies = async (req: Request, res: Response) => {
    const policies = await getPolicies();
    res.send({ status: "OK", data: policies });
}

export const getPolicyDetail = async (req: Request, res: Response) => {
    const {phone_number} = req.params;
    const policies = await getPolicy({phone_number});
    res.send({ status: "OK", data: policies });
}


