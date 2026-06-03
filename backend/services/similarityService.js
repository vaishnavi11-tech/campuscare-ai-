const Complaint = require("../models/Complaint");
const { askGroq } = require("./aiService");

const findSimilarComplaints = async (
  currentSummary,
  currentCategory
) => {

  const complaints =
    await Complaint.find({
      "aiResult.category":
        currentCategory,
    });

  const similarIds = [];

  for (const complaint of complaints) {

    if (
      !complaint.aiResult?.summary
    ) {
      continue;
    }

    const prompt = `
Compare these two complaint summaries.

Summary 1:
${currentSummary}

Summary 2:
${complaint.aiResult.summary}

Are they describing the same underlying issue?

Answer ONLY:
similar
or
not similar
`;

    const response =
      await askGroq(prompt);

    if (
      response
        .toLowerCase()
        .includes("similar")
    ) {

      similarIds.push(
        complaint._id
      );

    }

    if (
      similarIds.length >= 3
    ) {
      break;
    }

  }

  return similarIds;

};

module.exports = {
  findSimilarComplaints,
};