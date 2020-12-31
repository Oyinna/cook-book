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
const recipes_1 = __importDefault(require("../database/dbfunctions/recipes"));
const mongodb_1 = require("mongodb");
const RecipesController = {
    // Retrieve and return all recipes from the database.
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let { search } = req.query;
            if (!search) {
                search = '';
            }
            // pagination
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            //   const results = {};
            const totalRecipes = yield recipes_1.default.totalNo();
            let results = {};
            if (endIndex < totalRecipes) {
                let results = {
                    next: {
                        page: page + 1,
                        limit
                    }
                };
            }
            if (startIndex > 0) {
                let results = {
                    previous: {
                        page: page - 1,
                        limit,
                    }
                };
            }
            const dbFetch = yield recipes_1.default.allRecipes(limit, startIndex, search);
            const data = {
                results,
                dbFetch
            };
            return res.status(200).send({
                success: true,
                data: data,
            });
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: err.message || 'Some error occurred while retrieving recipes.',
            });
        }
    }),
    // Create and Save a new Recipes
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // define variables
            const { name, difficulty, vegetarian, } = req.body;
            // validate vegetarian
            if (typeof vegetarian !== 'boolean') {
                return res.status(400).send({
                    success: false,
                    message: 'Vegetarian field should be boolean',
                });
            }
            // validate Name
            if (!req.body.name) {
                return res.status(400).send({
                    success: false,
                    message: 'Name field can not be empty',
                });
            }
            // validate Difficulty
            if ((typeof difficulty !== 'number') || (difficulty <= 0) || (difficulty > 3)) {
                return res.status(400).send({
                    success: false,
                    message: 'Difficulty field should be a number',
                });
            }
            const recipesDetail = {
                name,
                difficulty,
                vegetarian,
            };
            // Save user in the database
            const recipes = yield recipes_1.default.saveRecipes(recipesDetail);
            if (!recipes) {
                return res.status(500).send({
                    success: false,
                    message: 'Failed to save recipes!',
                });
            }
            return res.status(201).send({
                success: true,
                data: recipes,
            });
        }
        catch (err) {
            return res.status(500).send({
                success: false,
                message: 'An error occured while saving recipes',
            });
        }
    }),
    // Find a single recipes with an id
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = new mongodb_1.ObjectId(req.params.id);
            // retrive recipes info
            const recipes = yield recipes_1.default.fetchById(id);
            if (!recipes) {
                return res.status(400).send({
                    success: false,
                    message: `Recipe with id ${id} does not exist`,
                });
            }
            return res.send({
                success: true,
                data: recipes,
            });
        }
        catch (err) {
            return res.status(500).send({
                message: err.message || 'Some error occurred while retrieving club details.',
            });
        }
    }),
    // Update the recipes identified by the parameter
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // validate Difficulty if it exist
            if (req.body.Difficulty) {
                if ((typeof req.body.Difficulty !== 'number') || (req.body.Difficulty <= 0) || (req.body.Difficulty > 3)) {
                    return res.status(400).send({
                        success: false,
                        message: 'Difficulty field should be a number',
                    });
                }
            }
            // validate Vegetarian if it exist
            if (req.body.Vegetarian) {
                if (typeof req.body.Vegetarian !== 'boolean') {
                    return res.status(400).send({
                        success: false,
                        message: 'Vegetarian field should be boolean',
                    });
                }
            }
            const id = new mongodb_1.ObjectId(req.params.id);
            // check if recipe exist
            const recipeExist = yield recipes_1.default.fetchById(id);
            if (!recipeExist) {
                return res.status(400).send({
                    success: false,
                    message: `Recipe with id ${id} does not exist`,
                });
            }
            const recipesDetail = req.body;
            // Find recipe and update it with the request body
            const recipes = yield recipes_1.default.fetchByIdAndUpdate(id, recipesDetail);
            if (!recipes) {
                return res.status(500).send({
                    success: false,
                    message: 'Recipe update failed',
                });
            }
            return res.status(200).send({
                success: true,
                data: recipes,
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                message: 'An error occured while updating recipes',
            });
        }
    }),
    // Delete the recipes identified by the parameter
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // define variables
            const id = new mongodb_1.ObjectId(req.params.id);
            // Find recipe and delete
            const recipes = yield recipes_1.default.fetchByIdAndDelete(id);
            if (!recipes) {
                return res.status(400).send({
                    success: false,
                    message: 'Invalid ID',
                });
            }
            return res.status(200).send({
                success: true,
                message: 'Recipe successfully deleted',
            });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                success: false,
                message: 'An error occured while deleting recipe',
            });
        }
    }),
};
exports.default = RecipesController;
