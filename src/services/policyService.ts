import Policy from "../models/policySchema";

const getPolicies = async () => {
    try {
      const policies = await Policy.find();
      return policies;
    } catch (error: any) {
      return error.message;
    }
};

export default {getPolicies}