const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },

        description:{
            type:String,
            required:true
        },

        category:{
            type:String,
            required:true
        },

        status:{
            type:String,
           enum:["pending","in-progress","resolved"],
default:"pending"
        },

        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student",
            required:true
        },
        assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
},
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);