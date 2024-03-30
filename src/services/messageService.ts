const templateService = (message:any, currentState:string) => {
    try {
        const data = {
            messaging_product: 'whatsapp',
            to: message?.from,
            type: 'template',
            template: {
                name: currentState,
                language: {
                    code: 'en'
                }
            }
        };
      return data
    } catch (error: any) {
      return error.message;
    }
};

export default {templateService}