"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, config_1.config.access_token, (err, recipe) => {
        if (err) {
            return res.status(403).send({
                message: 'Unauthorized',
            });
        }
        // req.user = recipe;
        next();
    });
}
// module.exports = authenticateToken;
exports.default = authenticateToken;
