const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {

    try {

        const { title, description, category } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details"
            });
        }

        const complaint = await Complaint.create({

            title,
            description,
            category,
            student: req.user.id

        });

        return res.status(201).json({
            success: true,
            message: "Complaint created successfully",
            complaint
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

exports.getMyComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find({
            student: req.user.id
        }).populate("student", "name email");

        return res.status(200).json({
            success: true,
            complaints
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

exports.updateComplaintStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const complaintId = req.params.id;

        const allowedStatus = ["pending", "in-progress", "resolved"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(

            complaintId,

            {
                status
            },

            {
                new: true
            }

        );

        if (!updatedComplaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Complaint status updated successfully",
            updatedComplaint
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};

exports.deleteComplaint = async (req, res) => {

    try {

        const complaintId = req.params.id;

        const deletedComplaint = await Complaint.findByIdAndDelete(complaintId);

        if (!deletedComplaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Complaint deleted successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};
exports.getAllComplaints = async (req, res) => {

    try {

        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.category) {
    filter.category = req.query.category;
}
if (req.query.search) {
    filter.title = {
        $regex: req.query.search,
        $options: "i"
    };
}
        const complaints = await Complaint.find(filter)
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            complaints
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};
