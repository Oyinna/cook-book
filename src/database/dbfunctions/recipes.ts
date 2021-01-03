import RecipesM, {Recipes} from '../models/recipes';
import Rating from './rating';
import {ObjectId} from 'mongodb';

type recipesDetailT = {
    name?: string,
    difficulty?: number,
    vegetarian?: boolean
  }

const RecipesClass = {
  //  ------save data------
  saveRecipes: async (recipesDetail: recipesDetailT) => {
    const recipes = await RecipesM.create(<Recipes>recipesDetail);
    if (!recipes) {
      return false;
    }
    return recipes;
  },

  //  -----fetch data------
  totalNo: async () => {
    const no = await RecipesM.countDocuments();
    return no;
  },

  allRecipes: async (limit: number, startIndex: number, search: string) => {
    const recipes = await RecipesM.find({ name: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip(startIndex)
      .sort('-createdOn');

    if (!recipes) {
      return false;
    }
    return recipes;
  },

  fetchById: async (id: ObjectId) => {
    const recipes = await RecipesM.findById(id);
    if (!recipes) {
      return false;
    }
    return recipes;
  },

  fetchByIdAndUpdate: async (id: ObjectId, recipesDetail: recipesDetailT) => {
    const recipes = await RecipesM.findByIdAndUpdate(id, { $set: recipesDetail }, { new: true });
    if (!recipes) {
      return false;
    }
    return recipes;
  },

  fetchByIdAndDelete: async (id:ObjectId) => {
    const recipes = await RecipesM.findByIdAndDelete(id);
    if (!recipes) {
      return false;
    }
    // delete all the rating of this recipe
    const rating = await Rating.deleteRatings(id);
    if (!rating) {
      // undo the first stage and return false
      return false;
    }
    return recipes;
  },
};

export default RecipesClass;
