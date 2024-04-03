import Policy from "../models/policySchema";
import { PolicyProps } from "../types";

type GetUserProps = Pick<PolicyProps, "id">;

export const getPoliciesService = async () => {
    try {
      const policies = await Policy.find();
      return policies;
    } catch (error: any) {
      return error.message;
    }
};

export const createPolicyService = async ({     
    full_name,
    brand,
    year,
    phone_number,
    aesthetic_cover,
    model,
    email_address,
    premium,
    policy_number
}: PolicyProps) => {
    try {
      const user = new Policy({  
        full_name,
        brand,
        phone_number,
        year,
        aesthetic_cover,
        model,
        email_address,
        premium,
        policy_number
      });
     await user.save();
      return "Registered successfully";
    } catch (e: any) {
      return e.message;
    }
  };

 export const getPolicyService = async ({ id }: GetUserProps) => {
    try {
      const policy =  await Policy.findById(id)
      if (!policy) {
        return "Policy not found";
      }
      return { policy };
    } catch (e: any) {
      return e.message;
    }
  };

  export const getPolicyByPhoneNumberService = async (number:string) => {
    try {
      const policy =  await Policy.findOne({phone_number: number})
      if (!policy) {
        return false
      }
      return true
    } catch (e: any) {
      return e.message;
    }
  };


  export const updatePolicyService = async ({     
    full_name,
    brand,
    year,
    phone_number,
    aesthetic_cover,
    model,
    email_address,
    premium,
    policy_number
}: PolicyProps) => {
    try {
      const policy = {  
        full_name,
        brand,
        year,
        phone_number,
        aesthetic_cover,
        model,
        email_address,
        premium,
        policy_number};
        console.log(phone_number)
         const data = await Policy.findOneAndUpdate({phone_number: phone_number}, policy);
         console.log("from mainfunc = ", data)
      return "updated successfully";
    } catch (e: any) {
      return e.message;
    }
  };
