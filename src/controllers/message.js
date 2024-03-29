"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const { GRAPH_API_TOKEN, PHONE_NUMBER } = process.env;
const incomingMsgController = async (req, res) => {
    var _a, _b, _c, _d, _e;
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
    // console.log(GRAPH_API_TOKEN, PHONE_NUMBER)
    const message = (_e = (_d = (_c = (_b = (_a = req.body.entry) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.changes[0]) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e[0];
    if ((message === null || message === void 0 ? void 0 : message.type) === "text") {
        const business_phone_number_id = PHONE_NUMBER;
        await (0, axios_1.default)({
            method: "POST",
            url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
            headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
            },
            data: {
                messaging_product: "whatsapp",
                to: message.from,
                text: { body: "Echo: " + message.text.body },
                context: {
                    message_id: message.id,
                },
            },
        });
        await (0, axios_1.default)({
            method: "POST",
            url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
            headers: {
                Authorization: `Bearer ${GRAPH_API_TOKEN}`,
            },
            data: {
                messaging_product: "whatsapp",
                status: "read",
                message_id: message.id,
            },
        });
    }
    res.sendStatus(200);
};
exports.default = { incomingMsgController };
//# sourceMappingURL=message.js.map