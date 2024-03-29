"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../controllers/message"));
const router = express_1.default.Router();
router.post("/webhook", message_1.default.incomingMsgController);
exports.default = router;
//# sourceMappingURL=index.js.map