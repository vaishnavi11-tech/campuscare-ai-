const Complaint = require("../models/Complaint");

exports.createComplaint = async(req,res)=>{

    try{

        const { title, description, category } = req.body;

        if(!title || !description || !category){
            return res.status(400).json({
                success:false,
                message:"Please fill all details"
            })
        }

        const complaint = await Complaint.create({

            title,
            description,
            category,

            student:req.user.id

        });

        return res.status(201).json({
            success:true,
            message:"Complaint created successfully",
            complaint
        })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Server error"
        })

    }

}
exports.getMyComplaints = async(req,res)=>{

    try{
const complaints= await Complaint.find({
   student:req.user.id
}).populate("student")
        return res.status(200).json({
            success:true,
            complaints
        })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Server error"
        })

    }

}