var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/User");
var upload = require("./upload");
/* GET users listing. */
router.get('/users', function(req, res, next) {
    User.find({}, ["-password", "-email", "-date_of_birth", "-_id"]).then((error, doc) => {
        res.send(error ? error : doc)
    })
});

router.get('/auth/:id', function(req, res, next) {
    var id = req.params.id
    User.findById(id, (error, doc) => {
        res.send(error ? error : doc)
    });
});

router.post('/login', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var found = false
    User.findOne({ email: email, password: password }, ["-password"], (error, doc) => {
        if (doc) {
            found = true
            if (found) {
                res.send(doc)
            }
        }
    });
    if (found != true) {
        // res.json("Authentication failed");
    }

});

router.post('/register', upload("avatar", "users"), function(req, res, next) {
    try {
        var data = {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: Date.now().toString() + req.body.email,
            phone: req.body.phone,
            country: req.body.country,
            location: req.body.location,
            specialization: req.body.specialization,
            skills: req.body.skills ? req.body.skills : new Object({ "0": "Java" }),
            avatar: req.file ? req.file.path.replace("public", "") : "Avatar.png",
            date_of_birth: req.body.date_of_birth,
            created_at: Date.now(),
            password: req.body.password
        }
        var user = new User(data);
        user.save((info) => {
            console.log(info);
            User.findById(user._id, ["-password"], (error, doc) => {
                res.send(doc);
            });
        });

    } catch (error) {
        res.send(error);
    }

    // res.redirect("/users");
});

/* POST users listing. */
router.post('/users/update/:id', function(req, res, next) {
    var id = req.body.id || req.params.id;
    var user_id = req.body.user_id || req.params.user_id;
    User.findById(id, (error, doc) => {
        doc.name = req.body.name ? req.body.name : doc.name;
        doc.country = req.body.country ? req.body.country : doc.country;
        doc.location = req.body.location ? req.body.location : doc.location;
        doc.specialization = req.body.specialization ? req.body.specialization : doc.specialization;
        doc.skills = req.body.skills ? req.body.skills : doc.skills;
        doc.avatar = req.body.avatar ? req.body.avatar : doc.avatar;
        doc.date_of_birth = req.body.date_of_birth ? req.body.date_of_birth : doc.date_of_birth;
        doc.save();
        res.send(error ? error : doc);
    })
});

router.post('/users/delete/:id', function(req, res, next) {
    var id = req.body.id || req.params.id
    User.findByIdAndRemove(id).exec();
    res.send('user deleted succesfully');
});

module.exports = router;