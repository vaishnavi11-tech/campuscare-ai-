const Complaint = require("../models/Complaint");

const findSimilarComplaints = async (
  embedding,
  category
) => {

 
 
  // Convert everything to numbers
  const cleanEmbedding =
    embedding.map(Number);

  const results =
    await Complaint.aggregate([
      {
        $vectorSearch: {
          index:
            "complaint_vector_index",

          path:
            "embedding",

          queryVector:
            cleanEmbedding,

          numCandidates: 50,

          limit: 5,

          filter: {
            category:
              category,
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          status: 1,
          score: {
            $meta:
              "vectorSearchScore",
          },
        },
      },
    ]);
    console.log(
  "Similar Results:",
  results
);

  return results;
};

module.exports = {
  findSimilarComplaints,
};