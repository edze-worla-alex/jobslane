const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {Schema} = mongoose;
const Types = Schema.Types;

const userTypeSchema = new Schema({
    _id: new mongoose.Types.ObjectId(),
    type: { type: Types.String },
    created_at: { type: Types.Date },
    updated_at: { type: Types.Date, default: Date.now() },

}, { collection: "user_types" });

module.exports.User = mongoose.model('UserType', userTypeSchema);