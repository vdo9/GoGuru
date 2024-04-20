const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyB2yWLGO5XJE5LUWKzZ-dy_jwJGZEv-Idc");
console.log(process.env.API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const userQuery = "hello, i am trying to make plans with friends to go get coffee and i am looking to get some food afterwards";
  const prompt = `Given this user's query: "${userQuery}", can you generate a list of variables for the user to choose from describing food options? Please format your response as a JSON array of strings.`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = (await response.text()).replace(/`|\n|json/g, '');
  console.log("User Query:", userQuery);
  console.log("Generated Food Options:");
  console.log(text);

  // Parse the response to extract the food options
  
  const foodOptions = JSON.parse(text);

  // User selection (static implementation for demonstration purposes)
  const selectedFoodOptions = foodOptions.slice(0, 3); // Select the first 3 options
  const userPreferences = ["vegetarian", "healthy"];
  const userLocation = "San Francisco, CA";

  // Generate Yelp query prompt
  const yelpPrompt = `This user has selected the following food options: ${selectedFoodOptions.join(", ")}. They have the following preferences: ${userPreferences.join(", ")}. The user is located in ${userLocation}. Can you generate a Yelp search query to find relevant restaurants?`;

  // Generate Yelp query
  const yelpResult = await model.generateContent(yelpPrompt);
  const yelpResponse = await yelpResult.response;
  const yelpText = yelpResponse.text();
  console.log("Yelp Search Query:");
  console.log(yelpText);
}

run();