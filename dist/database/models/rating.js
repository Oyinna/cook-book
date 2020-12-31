"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = require("../dbConnect");
const { Schema } = dbConnect_1.mongoose;
const RatingSchema = new Schema({
    recipeId: {
        type: dbConnect_1.mongoose.Schema.Types.ObjectId,
        ref: 'recipes',
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    theDate: {
        type: Date,
        default: new Date(),
        required: true,
    },
});
// rating model
const RateM = dbConnect_1.mongoose.model('rating', RatingSchema);
// module exports
// module.exports = mongoose.model('rating');
exports.default = RateM;
