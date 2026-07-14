const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// =====================================
// Generate Semantic Embedding
// =====================================

const generateEmbedding = async (
  text
) => {

  try {

    const response =
      await cohere.embed({
        texts: [text],
        model: "embed-english-v3.0",
        inputType:
          "search_document",
        embeddingTypes: [
          "float",
        ],
      });

    return response
      .embeddings
      .float[0];

  } catch (error) {

    console.error(
      "Embedding Generation Error:",
      error
    );

    throw error;

  }

};

module.exports = {
  generateEmbedding,
};