const {
  getCandidatePool,
  getSubExpertisePool,
} = require("../engines/candidatePool");

const {
  findSimilarComplaints,
} = require("./similarityService");
const {
  rankByWorkload,
} = require(
  "./workloadService"
);
const {
  getResolverHistory,
} = require("./resolverHistoryService");

async function recommendStaff(
  complaint,
  student
) {

  // STEP 1
  const candidatePool =
    await getCandidatePool(
      complaint,
      student
    );

  if (
    candidatePool.length === 0
  ) {

    return {
      recommendation: null,
      reason:
        "No eligible staff found",
    };

  }
  // DIRECT AUTHORITY ROUTING

if (
  complaint.aiResult.category === "Safety & Security" ||
  complaint.aiResult.category === "Student Welfare"
) {
  return {
    recommendation: candidatePool[0] || null,
    reason: "Direct authority routing",
  };
}

  // STEP 2
  const subExpertisePool =
    getSubExpertisePool(
      candidatePool,
      complaint.aiResult.subCategory
    );
    console.log(
  "SUBCATEGORY:",
  complaint.aiResult.subCategory
);

console.log(
  "SUB POOL:",
  subExpertisePool.map(
    (s) => ({
      name: s.name,
      subExpertise: s.subExpertise,
    })
  )
);

  // STEP 3
  const searchPool =
    subExpertisePool.length > 0
      ? subExpertisePool
      : candidatePool;

  // STEP 4
  const similarComplaints =
    await findSimilarComplaints(
      complaint.embedding,
      complaint.aiResult.category
    );

  // STEP 5
  const resolverHistory =
    await getResolverHistory(
      similarComplaints
    );

  // STEP 6
 const rankedResolvers =
  resolverHistory
    .map((resolver) => ({
      ...resolver,

      score:
        resolver.resolvedCount * 5 +
        resolver.activeCount * 2,
    }))
    .sort(
      (a, b) =>
        b.score - a.score
    );
    console.log(
  "SEARCH POOL:",
  searchPool.map((s) => ({
    name: s.name,
    subExpertise: s.subExpertise,
  }))
);

console.log(
  "RANKED RESOLVERS:",
  rankedResolvers.map((r) => ({
    name: r.staff.name,
    score: r.score,
  }))
);
  // STEP 7
 for (const resolver of rankedResolvers) {

  const match =
    searchPool.find(
      (staff) =>
        staff._id.toString() ===
        resolver.staff._id.toString()
    );

  if (match) {

    return {
      recommendation: match,

      reason:
        resolver.resolvedCount > 0
          ? "Resolved similar complaints"
          : "Handling similar complaints",
    };

  }

}

  // STEP 8
  if (
    subExpertisePool.length > 0
  ) {

    return {
      recommendation:
        subExpertisePool[0],

      reason:
        "Sub-expertise match",
    };

  }

  // STEP 9
 const rankedPool =
  await rankByWorkload(
    candidatePool
  );

return {
  recommendation:
    rankedPool[0],

  reason:
    "Category pool match (lowest workload)",
};

module.exports = {
  recommendStaff,
}}