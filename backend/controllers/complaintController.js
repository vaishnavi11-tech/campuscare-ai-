const Complaint = require("../models/Complaint");
const Student = require("../models/Student");
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

        
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 5;
const skip = (page - 1) * limit;

const complaints = await Complaint.find({ student: req.user.id })
    .populate("student", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

const total = await Complaint.countDocuments({ student: req.user.id });

return res.status(200).json({
    success: true,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
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
        const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 5;

const skip = (page - 1) * limit;

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
.populate("assignedTo", "name email")
.sort({ createdAt: -1 })
.skip(skip)
.limit(limit);
     const total = await Complaint.countDocuments(filter);

return res.status(200).json({
    success: true,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    count: complaints.length,
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

           exports.assignComplaint = async (req, res) => {

    try {

        const complaintId = req.params.id;

        const { assignedTo } = req.body;

        // Find complaint
        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        // Find staff
        const staff = await Student.findById(assignedTo);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found"
            });
        }

        // Check category match
        if (
    complaint.category.trim().toLowerCase() !==
    staff.category.trim().toLowerCase()
) {
            return res.status(400).json({
                success: false,
                message: "Staff category does not match complaint category"
            });
        }

        // Assign complaint
        const updatedComplaint = await Complaint.findByIdAndUpdate(

            complaintId,

            {
                assignedTo
            },

            {
                new: true
            }

        )
        .populate("student", "name email")
        .populate("assignedTo", "name email role category");

        return res.status(200).json({
            success: true,
            message: "Complaint assigned successfully",
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
       

exports.getComplaintStats = async (req, res) => {

    try {
const stats = await Complaint.aggregate([
    {
        $facet: {
            total: [{ $count: "count" }],
            pending: [{ $match: { status: "pending" } }, { $count: "count" }],
            inProgress: [{ $match: { status: "in-progress" } }, { $count: "count" }],
            resolved: [{ $match: { status: "resolved" } }, { $count: "count" }]
        }
    }
]);

return res.status(200).json({
    success: true,
    stats: {
        total: stats[0].total[0]?.count || 0,
        pending: stats[0].pending[0]?.count || 0,
        inProgress: stats[0].inProgress[0]?.count || 0,
        resolved: stats[0].resolved[0]?.count || 0
    }
});

        return res.status(200).json({
            success: true,
            stats: {
                total,
                pending,
                inProgress,
                resolved
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};
exports.getMyStats = async (req, res) => {

    try {

        const studentId = req.user.id;

        const total = await Complaint.countDocuments({
            student: studentId
        });

        const pending = await Complaint.countDocuments({
            student: studentId,
            status: "pending"
        });

        const inProgress = await Complaint.countDocuments({
            student: studentId,
            status: "in-progress"
        });

        const resolved = await Complaint.countDocuments({
            student: studentId,
            status: "resolved"
        });

        return res.status(200).json({
            success: true,
            stats: {
                total,
                pending,
                inProgress,
                resolved
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};
exports.getAssignedStats = async (req, res) => {

    try {

        const staffId = req.user.id;

        const total = await Complaint.countDocuments({
            assignedTo: staffId
        });

        const pending = await Complaint.countDocuments({
            assignedTo: staffId,
            status: "pending"
        });

        const inProgress = await Complaint.countDocuments({
            assignedTo: staffId,
            status: "in-progress"
        });

        const resolved = await Complaint.countDocuments({
            assignedTo: staffId,
            status: "resolved"
        });

        return res.status(200).json({
            success: true,
            stats: {
                total,
                pending,
                inProgress,
                resolved
            }
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }

};