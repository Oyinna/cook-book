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
const rating_1 = __importDefault(require("../models/rating"));
const RatingClass = {
    //  ------save data------
    saveRating: (rating) => __awaiter(void 0, void 0, void 0, function* () {
        const rate = yield rating_1.default.create(rating);
        console.log(rate, 'rrraatte');
        if (!rate) {
            return false;
        }
        return rate;
    }),
    deleteRatings: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const rate = yield rating_1.default.deleteMany({ recipeId: id });
        if (!rate) {
            return false;
        }
        return rate;
    }),
};
exports.default = RatingClass;
