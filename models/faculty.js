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
    }
});

mongoose.model("faculties", FacultySchema);
//condition is batch is fixed