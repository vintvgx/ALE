/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const OpenAI = require("openai");
const { stock_blog_post_prompt } = require("./prompts");

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateStockBlogPost = functions.https.onCall(
  async (data, context) => {
    try {
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: stock_blog_post_prompt,
        max_tokens: 1000,
        temperature: 0.7,
      });
      console.log("OpenAI response:", response.data.choices[0].text);
      return { content: response.data.choices[0].text };
    } catch (error) {
      console.error("OpenAI error:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to generate blog post",
        error.message
      );
    }
  }
);
