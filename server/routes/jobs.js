var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Job = require("../models/Job");
var User = require("../models/User");
var upload = require("./upload");

/* GET users listing. */
router.get('/', function(req, res, next) {
    Job.find({status:"Enabled"},["-status"],{ skip: 0 }).then((error, doc) => {
        res.send(error ? error : doc)
    })
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id
    Job.findById(id, (error, doc) => {
        res.send(error ? error : doc)
    })
});

router.post('/',upload("cover_picture","jobs"), function(req, res, next) {
    var created_by = req.body.created_by || req.params.created_by;
    if (created_by == null) {
        res.status(201).json("Authentication Failed");
    } else if (created_by != null) {
      User.findById(created_by, (error, doc) => {
            if (doc._id == created_by) {

            } else {
                res.status(201).json("Authorization Failed");
            }
        })
    }


    try {
        var data = {
            _id: new mongoose.Types.ObjectId(),
            created_by:created_by,
            title: req.body.title,
            description: req.body.description,
            country: req.body.country,
            specialization: req.body.specialization,
            location: req.body.location,
            cover_picture: req.file.path.replace("public",""),
            salary: req.body.salary,
            created_at: Date.now(),
            status: "Enabled"
        }
        var job = new Job(data);
        job.save((info) => {
            console.log(info);

            Job.findById(job._id, (job_error, job_doc) => {
                if (job_doc) {
                    User.findById(created_by,(user_error, user_doc) => {
                    if(user_error){
                        console.log(user_error);
                    }
                    else{
                    user_doc.jobs.push(job_doc);
                    user_doc.save();
                    }
                    });
                    res.json(job_doc);
                } else {
                    console.log({ "Log": error });
                }
            });
        });

    } catch (error) {
        res.send(error);
    }

    //  res.redirect("/jobs");
});

/* POST jobs listing. */
router.post('/update/:id', function(req, res, next) {
    var id = req.body.id || req.params.id;
    var job_id = req.body.job_id || req.params.job_id;
    var created_by = req.body.created_by|| req.params.created_by;
    Job.findById(id, (error, doc) => {
        doc.title = req.body.title ? req.body.title : doc.title;
        doc.description = req.body.description ? req.body.description : doc.description;
        doc.country = req.body.country ? req.body.country : doc.country;
        doc.location = req.body.location ? req.body.location : doc.location;
        doc.specialization = req.body.specialization ? req.body.specialization : doc.specialization;
        doc.skills = req.body.skills ? req.body.skills : doc.skills;
        doc.updated_at = Date.now();
        doc.save()
        res.send(error ? error : doc)
    })
});

router.post('/delete/:id', function(req, res, next) {
    var id = req.body.id || req.params.id
    User.findByIdAndRemove(id).exec();
    res.send('user deleted succesfully');
});

module.exports = router;
