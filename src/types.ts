export interface PolicyProps {
    id?: string
    full_name?: string,
    brand?: string,
    manufacturer?: string,
    aesthetic_cover?: boolean,
    phone_number?:string,
    model?: string,
    email_address?: string,
    premium?: number,
    policy_number?:string
  }

  export interface TemplateProps {
    name: string;
    language: {
        code: string;
    };
    variables?: any;
    buttons?: any[];
    text:string
}

export interface CustomTemplateProps {
    messaging_product: string;
    to: string;
    type: string;
    template: TemplateProps;
    
}

