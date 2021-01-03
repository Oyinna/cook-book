import RateM, {Rate} from '../models/rating';
import {ObjectId} from 'mongodb';

type ratingT = {
    recipeId: ObjectId,
    rate: number
  };

const RatingClass = {
  //  ------save data------
  saveRating: async (rating: ratingT) => {
    const rate = await RateM.create(<Rate> rating);
    console.log(rate, 'rrraatte')
    if (!rate) {
      return false;
    }
    return rate;
  },

  deleteRatings: async (id: ObjectId) => {
    const rate = await RateM.deleteMany({ recipeId: id });
    if (!rate) {
      return false;
    }
    return rate;
  },
};

export default RatingClass;
