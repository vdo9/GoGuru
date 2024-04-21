// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const yelp = require('yelp-fusion');
// const { supabase } = require('../lib/supabase');

// const genAI = new GoogleGenerativeAI("AIzaSyDWfUMo8eA2wq1zVAjXVSbK8Suzj6gfn5k");
// const yelpApiKey = '63HuIzzyvwA1T-9FY7YHWzhG2RtQNwOaUDKU5Jqx9YPKiEaSEINm_oXYq-ymc3jSP2z2288cnfJAGXSmr6TudlZCLr8j5RQGFrkKswfOvT_wZE7kiQkNBrVWAoojZnYx';

// export const getUserPreferences = async (userId) => {
//   const { data, error } = await supabase
//     .from('userpref')
//     .select('food1, food2, food3, activity1, activity2, activity3')
//     .eq('userid', userId)
//     .single();

//   if (error) {
//     console.error('Error fetching user preferences:', error);
//     return [];
//   }

//   const userPreferences = [
//     data.food1,
//     data.food2,
//     data.food3,
//     data.activity1,
//     data.activity2,
//     data.activity3,
//   ];

//   return userPreferences.filter(Boolean);
// }

// export const runGeminiQuery = async (userQuery, userLocation) => {
//   try {
//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//       throw new Error('No authenticated user found');
//     }

//     const userPreferences = await getUserPreferences(user.id);

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = `Given this user's query: "${userQuery}", can you generate a list of variables for the user to choose from describing food options? Please format your response as a JSON array of strings.`;
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = (await response.text()).replace(/`|\n|json/g, '');
//     console.log("User Query:", userQuery);
//     console.log("Generated Food Options:");
//     console.log(text);

//     const foodOptions = JSON.parse(text);
//     const selectedFoodOptions = foodOptions.slice(0, 3); // Select the first 3 options

//     const yelpSearchRequest = {
//       term: selectedFoodOptions.join(', '),
//       location: userLocation,
//       categories: userPreferences.join(', ')
//     };

//     const client = yelp.client(yelpApiKey);
//     const yelpResponse = await client.search(yelpSearchRequest);
//     const results = yelpResponse.jsonBody.businesses;
//     let responseText = "Yelp Search Results:\n\n";
//     results.forEach((business, index) => {
//       responseText += `${index + 1}. ${business.name}\n`;
//       responseText += ` Rating: ${business.rating}\n`;
//       responseText += ` Address: ${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}\n`;
//       responseText += ` Phone: ${business.phone}\n`;
//       responseText += ` URL: ${business.url}\n\n`;
//     });
//     return responseText;
//   } catch (error) {
//     console.error("Error running Gemini query:", error);
//     throw error;
//   }
// };

//the code above is what was supposed to work with gemini, to test gemini, comment the bottom and uncomment the top (mine broke)
//this is the static code you can see the results after doing node gemini.js make sure you are in the current directory

const { GoogleGenerativeAI } = require("@google/generative-ai");
const yelp = require('yelp-fusion');

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBRC3yn6ACehAJATvNNXYHXmNVEesBjtn0");
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
  const userPreferences = ["vegetarian", "healthy", "grilled", "american",""];
  const userLocation = "San Francisco, CA";

  // Generate Yelp query
  const yelpSearchRequest = {
    term: selectedFoodOptions.join(', '),
    location: userLocation,
    categories: userPreferences.join(', ')
  };

  // Create a Yelp Fusion client
  const client = yelp.client(yelpApiKey);

  // Perform the Yelp searchf
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
