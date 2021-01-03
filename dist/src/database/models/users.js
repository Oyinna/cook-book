"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnect_1 = require("../dbConnect");
const { Schema } = dbConnect_1.mongoose;
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
// club model
const UserM = dbConnect_1.mongoose.model('users', UserSchema);
// module exports
// module.exports = mongoose.model('users');
exports.default = UserM;
