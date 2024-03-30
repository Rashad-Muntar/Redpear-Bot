import Policy from "../models/policySchema";
import { PolicyProps } from "../types";

type GetUserProps = Pick<PolicyProps, "phone_number">;

export const getPolicies = async () => {
    try {
      const policies = await Policy.find();
      return policies;
    } catch (error: any) {
      return error.message;
    }
};

export const registerPolicyService = async ({     
    name,
    brand,
    manufacturer,
    phone_number,
    aesthetic_cover,
    model,
    address,
    premium,
    policy_number
}: PolicyProps) => {
    try {
      const user = new Policy({  
        name,
        brand,
        phone_number,
        manufacturer,
        aesthetic_cover,
        model,
        address,
        premium,
        policy_number});
      user.save();
      return "Registered successfully";
    } catch (e: any) {
      return e.message;
    }
  };

 export const getPolicy = async ({ phone_number }: GetUserProps) => {
    try {
      const policy = await Policy.findOne({ phone_number: phone_number});
      if (!policy) {
        return "Policy not found";
      }
      return { policy };
    } catch (e: any) {
      return e.message;
    }
  };

