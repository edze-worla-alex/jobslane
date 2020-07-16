const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {Schema} = mongoose;
const Types = Schema.Types;

const jobSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    created_by: {
        type: Types.ObjectId,
        ref: 'User'
    },
    title: { type: Types.String },
    description: { type: Types.String },
    country: { type: Types.String },
    specialization: { type: Types.String },
    location: { type: Types.String },
    skills_requirement: { type: Types.Object },
    cover_picture: { type: Types.String, default: "JobsCover.png" },
    currency: { type: Types.String, default: "$" },
    salary: { type: Types.Number },
    created_at: { type: Types.Date },
    updated_at: { type: Types.Date, default: Date.now() },
    status: { type: Types.String, defaut: "pending" }
}, { collection: "jobs" });

module.exports =  mongoose.model('Job', jobSchema);