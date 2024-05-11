// Load environment variables
require("dotenv").config();

// Access the environment variables
console.log("Testing environment variables...");
console.log(
  "OPENAI_API_KEY:",
  process.env.OPENAI_API_KEY ? "Available" : "Not available"
);
console.log(
  "OPENAI_ORG_ID:",
  process.env.OPENAI_ORG_ID ? "Available" : "Not available"
);

// Optionally, add more variables to test
