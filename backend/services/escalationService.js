const Complaint = require("../models/Complaint");

const checkEscalation = async () => {

  const complaints =
    await Complaint.find({
      status: {
        $ne: "resolved",
      },
    });

  const now = new Date();

  for (const complaint of complaints) {

    const lastActivity =
      new Date(
        complaint.lastActivityAt
      );

    const diffDays =
      (now - lastActivity) /
      (1000 * 60 * 60 * 24);

    const priority =
      complaint.aiResult?.priority
        ?.toLowerCase();

    let limit = 7;

    if (priority === "high")
      limit = 1;

    if (priority === "medium")
      limit = 3;

    if (priority === "low")
      limit = 7;

    const shouldEscalate =
      diffDays >= limit;

    await Complaint.updateOne(
      { _id: complaint._id },
      {
        $set: {
          escalated:
            shouldEscalate,
        },
      }
    );

  }

};

module.exports = {
  checkEscalation,
};