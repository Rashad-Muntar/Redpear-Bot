import { Request, Response } from 'express'
import policyService from '../services/policyService';

const getUsers = async (req: Request, res: Response) => {
    const policies = await policyService.getPolicies();
    res.send({ status: "OK", data: policies });
}