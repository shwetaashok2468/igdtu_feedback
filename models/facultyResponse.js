const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FacultyResponse = new Schema({

    student_id:{
        type:String
    },

    batch:{
        type:String
    },

    response:[
        {
            faculty_id:{
                type: String
            },

            criteria:{
                type: Array
            }
        }
    ]


});

mongoose.model("facultyResponse", FacultyResponse);
