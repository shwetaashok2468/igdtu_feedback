var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
//Users model
require("../models/users");
const User = mongoose.model("users");

const passport = require("passport");
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");


//login page (student) get method
router.get("/login", (req, res) => {
  let message = "";
  console.log(req.query.message);
  if (req.query.message) {
    message = req.query.message;
    console.log(message);
  }

  console.log("login page");
  res.render("users/login", {
    message: message
  });
});


router.get("/setPassword", (req, res) => {
  console.log("set Password");
  res.render("users/setPassword", {
    errors: []
  });
});


router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/feedback",
    failureRedirect:
      "/users/login?message=Wrong password or user does not exists",
    failureFlash: true
  })(req, res, next);
});

router.post("/setPassword", (req, res) => {
  let errors = [];
  if (req.body.password !== req.body.password2) {
    errors.push({ text: "Password does not match" });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "Password length is less than 4" });
  }
  if (req.body.batch === "select") {
    errors.push({ text: "Select Your batch first" });
  }

  if (errors.length > 0) {
    res.render("users/setPassword", {
      errors: errors
    });
  } else {
    User.findOne({
      email: req.user.email
    }).then(user => {
      bcrypt.genSalt(10, (err, salt) => {
        //to generate salt for length upto 10 to hash the password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          //these two lines is used to convert entered password to hash

          user.password = hash;
          user.batch = req.body.batch;
          user.firstUser = false;

          user.save().then(user => {
            req.flash("success_msg", "Password Set Successfully");
            console.log(user.firstUser);
            res.redirect("/feedback");
          });
        });
      });
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "logout Successfully");
  res.redirect("/users/login/");
});

router.get("/admin", (req, res) => {
  res.render("users/admin");
});

router.get("/add_batch", (req, res) => {
  res.render("users/add_batch");
});

router.get("/faculty", (req, res) => {
  res.render("users/faculty");
});



router.get("/faculty_login", (req, res) => {
  res.render("users/faculty_login");
});



router.post("/faculty_login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/faculty",
    failureRedirect:
        "/users/faculty_login?message=Wrong password or user does not exists",
    failureFlash: true
  })(req, res, next);
});


module.exports = router;
