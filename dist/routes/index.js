"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const authenticateToken_1 = __importDefault(require("./authenticateToken"));
const RecipesController_1 = __importDefault(require("../controllers/RecipesController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
// import RatingController from '../controllers/RatingController';
//  user routes
router.get('/login', UserController_1.default.login);
// recipes routes
router.post('/recipes', authenticateToken_1.default, RecipesController_1.default.create);
