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
const rating_1 = __importDefault(require("../database/services/rating"));
const recipes_1 = __importDefault(require("../database/services/recipes"));
const mongodb_1 = require("mongodb");
const RatingController = {
    // Create and Save a new Recipes
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = new mongodb_1.ObjectId(req.params.id);
            // check if recipe exist
            const recipeExist = yield recipes_1.default.fetchById(id);
            if (!recipeExist) {
                return res.status(400).send({
                    success: false,
                    message: `Recipe with id ${id} does not exist`,
                });
            }
            // define variables
            const { rate } = req.body;
            // validate Rate
            if ((typeof rate !== 'number') || (rate <= 0) || (rate > 5)) {
                return res.status(400).send({
                    success: false,
                    message: 'Rate should be a number between 1 and 5',
                });
            }
            const rating = {
                recipeId: id,
                rate,
            };
            // Save rating in the database
            const rates = yield rating_1.default.saveRating(rating);
            if (!rates) {
                return res.status(400).send({
                    success: false,
                    message: 'Failed to save rating!',
                });
            }
            return res.status(201).send({
                success: true,
                data: rates,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                message: 'An error occured while saving rating',
            });
        }
    }),
};
exports.default = RatingController;
