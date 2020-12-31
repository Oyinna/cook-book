import Rating from '../database/dbfunctions/rating';
import {Request, Response} from 'express';
import Recipes from '../database/dbfunctions/recipes';
import {ObjectId} from 'mongodb';

const RatingController = {
// Create and Save a new Recipes
  create: async (req: Request, res: Response) => {
    try {
      const id: ObjectId = new ObjectId(req.params.id);
      // check if recipe exist
      const recipeExist = await Recipes.fetchById(id);
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
      const rates = await Rating.saveRating(rating);
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
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'An error occured while saving rating',
      });
    }
  },
};

export default RatingController;
