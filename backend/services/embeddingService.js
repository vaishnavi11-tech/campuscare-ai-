const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const generateEmbedding = async (text) => {
  try {

    const response =
      await cohere.embed({
        texts: [text],
        model: "embed-english-v3.0",
        inputType: "search_document",
        embeddingTypes: ["float"],
      });

    const embedding =
      response.embeddings.float[0];

    console.log(
      "Embedding Length:",
      embedding.length
    );

    console.log(
      "First Value:",
      embedding[0]
    );

    return embedding;

  } catch (error) {

    console.error(
      "Embedding Error:",
      error
    );

    throw error;

  }
};

module.exports = {
  generateEmbedding,
};