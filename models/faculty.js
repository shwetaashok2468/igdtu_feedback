const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FacultySchema = new Schema({
    batch: {
        type: String
    },
    facultyList: [
        {
            name: {
                type: String,
            },

            email: {
                type: String,
            },
            subject_name: {
                type: String
            },
            subject_id: {
                type: String
            },
            criteria:[
                {
                   user_id: {
                       type:String
                   },
                    criteria: {
                       type:Array,
                        default:[]
                    }
                }
            ]



        }
    ]
});

mongoose.model("faculties", FacultySchema);
