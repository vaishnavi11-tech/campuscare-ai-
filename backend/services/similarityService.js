const Complaint = require("../models/Complaint");

// =====================================
// Similarity Search Service
// =====================================

const findSimilarComplaints = async (
  embedding,
  category
) => {

  // Ensure the embedding contains numeric values
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

  return results;

};

module.exports = {
  findSimilarComplaints,
};