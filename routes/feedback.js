var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

require("../models/faculty");
const Faculty = mongoose.model("faculties");

require("../models/users");
const User = mongoose.model("users");

require("../models/facultyResponse");
const FacultyResponse = mongoose.model("facultyResponse");

const { ensureAuthenticated } = require("../helpers/auth");

//getting the idea page
router.get("/", ensureAuthenticated, (req, res) => {
  (async () => {
    let isSubmitted = await FacultyResponse.find({
      student_id: req.user.id
    });

    console.log(isSubmitted);

    if (isSubmitted.length === 0) {
      let faculty = await Faculty.findOne({
        batch: req.user.batch
      });
      console.log(faculty);
      res.render("feedback/index", {
        faculty: faculty.facultyList
      });
    } else {
      res.redirect("/feedback/success");
    }
  })();
});

router.post("/submit_form", ensureAuthenticated, (req, res) => {
  (async () => {
    //getting user batch
    let batch = await Faculty.findOne({
      batch: req.user.batch
    });

    //getting FacultyList for that batch
    let facultyList = batch.facultyList;
    let form_values = req.body;
    let response = [];
    let facultyResponse = new FacultyResponse();
    facultyResponse.student_id = req.user.id;
    facultyResponse.batch = req.user.batch;
    for (let j = 1; j <= facultyList.length; j++) {
      let values = [];
      for (let i = 0; i < Object.entries(form_values).length; i++) {
        let x = "f" + j;
        if (Object.entries(form_values)[i][0].search(x) > -1) {
          values.push(Object.entries(form_values)[i][1]);
        }
      }
      let object = {};
      console.log(facultyList[j - 1]._id);
      object.faculty_id = facultyList[j - 1]._id;
      object.criteria = values;
      response.push(object);
    }
    facultyResponse.response = response;
    try {
      await facultyResponse.save();
      console.log("Saved");
      res.redirect("/feedback/success");
    } catch (e) {
      console.log(error);
    }
  })();
});

router.get("/success", ensureAuthenticated, (req, res) => {
  (async () => {
    let batch = await Faculty.findOne({
      batch: req.user.batch
    });

    res.render("feedback/success",{
        faculty: batch.facultyList
    });
  })();
});

module.exports = router;
