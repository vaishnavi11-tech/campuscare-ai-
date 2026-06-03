const Complaint = require("../models/Complaint");

const recommendFromSimilarComplaints =
  async (complaintId) => {

    const complaint =
      await Complaint.findById(
        complaintId
      )
      .populate(
        "similarComplaints"
      );

    if (
      !complaint ||
      complaint.similarComplaints.length === 0
    ) {
      return null;
    }

    const facultyCount = {};

    for (
      const similar of
      complaint.similarComplaints
    ) {

      if (
        !similar.assignedTo
      ) {
        continue;
      }

      const facultyId =
        similar.assignedTo.toString();

      facultyCount[
        facultyId
      ] =
        (facultyCount[
          facultyId
        ] || 0) + 1;

    }

    let bestFaculty = null;
    let maxCount = 0;

    for (
      const facultyId
      in facultyCount
    ) {

      if (
        facultyCount[
          facultyId
        ] > maxCount
      ) {

        maxCount =
          facultyCount[
            facultyId
          ];

        bestFaculty =
          facultyId;

      }

    }

    return {
      facultyId:
        bestFaculty,
      similarResolved:
        maxCount,
    };

};

module.exports = {
  recommendFromSimilarComplaints,
};