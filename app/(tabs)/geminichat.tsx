


// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import * as GoogleGenerativeAI from '@google/generative-ai';

// const GeminiChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const API_KEY = 'AIzaSyDWfUMo8eA2wq1zVAjXVSbK8Suzj6gfn5k';
//   const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);

//   useEffect(() => {
//     // Send a greeting message when the component mounts
//     sendMessage('Hello!');
//   }, []);

//   const sendMessage = async (text) => {
//     if (!text.trim()) return;
//     setIsLoading(true);
//     setError('');
    
//     // Add user message to the chat
//     updateMessages(text, true);

//     try {
//       // Get AI response using the generative model
//       const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//       const result = await model.generateContent(text);
//       const response = await result.response;
//       const aiText = response.text();

//       // Add AI response to the chat
//       updateMessages(aiText, false);
//     } catch (err) {
//       setError('Failed to fetch response. Check your network and API configuration.');
//       console.error('Error fetching response:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateMessages = (text, isUser) => {
//     setMessages(prevMessages => [...prevMessages, { text, isUser }]);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.chatArea}>
//         {messages.map((message, index) => (
//           <Text key={index} style={message.isUser ? styles.userMessage : styles.aiMessage}>
//             {message.text}
//           </Text>
//         ))}
//       </View>
//       <TextInput
//         placeholder='Type a message'
//         value={userInput}
//         onChangeText={setUserInput}
//         style={styles.input}
//         editable={!isLoading}
//       />
//       <Button
//         title={isLoading ? 'Loading...' : 'Send'}
//         onPress={() => {
//           sendMessage(userInput);
//           setUserInput('');
//         }}
//         color='blue'
//         disabled={isLoading}
//       />
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   chatArea: {
//     flex: 1,
//     width: '100%',
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '100%',
//     marginBottom: 10,
//   },
//   userMessage: {
//     textAlign: 'right',
//     color: 'blue',
//     margin: 5,
//   },
//   aiMessage: {
//     textAlign: 'left',
//     color: 'green',
//     margin: 5,
//   },
//   error: {
//     color: 'red',
//   }
// });

// export default GeminiChat;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import * as GoogleGenerativeAI from '@google/generative-ai';
import yelp from 'yelp-fusion';

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'AIzaSyDWfUMo8eA2wq1zVAjXVSbK8Suzj6gfn5k';
  const YELP_API_KEY = '63HuIzzyvwA1T-9FY7YHWzhG2RtQNwOaUDKU5Jqx9YPKiEaSEINm_oXYq-ymc3jSP2z2288cnfJAGXSmr6TudlZCLr8j5RQGFrkKswfOvT_wZE7kiQkNBrVWAoojZnYx';
  const yelpClient = yelp.client(YELP_API_KEY);
  const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    sendMessage('Hello!');
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError('');
    updateMessages(text, true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(text);
      const response = await result.response;
      const aiText = response.text();

      updateMessages(aiText, false);

      if (text.includes("find food")) {
        fetchYelpData(aiText);
      }
    } catch (err) {
      setError('Failed to fetch response. Check your network and API configuration.');
      console.error('Error fetching response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchYelpData = async (query) => {
    try {
      const searchRequest = {
        term: 'food',
        location: 'San Francisco, CA'
      };

      const yelpResponse = await yelpClient.search(searchRequest);
      const businesses = yelpResponse.jsonBody.businesses.map(business => ({
        name: business.name,
        rating: business.rating,
        address: business.location.address1,
      }));

      businesses.forEach(business => {
        updateMessages(`Found: ${business.name} with rating: ${business.rating}, Address: ${business.address}`, false);
      });
    } catch (err) {
      setError('Yelp search failed.');
      console.error('Yelp Error:', err);
    }
  };

  const updateMessages = (text, isUser) => {
    setMessages(prevMessages => [...prevMessages, { text, isUser }]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatArea}>
        {messages.map((message, index) => (
          <Text key={index} style={message.isUser ? styles.userMessage : styles.aiMessage}>
            {message.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        placeholder='Type a message'
        value={userInput}
        onChangeText={setUserInput}
        style={styles.input}
        editable={!isLoading}
      />
      <Button
        title={isLoading ? 'Loading...' : 'Send'}
        onPress={() => {
          sendMessage(userInput);
          setUserInput('');
        }}
        color='blue'
        disabled={isLoading}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chatArea: {
    flex: 1,
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  userMessage: {
    textAlign: 'right',
    color: 'blue',
    margin: 5,
  },
  aiMessage: {
    textAlign: 'left',
    color: 'green',
    margin: 5,
  },
  error: {
    color: 'red',
  }
});

export default GeminiChat;
