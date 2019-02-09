var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

require('../models/faculty');
const Faculty = mongoose.model('faculties');

const {ensureAuthenticated} = require('../helpers/auth');

//getting the idea page
router.get('/', ensureAuthenticated, (req, res) => {
    Faculty.find()
        .then((faculty) => {
            res.render('feedback/index', {
                faculty: faculty,
            });
        })
});

router.post('/submit_form', ensureAuthenticated,(req,res)=>{
    (async()=>{
        let faculty=await Faculty.find();

        console.log(faculty);

    })();

})


// router.get('/add', ensureAuthenticated, (req, res) => {
//     console.log("/add", req.user.firstUser);
//     let errors = [];
//     res.render('feedback/add', {
//         errors: errors,
//         title: req.body.title,
//         details: req.body.details
//     });
//
// });



//
//
// //this is for process form
// router.post('/add', (req, res) => {
//
//     let errors = [];
//     if (!req.body.title) {
//         errors.push({text: "title required"});
//     }
//     if (!req.body.details) {
//         errors.push({text: "details required"});
//     }
//     if (errors.length > 0) {
//
//         console.log(errors);
//         res.render('feedback/add', {
//             errors: errors,
//             title: req.body.title,
//             details: req.body.details
//         });
//     }
//     else {
//
//         const newUser = {
//             title: req.body.title,
//             details: req.body.details,
//             user: req.user.id //from passport.js
//         };
//
//         new Idea(newUser).save().then(() => {
//
//             req.flash("success_msg", "Successfully Added");
//
//             res.redirect('/feedback');
//         })
//
//
//     }
//
//
// });
//
// router.get('/edit/:id', ensureAuthenticated, (req, res) => {
//     Idea.findOne({
//         _id: req.params.id,
//         user: req.user.id
//     })
//         .then(idea => {
//
//
//             res.render('feedback/edit', {
//                 idea: idea
//             });
//         })
//
// });
//
//
// router.put('/:id', ensureAuthenticated, (req, res) => {
//     Idea.findOne({
//         _id: req.params.id,
//         user: req.user.id
//
//     })
//         .then(idea => {
//             idea.title = req.body.title;
//             idea.details = req.body.details
//
//             idea.save()
//                 .then(() => {
//                     req.flash("success_msg", "successfully updated");
//                     res.redirect('/feedback');
//                 })
//         })
// });
//
// router.delete('/:id', ensureAuthenticated, (req, res) => {
//     let id = req.params.id;
//     Idea.findOneAndDelete({
//         _id: id,
//         user: req.user.id
//
//     })
//         .then(() => {
//             req.flash("success_msg", "successfully deleted");
//             res.redirect('/feedback');
//         })
//
// });





module.exports = router;
