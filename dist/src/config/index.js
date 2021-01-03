"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: process.env.PORT || 8080,
    mongodb_url: process.env.MONGODB_URI,
    test_mongodb_url: process.env.TEST_MONGODB_URI,
    access_token: process.env.ACCESS_TOKEN_SECRET,
    environment_check: process.env.NODE_ENV
};
exports.config = config;
