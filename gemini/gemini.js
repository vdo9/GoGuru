const { GoogleGenerativeAI } = require("@google/generative-ai");
const yelp = require('yelp-fusion');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyB2yWLGO5XJE5LUWKzZ-dy_jwJGZEv-Idc");
console.log(process.env.API_KEY);

// Yelp Fusion API Key
const yelpApiKey = '63HuIzzyvwA1T-9FY7YHWzhG2RtQNwOaUDKU5Jqx9YPKiEaSEINm_oXYq-ymc3jSP2z2288cnfJAGXSmr6TudlZCLr8j5RQGFrkKswfOvT_wZE7kiQkNBrVWAoojZnYx';

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

  // Generate Yelp query
  const yelpSearchRequest = {
    term: selectedFoodOptions.join(', '),
    location: userLocation,
    categories: userPreferences.join(', ')
  };

  // Create a Yelp Fusion client
  const client = yelp.client(yelpApiKey);

  // Perform the Yelp search
  client.search(yelpSearchRequest).then(response => {
    const results = response.jsonBody.businesses;
    console.log("Yelp Search Results:");
    results.forEach((business, index) => {
      console.log(`${index + 1}. ${business.name}`);
      console.log(`   Rating: ${business.rating}`);
      console.log(`   Address: ${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`);
      console.log(`   Phone: ${business.phone}`);
      console.log(`   URL: ${business.url}`);
      console.log('');
    });
  }).catch(e => {
    console.log("Error performing Yelp search:", e);
  });
}

run();