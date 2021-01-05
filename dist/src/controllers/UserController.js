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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const users_1 = __importDefault(require("../database/services/users"));
function generateToken(user) { return jsonwebtoken_1.default.sign(user.toJSON(), config_1.config.access_token, { expiresIn: '1w' }); }
const UsersController = {
    // login user
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body.username || !req.body.password) {
                return res.status(400).send({
                    success: false,
                    message: 'username or password can not be empty',
                });
            }
            const findUser = yield users_1.default.findByUsername(req.body.username);
            if (!findUser) {
                return res.status(400).send({
                    success: false,
                    message: 'Incorrect username or password',
                });
            }
            const confirmPassword = yield bcrypt_1.default.compare(req.body.password, findUser.password);
            if (!confirmPassword) {
                return res.status(400).send({
                    success: false,
                    message: 'Incorrect username or password',
                });
            }
            const userDetails = {
                // eslint-disable-next-line no-underscore-dangle
                id: findUser._id,
                username: findUser.username,
            };
            const accessToken = generateToken(findUser);
            return res.status(200).send({
                accessToken,
                success: true,
                data: userDetails,
            });
        }
        catch (err) {
            return res.status(400).send({
                success: false,
                message: err.message || 'login failed.',
            });
        }
    }),
};
exports.default = UsersController;
