export const templates = [
    "request_name",
    "address_request",
    "brand_request",
    "model_request",
    "year_request",
    "aesthetic_request",
    "picture_request",
    "premium_request", 
    "summary_request"
  ];
export let policyDetail = {
    name: "",
    brand:"",
    manufacturer: "",
    aesthetic_cover: false,
    model:"",
    address: "",
    premium: 0,
    policy_number: ""
} 


export const messages = 
  {
    welcome: {
      name:"welcome",
      text: "Hi, Welcome to *RP Phone Insure Bot*. Let's start by giving me your *Full Name*"
    },
    email: {
      name:"email",
      text: "Please enter your *email address*"
    },
    brand: {
      name:"brand",
      text: "Please enter the *Brand Name* of the *Mobile Phone* you want to insure"
    },
    model: {
      name:"model",
      text: "Please enter the *Model*"
    },
    year: {
      name:"year",
      text: "Please enter the *Year* of *Manufacture*"
    },
    extraCover: {
      name:"extraCover",
      text: `Would you like to add *aesthetic cover*
      *1. Yes*
      *2. No*`
    },
    picture: {
      name:"picture",
      text: "Please send the *picture* of the *phone* in it current state"
    },
    premium: {
      name:"premium",
      text: `
      Base on the information yo have provided us, your premium will be *{{1}}* Please click on the link below to complete payment {{2}}`
    },
    summary: {
      name:"summary",
      text: `
      Hi *{{1}}*, your payment has being processed successfully and it's valid from  *{{2}}* to *{{3}}* Your policy number is *{{4}}*`
  }
    
}





