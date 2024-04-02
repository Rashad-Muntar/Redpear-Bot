// export const templateService = (message:any, currentState:string) => {
//     try {
//         const data = {
//             messaging_product: 'whatsapp',
//             to: message?.from,
//             type: 'template',
//             template: {
//                 name: currentState,
//                 language: {
//                     code: 'en'
//                 }
//             }
//         };
//       return data
//     } catch (error: any) {
//       return error.message;
//     }
// };
import { createTemplate } from "../utils/message";


export const templateService = async (message:any, currentState:string) => {
    try {
        let customTemplate;

        switch (currentState) {
            case "name_request":
                // Customize template for name request
                customTemplate = createTemplate(message, currentState, {
                    text: "Please tell us your name"
                });
                break;
            case "address_request":
                // Customize template for address request
                customTemplate = createTemplate(message, currentState, {
                   text: "please enter your email address"
                });
                break;
            // Add cases for other template types as needed

            default:
                // Handle default case or unrecognized template names
                console.error("Unrecognized template name:", currentState);
                customTemplate = null;
                break;
        }

        return customTemplate;
    } catch (error:any) {
        return error.message;
    }
};

// export const templateService = (message:any, templateName:string, options = {}) => {
//     const { variables, buttons } = options;

//     // Customize template structure
//     const customTemplate = {
//         messaging_product: 'whatsapp',
//         to: message?.from,
//         type: 'template',
//         template: {
//             name: templateName,
//             language: {
//                 code: 'en'
//             },
//             // Add other common fields as needed
//         }
//     };

//     // Add variables to template if provided
//     if (variables) {
//         customTemplate.template.variables = variables;
//     }

//     // Add buttons to template if provided
//     if (buttons) {
//         customTemplate.template.buttons = buttons;
//     }

//     return customTemplate;
// };

