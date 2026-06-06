const Complaint = require("../models/Complaint");
const User = require("../models/User");
const { analyzeComplaint } = require("../services/aiService");
const { checkEscalation,} = require( "../services/escalationService");
const { findSimilarComplaints } =require("../services/similarityService");
exports.createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    // Create complaint first
    const complaint = await Complaint.create({
      title,
      description,
      student: req.user.id,
    });

    try {
      // Run AI Analysis
      const result = await analyzeComplaint(
        title,
        description
      );

      const cleanedResult = result
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedResult = JSON.parse(cleanedResult);
console.log("PARSED AI RESULT:", parsedResult);
      // Store AI Result
 const similarComplaints =
  await findSimilarComplaints(
    parsedResult.summary,
    parsedResult.category
  );

complaint.aiResult = {
  category: parsedResult.category,
  subCategory: parsedResult.subCategory,
  location: parsedResult.location,
  priority: parsedResult.priority.toLowerCase(),
  summary: parsedResult.summary,
  suggestedResolution:
    parsedResult.suggestedResolution,
};

complaint.similarComplaints =
  similarComplaints;
complaint.category = parsedResult.category;
      await complaint.save();

    } catch (aiError) {
      console.log("AI Analysis Error:", aiError);
      // Complaint is still created even if AI fails
    }

    return res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      complaint,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
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
                status,
                 lastActivityAt: new Date()
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
await checkEscalation();
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
.populate(
  "student",
  "name email gender department"
)
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

        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });
        }

        const faculty = await User.findById(assignedTo);

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found"
            });
        }

        if (faculty.role !== "faculty") {
            return res.status(400).json({
                success: false,
                message: "User is not faculty"
            });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            complaintId,
            {
  assignedTo,
  lastActivityAt: new Date()
},
            {
                new: true
            }
        )
        .populate("student", "name email")
        .populate("assignedTo", "name email role department");

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

exports.recommendStaff = async (req, res) => {

try {

const { complaintId } = req.params;

const complaint =
  await Complaint.findById(
    complaintId
  ).populate(
    "similarComplaints",
    "assignedTo status"
  );

if (!complaint) {
  return res.status(404).json({
    success: false,
    message: "Complaint not found",
  });
}

const student =
  await User.findById(
    complaint.student
  );

const category =
  complaint.aiResult?.category;

let facultyList = [];

/* =========================
   BUILD CANDIDATE POOL
========================= */

if (
  category ===
  "Safety & Security"
) {

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "Safety & Security",
  });

}

else if (
  category ===
  "Student Welfare"
) {

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "Student Welfare",
  });

}

else if (
  category ===
  "Library Services"
) {

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "Library Services",
  });

}

else if (
  category ===
  "Administration"
) {

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "Administration",
  });

}

else if (
  category ===
  "Academic Affairs"
) {

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "Academic Affairs",
    department:
      student.department,
  });

}

else if (
  category ===
  "Hostel & Accommodation"
) {

  const wing =
    student.gender === "male"
      ? "boys"
      : "girls";

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "Hostel & Accommodation",
    hostelWing: wing,
  });

}

else if (
  category ===
  "IT Services"
) {

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "IT Services",
  });

}

else if (
  category ===
  "Campus Facilities"
) {

  facultyList = await User.find({
    role: "faculty",
    expertise:
      "Campus Facilities",
  });

}

/* =========================
   DIRECT ROUTING
========================= */

if (
  category ===
    "Safety & Security" ||
  category ===
    "Student Welfare" ||
  category ===
    "Library Services" ||
  category ===
    "Administration"
) {

  return res.status(200).json({
    success: true,
    mode: "direct-routing",
    recommended:
      facultyList[0] || null,
    allStaff:
      facultyList,
  });

}

/* =========================
   SIMILARITY ROUTING
========================= */

 const resolvedSimilar =
  complaint.similarComplaints.find(
    (c) =>
      c.assignedTo &&
      c.status === "resolved"
  );

if (resolvedSimilar) {

  const faculty =
    await User.findById(
      resolvedSimilar.assignedTo
    );

  if (faculty) {

    const isEligible =
      facultyList.some(
        (f) =>
          f._id.toString() ===
          faculty._id.toString()
      );

    if (isEligible) {

      return res.status(200).json({
        success: true,
        mode: "similarity",
        reason:
          "Successfully resolved a similar complaint",
        recommended: {
          faculty,
        },
      });

    }

  }

}
  

const activeSimilar =
  complaint.similarComplaints.find(
    (c) =>
      c.assignedTo &&
      c.status ===
        "in-progress"
  );

if (activeSimilar) {

  const faculty =
    await User.findById(
      activeSimilar.assignedTo
    );

  if (faculty) {

    const isEligible =
      facultyList.some(
        (f) =>
          f._id.toString() ===
          faculty._id.toString()
      );

    if (isEligible) {

      return res.status(200).json({
        success: true,
        mode: "similarity",
        reason:
          "Currently handling a similar complaint",
        recommended: {
          faculty,
        },
      });

    }

  }

}


/* =========================const
   WORKLOAD FALLBACK
========================= */

const staffWithWorkload =
  [];

for (const faculty of facultyList) {

  const workload =
    await Complaint.countDocuments({
      assignedTo:
        faculty._id,
      status: {
        $ne: "resolved",
      },
    });

  staffWithWorkload.push({
    faculty,
    workload,
  });

}

staffWithWorkload.sort(
  (a, b) =>
    a.workload -
    b.workload
);

return res.status(200).json({
  success: true,
  mode: "workload",
  recommended:
    staffWithWorkload[0] ||
    null,
  allStaff:
    staffWithWorkload,
});

} catch (error) {

console.log(error);

return res.status(500).json({
  success: false,
  message:
    "Server Error",
});


}

};

    
           
       
          
         
     
       
exports.addNote = async (req, res) => {

    try {

        const { id } = req.params;

        const { text } = req.body;

        const complaint =
            await Complaint.findById(id);

        if (!complaint) {

            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });

        }
        console.log(req.body);
console.log(text);

        complaint.notes.push({
            text
        });
        complaint.lastActivityAt = new Date();

        await complaint.save();

        return res.status(200).json({
            success: true,
            message: "Note added successfully",
            notes: complaint.notes
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
exports.getComplaintById = async (req, res) => {

  try {

    const complaint = await Complaint.findById(
      req.params.id
    )
      .populate("student", "name email")
    .populate("assignedTo", "name email")
.populate(
  "similarComplaints",
  "title assignedTo status"
)

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    return res.status(200).json({
      success: true,
      complaint,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
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
exports.getAssignedComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find({
      assignedTo: req.user.id,
    })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      complaints,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};