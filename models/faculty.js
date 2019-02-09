const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FacultySchema = new Schema({
    name: {
        type: String,
    },

    email: {
        type: String,
    },
    subject_name:{
     type:String
    },
    subject_id:{
        type:String
    },
    criteria:{
        type:Array,
        default:0
    }
});

mongoose.model("faculties", FacultySchema);
//condition is batch is fixed