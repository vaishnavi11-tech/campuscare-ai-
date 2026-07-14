const { analyzeComplaint } = require("../services/aiService");

const analyzeComplaintController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const result = await analyzeComplaint(
      title,
      description
    );

    const cleanedResult = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedResult =
      JSON.parse(cleanedResult);

    return res.status(200).json(
      parsedResult
    );

  } catch (error) {

    console.error(
      "AI Analysis Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });

  }
};

module.exports = {
  analyzeComplaintController,
};