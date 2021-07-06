import { Document } from 'mongoose';
import {mongoose} from '../dbConnect';
import {ObjectId} from 'mongodb'

const { Schema } = mongoose;

const RatingSchema = new Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
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

export interface Rate extends Document {
    recipeId: ObjectId;
    rate: number;
    theDate: Date;
    createdAt: Date;
    updatedAt: Date;
  }


// rating model
const RateM = mongoose.model<Rate>('rating', RatingSchema);

// module exports
// module.exports = mongoose.model('rating');
export default RateM;
