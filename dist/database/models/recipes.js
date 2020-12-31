"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = require("../dbConnect");
const { Schema } = dbConnect_1.mongoose;
const RecipesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    prepTime: {
        type: Date,
        default: new Date(),
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 3,
        required: true,
    },
    vegetarian: {
        type: Boolean,
        required: true,
    },
});
// club model
const RecipesM = dbConnect_1.mongoose.model('recipes', RecipesSchema);
// module exports
// module.exports = mongoose.model('recipes');
exports.default = RecipesM;
