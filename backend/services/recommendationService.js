const {
  getCandidatePool,
  getSubExpertisePool,
} = require("../engines/candidatePool");

const {
  findSimilarComplaints,
} = require("./similarityService");

const {
  rankByWorkload,
} = require("./workloadService");

const {
  getResolverHistory,
} = require("./resolverHistoryService");

// =====================================
// Staff Recommendation Engine
// =====================================

async function recommendStaff(
  complaint,
  student
) {

  // =====================================
  // Step 1: Build Candidate Pool
  // =====================================

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

  // =====================================
  // Step 2: Direct Authority Routing
  // =====================================

  if (
    complaint.aiResult.category ===
      "Safety & Security" ||
    complaint.aiResult.category ===
      "Student Welfare"
  ) {

    return {
      recommendation:
        candidatePool[0] || null,
      reason:
        "Direct authority routing",
    };

  }

  // =====================================
  // Step 3: Filter by Sub-Expertise
  // =====================================

  const subExpertisePool =
    getSubExpertisePool(
      candidatePool,
      complaint.aiResult.subCategory
    );

  const searchPool =
    subExpertisePool.length > 0
      ? subExpertisePool
      : candidatePool;

  // =====================================
  // Step 4: Retrieve Similar Complaints
  // =====================================

  const similarComplaints =
    await findSimilarComplaints(
      complaint.embedding,
      complaint.aiResult.category
    );

  // =====================================
  // Step 5: Resolver History
  // =====================================

  const resolverHistory =
    await getResolverHistory(
      similarComplaints
    );

  const eligibleResolvers =
    resolverHistory.filter(
      (resolver) =>
        searchPool.some(
          (staff) =>
            staff._id.toString() ===
            resolver.staff._id.toString()
        )
    );

  // =====================================
  // Step 6: Workload Ranking
  // =====================================

  const workloadPool =
    await rankByWorkload(
      searchPool
    );

  const workloadMap =
    new Map();

  for (const staff of workloadPool) {

    workloadMap.set(
      staff._id.toString(),
      staff.workload
    );

  }

  // =====================================
  // Step 7: Final Recommendation Score
  // =====================================

  const finalRanking =
    searchPool
      .map((staff) => {

        const resolver =
          eligibleResolvers.find(
            (history) =>
              history.staff._id.toString() ===
              staff._id.toString()
          );

        const resolvedCount =
          resolver
            ? resolver.resolvedCount
            : 0;

        const workload =
          workloadMap.get(
            staff._id.toString()
          ) || 0;

        return {
          staff,
          resolvedCount,
          workload,

          score:
            resolvedCount * 5 -
            workload * 2,
        };

      })
      .sort(
        (a, b) =>
          b.score - a.score
      );

  return {
    recommendation:
      finalRanking[0].staff,

    reason:
      finalRanking[0]
        .resolvedCount > 0
        ? "Resolved similar complaints with balanced workload"
        : "Category pool match (lowest workload)",
  };

}

module.exports = {
  recommendStaff,
};