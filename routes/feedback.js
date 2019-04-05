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
      res.redirect("/feedback/graph");
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
      res.redirect("/feedback/graph");
    } catch (e) {
      console.log(error);
    }
  })();
});

router.get("/graph", ensureAuthenticated, (req, res) => {
  (async () => {
    //first graph - each teacher vs total sum of criteria
    // get total sum of each according to batch

    let batch = await Faculty.findOne({
      batch: req.user.batch
    });

    let responses = await FacultyResponse.find({
      batch: batch.batch
    });

    console.log(JSON.stringify(responses));
    let facultyLength=responses[0].response.length;
    let performance=[];
    for(let i=0;i<facultyLength;i++){
      let facultyPerformance=0;
      let facultyId;
      for(let j=0;j<responses.length;j++){
        try {

          console.log(responses[j].response[i].criteria);
            let current_sum=(responses[j].response[i].criteria).reduce((acc,curr)=>{
              return (Number(acc)+Number(curr));
            });
            console.log(current_sum);
            facultyPerformance+=current_sum;
            facultyId=responses[j].response[i].faculty_id;
            console.log(responses[j].response[i].faculty_id);
        }
        catch (e) {
            
        }
      }
      let faculty=await Faculty.findOne({
          batch:req.user.batch

      });
      let facultyName;
      faculty.facultyList.map((val)=>{
        if(val.id.match(facultyId)){
          facultyName=val.name;
        }
      });
      console.log(facultyName);

      console.log(facultyPerformance);
        performance.push({facultyName:facultyName, performance:facultyPerformance});

    }
      facultyLength=responses[0].response.length;
      let bestPerformance=[];
      for(let i=0;i<facultyLength;i++){
          let facultyPerformance=0;
          let facultyId;
          for(let j=0;j<responses.length;j++){
              try {

                  let a=responses[j].response[i].criteria;
                  let result = a.map(function (x) {
                      return parseInt(x, 10);
                  });
                  console.log(result);
                  let count = result.reduce(function (acc, curr) {
                      if (typeof acc[curr] ==='undefined') {
                          acc[curr] = 1;
                      } else {
                          acc[curr] += 1;
                      }

                      return acc;
                  }, {});
                  let current_sum=0;
                  let count4=count[4]?count[4]:0;
                  let count5=count[5]?count[5]:0;


                       current_sum = count4 + count5;

                      console.log(current_sum);
                      facultyPerformance += current_sum;
                      facultyId = responses[j].response[i].faculty_id;
                      console.log(responses[j].response[i].faculty_id);

              }
              catch (e) {

              }
          }
          let faculty=await Faculty.findOne({
              batch:req.user.batch

          });
          let facultyName;
          faculty.facultyList.map((val)=>{
              if(val.id.match(facultyId)){
                  facultyName=val.name;
              }
          });
          bestPerformance.push({facultyName:facultyName, performance:facultyPerformance});

      }

    /*let labels=[];
    performance.map(val=>{return labels.push(val.facultyId)});

    let data=[];
    performance.map(val=>{ return data.push(val.performance)});*/


    console.log(JSON.stringify(performance));
    res.render("feedback/graph",{
      performance:performance,
        bestPerformance:bestPerformance
    });
  })();
});

module.exports = router;
