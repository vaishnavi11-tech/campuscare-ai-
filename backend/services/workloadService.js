const Complaint =
  require("../models/Complaint");

async function rankByWorkload(
  staffPool
) {

  const ranked =
    await Promise.all(
      //runs all async workload funct paralley and waits until all give the answer
      staffPool.map(
        async (staff) => {

          const workload =
            await Complaint.countDocuments({
              assignedTo: staff._id,
              status: {
                //not equal
                $ne: "resolved",
              },
            });

          return {
            //toObject converts monggose doc staff into js object
            //... is psread oprator that copies all contents from mongoose doc to js object and add workload
            ...staff.toObject(),
            workload,
          };

        }
      )
    );

  return ranked.sort(
    (a, b) =>
      a.workload - b.workload
  );

}

module.exports = {
  rankByWorkload,
};