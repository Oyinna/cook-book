"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const server = express_1.default();
server.use((cors_1.default()));
server.use(body_parser_1.default.json());
server.use('/', routes_1.router);
server.listen(config_1.config.port, () => {
    console.log('Express server listening on port', config_1.config.port);
});
// export { server };
