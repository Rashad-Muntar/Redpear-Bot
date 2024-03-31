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

export const registerPolicyService = async ({     
    full_name,
    brand,
    manufacturer,
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
        manufacturer,
        aesthetic_cover,
        model,
        email_address,
        premium,
        policy_number
      });
      user.save();
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


//   export const updatePolicy = async ({     
//     name,
//     brand,
//     manufacturer,
//     aesthetic_cover,
//     model,
//     address,
//     premium,
//     policy_number
// }: PolicyProps) => {
//     try {
//       const policy = new Policy({  
//         name,
//         brand,
//         manufacturer,
//         aesthetic_cover,
//         model,
//         address,
//         premium,
//         policy_number});
//         const user = await Policy.findOneAndUpdate({phone_number, username, email});
//       return "Registered successfully";
//     } catch (e: any) {
//       return e.message;
//     }
//   };
