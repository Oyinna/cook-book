"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const config_1 = require("../config");
const dbconnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let connection;
        if (config_1.config.environment_check === 'test') {
            console.log('test database connected ');
            connection = yield mongoose_1.default.connect(config_1.config.test_mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('test database connected 2');
        }
        else {
            console.log('App database connected 1');
            connection = yield mongoose_1.default.connect(config_1.config.mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('App database connected 2');
        }
        // console.log(`${connection} database connected`)
    }
    catch (err) {
        console.log(`${err} database not connected`);
    }
});
dbconnection();
