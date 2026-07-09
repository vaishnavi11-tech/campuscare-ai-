const Complaint = require("../models/Complaint");

const getResolverHistory = async (
  similarComplaints
) => {

  const resolverMap = {};

  const complaintIds =
    similarComplaints.map(
      (complaint) => complaint._id
    );

  const complaints =
    await Complaint.find({
      _id: {
        $in: complaintIds,
      },
    }).populate("assignedTo");

  for (const complaint of complaints) {

    if (!complaint.assignedTo) {
      continue;
    }

    const staffId =
    //to string because id is key of js object and that can be only string
      complaint.assignedTo._id.toString();

    if (!resolverMap[staffId]) {

      resolverMap[staffId] = {
        staff:
          complaint.assignedTo,

        resolvedCount: 0,

        activeCount: 0,
      };

    }

    if (
      complaint.status ===
      "resolved"
    ) {

      resolverMap[
        staffId
      ].resolvedCount++;

    }

    if (
      complaint.status ===
        "pending" ||
      complaint.status ===
        "in-progress"
    ) {

      resolverMap[
        staffId
      ].activeCount++;

    }

  }

  return Object.values(
    //array are easyto loop on
    resolverMap
  );

};

module.exports = {
  getResolverHistory,
};