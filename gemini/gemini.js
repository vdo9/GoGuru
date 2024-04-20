const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyB2yWLGO5XJE5LUWKzZ-dy_jwJGZEv-Idc");
console.log(process.env.API_KEY);
async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const userQuery = "hello, i am trying to make plans with friends to go get coffee and i am looking to get some food afterwards";

  const prompt = `Given this user's query: "${userQuery}", can you generate a list of variables for the user to choose from describing food options?`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log("User Query:", userQuery);
  console.log("Generated Food Options:");
  console.log(text);
}

run();