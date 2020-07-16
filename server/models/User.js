const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: Types.String,
        required: [true, "You need to provide your name"],
        min: [2, "Name must be at least two characters long"],
        max: [120, "Name cannot be longer than 120 characters"]
    },
    email: {
        type: Types.String,
        unique: true,
        required: [true, "You need to provide an email"],
        min: [10, "Email must be at least ten character"],
        max: [120, "Email cannot be longer than 120 characters"]
    },
    phone: {
        type: Types.String,
        required: [true, "You need to provide a phone number"]
    },
    country: { type: Types.String },
    specialization: { type: Types.String },
    location: { type: Types.String },
    skills: { type: Types.Object },
    avatar: { type: Types.String, default: "Avatar.png" },
    date_of_birth: { type: Types.Date },
    user_type: { type: Types.Object, ref: "user_types" },
    created_at: { type: Types.Date },
    updated_at: { type: Types.Date, default: Date.now() },
    password: {
        type: Types.String,
        required: [true, "You must provide a password"],
        min: [3, "Password must be at least three characters"],
    },
    token: { type: Types.String, default: null },
    jobs: [{
        type: Types.ObjectId,
        ref: 'Job'
    }]
}, { collection: "users" });

module.exports = mongoose.model('User', userSchema);