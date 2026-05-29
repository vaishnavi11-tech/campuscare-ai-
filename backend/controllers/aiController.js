const { analyzeComplaint } = require("../services/aiService");

const analyzeComplaintController = async (req, res) => {

  try {

    const { title, description } = req.body;

    const result = await analyzeComplaint(title, description);

    const cleanedResult = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(cleanedResult));

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI analysis failed",
    });
  }
};

module.exports = { analyzeComplaintController };