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
// import 'dotenv/config';
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const recipes_1 = __importDefault(require("../models/recipes"));
const password = bcrypt_1.default.hashSync('okay', 10);
const users = [
    {
        username: 'admin',
        password,
    },
    {
        username: 'Chinyelu',
        password,
    },
];
const recipes = [
    {
        name: 'Chicken Nuggets',
        prepTime: new Date(),
        difficulty: 1,
        vegetarian: true,
    },
    {
        name: 'Chicken Nuggets',
        prepTime: new Date(),
        difficulty: 1,
        vegetarian: false,
    },
    {
        name: 'Jollof Rice',
        prepTime: new Date(),
        difficulty: 2,
        vegetarian: false,
    },
    {
        name: 'Meat pie',
        prepTime: new Date(),
        difficulty: 3,
        vegetarian: false,
    },
    {
        name: 'Vegetable soup',
        prepTime: new Date(),
        difficulty: 1,
        vegetarian: true,
    },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Seeding started...');
        const user1 = yield users_1.default.create(users[0]);
        const user2 = yield users_1.default.create(users[1]);
        const recipe1 = yield recipes_1.default.create(recipes[0]);
        const recipe2 = yield recipes_1.default.create(recipes[1]);
        const recipe3 = yield recipes_1.default.create(recipes[2]);
        const recipe4 = yield recipes_1.default.create(recipes[3]);
        const recipe5 = yield recipes_1.default.create(recipes[4]);
        if (user1 || user2 || recipe1 || recipe2 || recipe3 || recipe4 || recipe5) {
            return 'Seeded successfully';
        }
        return 'Seeded Unsuccessfully';
    }
    catch (error) {
        return console.log(error);
    }
});
const rollback = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Starting seed rollback...');
    const username = users.map((a) => a.username);
    yield users_1.default.deleteMany({ username: { $in: username } });
    return 'Seeding rolled back successfully';
});
const isRollback = process.argv[2] === '--rollback';
if (isRollback)
    rollback().then(console.log).catch(console.log).finally(() => process.exit(0));
else
    seed().then(console.log).catch(console.log).finally(() => process.exit(0));
