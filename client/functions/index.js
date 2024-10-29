/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const stock_blog_post_prompt = `Generate a detailed blog post in JSON format that captures the essence of the latest developments in the stock market. The blog post should include:

Title: Craft a catchy title that encapsulates the essence of the current stock market trends, focusing on significant uptrends and potential growth areas that might not yet be in the mainstream spotlight.
Introduction: Provide a brief overview of the current state of the stock market, highlighting key performance indicators such as the S&P 500, Dow Jones, and Nasdaq indexes. Mention any overarching trends affecting the market, such as economic policies, global events, or technological advancements.
Main Content:
Key Performers: Identify stocks or sectors experiencing significant uptrends, with a brief analysis of what's driving their performance.
Silent Horses: Spotlight emerging opportunities or undervalued sectors that have the potential for growth but are currently under the radar. Explain why these opportunities are promising based on market data, expert opinions, or industry trends.
Expert Insights: Incorporate opinions or quotes from financial experts or analysts on the current market trends and future outlook. This could include insights from recent earnings calls, financial reports, or market analysis articles.
Visual Elements: Suggest including visual elements such as charts or graphs that illustrate the trends discussed. Provide URLs to high-quality, relevant images or suggest creating custom graphics that represent the data effectively.
Conclusion: Summarize the key points discussed, offering a forward-looking perspective on the stock market. Provide actionable insights or recommendations for investors based on the analysis presented in the content.
References: List sources of information, expert opinions, or data used to compile the blog post. Ensure credibility and reliability by citing reputable financial news outlets, market analysis reports, or official company documents.
The output should be structured as a JSON object, including 'title', 'content', and 'references' keys, ensuring the information is comprehensive yet concise, and tailored for an audience interested in stock market investments and trends.`;

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub();

const functions = require("firebase-functions");
const gcloud_functions = require("@google-cloud/functions-framework");
const OpenAI = require("openai");
// const { stock_blog_post_prompt } = require("./prompts");
require("dotenv").config();

const openai = new OpenAI({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

// Specify the topic you want to publish to
const resultTopic = pubSubClient.topic("return_publish_stock_post");

exports.generateGCLOUDStockBlogPost = (message, context) => {
  const messages = [{ role: "system", content: stock_blog_post_prompt }];

  console.log(messages);

  openai.chat.completions
    .create({
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 2000,
      temperature: 0.7,
    })
    .then((response) => {
      const openaiText = response.choices[0].message;
      console.log("OpenAI response:", openaiText);

      // Publish the response to another topic
      const messageBuffer = Buffer.from(JSON.stringify({ text: openaiText }));
      return resultTopic.publish(messageBuffer);
    })
    .then((messageId) => {
      console.log(`Message ${messageId} published.`);
    })
    .catch((error) => {
      console.error("Failed to process or publish message:", error);
      // Handle errors, possibly retry or log
    });
};
