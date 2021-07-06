import { Document } from 'mongoose';
import {mongoose} from '../dbConnect';

const { Schema } = mongoose;

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

export interface Recipes extends Document {
    name: string;
    prepTime: Date;
    difficulty: number;
    vegetarian: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

// club model
const RecipesM = mongoose.model<Recipes>('recipes', RecipesSchema);

// module exports
// module.exports = mongoose.model('recipes');
export default RecipesM;
