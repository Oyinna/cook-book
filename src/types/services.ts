import {ObjectId} from 'mongodb';

export type TRating = {
  recipeId: ObjectId,
  rate: number
};

export type TRecipesDetail = {
    name?: string,
    difficulty?: number,
    vegetarian?: boolean
  }