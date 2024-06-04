const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    TA_name:{
        type:String,
        required:true
    },
    course_name:{
        type: String,
        required: true
    },
    course_code:{
        type:Number,
        required:true
    },
    instructor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    zoom:{
        type:String,
        required:false
    },
    location: {
        type: String,
        required: false,
    },
    day: {
        type: [String],
        required: true,
    },
    start_time:{
        type:String,
        required:true,
    },
    end_time:{
        type:String,
        required:true
    },

});
courseSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Course", courseSchema);