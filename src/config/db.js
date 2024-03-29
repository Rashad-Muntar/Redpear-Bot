"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CONNECTION_URL = process.env.DB_ENDPOINT;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(CONNECTION_URL);
        console.log("Database is connected");
    }
    catch (error) {
        return error.message;
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map