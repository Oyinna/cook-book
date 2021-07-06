import { Document } from 'mongoose';
import {mongoose} from '../dbConnect';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

});

export interface User extends Document {
    username: string;
    password: string;
    createdAt: Date,
    updatedAt: Date,
  }

// club model
const UserM = mongoose.model<User>('users', UserSchema);

// module exports
// module.exports = mongoose.model('users');
export default UserM;
