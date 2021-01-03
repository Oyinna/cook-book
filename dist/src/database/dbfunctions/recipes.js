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
const recipes_1 = __importDefault(require("../models/recipes"));
const rating_1 = __importDefault(require("./rating"));
const RecipesClass = {
    //  ------save data------
    saveRecipes: (recipesDetail) => __awaiter(void 0, void 0, void 0, function* () {
        const recipes = yield recipes_1.default.create(recipesDetail);
        if (!recipes) {
            return false;
        }
        return recipes;
    }),
    //  -----fetch data------
    totalNo: () => __awaiter(void 0, void 0, void 0, function* () {
        const no = yield recipes_1.default.countDocuments();
        return no;
    }),
    allRecipes: (limit, startIndex, search) => __awaiter(void 0, void 0, void 0, function* () {
        const recipes = yield recipes_1.default.find({ name: { $regex: search, $options: 'i' } })
            .limit(limit)
            .skip(startIndex)
            .sort('-createdOn');
        if (!recipes) {
            return false;
        }
        return recipes;
    }),
    fetchById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const recipes = yield recipes_1.default.findById(id);
        if (!recipes) {
            return false;
        }
        return recipes;
    }),
    fetchByIdAndUpdate: (id, recipesDetail) => __awaiter(void 0, void 0, void 0, function* () {
        const recipes = yield recipes_1.default.findByIdAndUpdate(id, { $set: recipesDetail }, { new: true });
        if (!recipes) {
            return false;
        }
        return recipes;
    }),
    fetchByIdAndDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const recipes = yield recipes_1.default.findByIdAndDelete(id);
        if (!recipes) {
            return false;
        }
        // delete all the rating of this recipe
        const rating = yield rating_1.default.deleteRatings(id);
        if (!rating) {
            // undo the first stage and return false
            return false;
        }
        return recipes;
    }),
};
exports.default = RecipesClass;
