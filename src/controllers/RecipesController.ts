import {Request, Response} from 'express';
import Recipes from '../database/dbfunctions/recipes';
import {ObjectId} from 'mongodb';

const RecipesController = {
// Retrieve and return all recipes from the database.
  getAll: async (req: Request, res: Response) => {
    try {
      
      const search = req.query.search ? req.query.search : ''
      const limit = req.query.limit ? parseInt(<string>req.query.limit, 10) : 10
      const page = req.query.page ? parseInt(<string>req.query.page, 10) : 1
      
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      type nextT = {
        page: number,
        limit: number
      };

      type previousT = {
        page: number,
        limit: number
      };

      type resultsT = {
        next?: nextT,
        previous?: previousT,
      };

    //   const results = {};
      const totalRecipes = await Recipes.totalNo();
      let results: resultsT = {

      }
      if (endIndex < totalRecipes) {
        results = {
         next: {
            page: page + 1,
            limit
         }
        }
      }

      if (startIndex > 0) {
        results = {
            previous: {
                page: page - 1,
                limit,
            }
        };
      }
      const dbFetch = await Recipes.allRecipes(limit, startIndex, <string>search);
      
      type dataT = {
          results: resultsT,
          dbFetch: string[]
      }

      const data = {
        results,
        dbFetch
      }

      return res.status(200).send({
        success: true,
        data: data,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message || 'Some error occurred while retrieving recipes.',
      });
    }
  },

  // Create and Save a new Recipes
  create: async (req: Request, res: Response) => {
    try {
      // define variables
      const {
        name, difficulty, vegetarian,
      } = req.body;

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
      const recipes = await Recipes.saveRecipes(recipesDetail);
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
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: 'An error occured while saving recipes',
      });
    }
  },

  // Find a single recipes with an id
  getOne: async (req: Request, res: Response) => {
    try {
      const id: ObjectId = new ObjectId(req.params.id);

      // retrive recipes info
      const recipes = await Recipes.fetchById(id);
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
    } catch (err) {
      return res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving club details.',
      });
    }
  },

  // Update the recipes identified by the parameter
  update: async (req: Request, res: Response) => {
    try {
      // validate Difficulty if it exist
      if (req.body.difficulty) {
        if ((typeof req.body.difficulty !== 'number') || (req.body.difficulty <= 0) || (req.body.difficulty > 3)) {
          return res.status(400).send({
            success: false,
            message: 'Difficulty field should be a number not greater than 3',
          });
        }
      }
      // validate Vegetarian if it exist
      if (req.body.vegetarian) {
        if (typeof req.body.vegetarian !== 'boolean') {
          return res.status(400).send({
            success: false,
            message: 'Vegetarian field should be boolean',
          });
        }
      }

      const id: ObjectId = new ObjectId(req.params.id);

      // check if recipe exist
      const recipeExist = await Recipes.fetchById(id);
      if (!recipeExist) {
        return res.status(400).send({
          success: false,
          message: `Recipe with id ${id} does not exist`,
        });
      }

      const recipesDetail = req.body;
      // Find recipe and update it with the request body
      const recipes = await Recipes.fetchByIdAndUpdate(id, recipesDetail);
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
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: 'An error occured while updating recipes',
      });
    }
  },

  // Delete the recipes identified by the parameter
  delete: async (req: Request, res: Response) => {
    try {
      // define variables
      const id: ObjectId  = new ObjectId(req.params.id);

      // Find recipe and delete
      const recipes = await Recipes.fetchByIdAndDelete(id);
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
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        success: false,
        message: 'An error occured while deleting recipe',
      });
    }
  },
};

export default RecipesController;
