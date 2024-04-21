// // 

// import { View, Text, TextInput, TouchableOpacity, Button, FlatList, Image } from 'react-native'
// import React, { useState, useEffect, useRef } from 'react'
// import { StyleSheet } from 'react-native';
// import { Icon } from 'react-native-elements';

// const PlanDetailsScreen = () => {
//   const [planName, setPlanName] = useState('');
//   const [messages, setMessages] = useState([{ id: '1', text: "So, what's the plan today?", sender: 'bot' }]);
//   const [input, setInput] = useState('');
//   const flatListRef = useRef<FlatList>(null);

//   useEffect(() => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToEnd();
//     }
//   }, [messages]);

//   const handleSend = () => {
//     const newMessage = { id: Date.now().toString(), text: input, sender: 'user' };
//     setInput('');

//     setTimeout(() => {
//       setMessages([...messages, newMessage]);
//     }, 500); // Delay of 500 milliseconds
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={item.sender === 'bot' ? styles.botMessage : styles.userMessage}>
//             {item.sender === 'bot' && <Image source={require('../../assets/images/logo2.png')} style={styles.botIcon} />}
//             <Text style={styles.bottext}>{item.text}</Text>
//           </View>
//         )}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           placeholder="Type a message..."
//           placeholderTextColor="grey"
//           value={input}
//           onChangeText={setInput}
//           style={styles.input}
//         />
//         <TouchableOpacity onPress={handleSend}>
//           <Icon name="forward" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFA500', // Set the background color to orange
//   },
//   botMessage: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#000000', // Set the bot messages background color to dark orange
//     borderRadius: 20,
//     margin: 15,
//     padding: 12,
//     alignSelf: 'flex-start', // Align bot messages to the left
//     maxWidth: '80%', // Limit width to 80% of the screen width
//     flexWrap: 'wrap', // Allow the text to wrap
//   },
//   userMessage: {
//     alignSelf: 'flex-end', // Align user messages to the right
//     backgroundColor: '#F76800', // Set the user messages background color to orange
//     borderRadius: 20,
//     margin: 10,
//     padding: 10,
//     maxWidth: '80%', // Limit width to 80% of the screen width
//     flexWrap: 'wrap', // Allow the text to wrap
//   },
//   botIcon: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   bottext: {
//     color: 'white'
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ddd',
//     borderRadius: 20,
//     margin: 10,
//     padding: 15, // Increase padding to make the box thicker
//     position: 'absolute', // Position the box absolutely
//     bottom: 30, // Position the box higher up from the bottom of the screen
//     left: 20, // Position the box 10 pixels from the left of the screen
//     right: 20, // Position the box 10 pixels from the right of the screen
//   },
//   input: {
//     flex: 1,
//     marginRight: 10,
//   },
// });

// export default PlanDetailsScreen;

// -----

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import * as GoogleGenerativeAI from '@google/generative-ai';


const PlanDetailsScreen = () => {
  const [messages, setMessages] = useState([{ id: '1', text: "So, what's the plan today?", sender: 'bot' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const API_KEY = 'AIzaSyDWfUMo8eA2wq1zVAjXVSbK8Suzj6gfn5k'
  // const API_KEY = process.env.API_KEY;
  const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    sendMessage('Hello!');
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setIsLoading(true);
    setError('');

    updateMessages(text, 'user');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(text);
      const response = await result.response;
      const aiText = response.text();

      updateMessages(aiText, 'bot');
    } catch (err) {
      setError('Failed to fetch response. Check your network and API configuration.');
      console.error('Error fetching response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessages = (text, sender) => {
    const newMessage = { id: Date.now().toString(), text, sender };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === 'bot' ? styles.botMessage : styles.userMessage}>
            {item.sender === 'bot' && <Image source={require('../../assets/images/logo2.png')} style={styles.botIcon} />}
            <Text style={styles.bottext}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="grey"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          editable={!isLoading}
        />
        <TouchableOpacity onPress={handleSend}>
          <Icon name="forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500', // Set the background color to orange
  },
  botMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000', // Set the bot messages background color to dark orange
    borderRadius: 20,
    margin: 15,
    padding: 12,
    alignSelf: 'flex-start', // Align bot messages to the left
    maxWidth: '80%', // Limit width to 80% of the screen width
    flexWrap: 'wrap', // Allow the text to wrap
  },
  userMessage: {
    flexShrink:1,
    alignSelf: 'flex-end', // Align user messages to the right
    backgroundColor: '#F76800', // Set the user messages background color to orange
    borderRadius: 20,
    margin: 10,
    padding: 10,
    maxWidth: '80%', // Limit width to 80% of the screen width
    flexWrap: 'wrap', // Allow the text to wrap
  },
  botIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  bottext: {
    color: 'white',
    flexShrink: 1
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 20,
    margin: 10,
    padding: 15, // Increase padding to make the box thicker
    position: 'absolute', // Position the box absolutely
    bottom: 30, // Position the box higher up from the bottom of the screen
    left: 20, // Position the box 10 pixels from the left of the screen
    right: 20, // Position the box 10 pixels from the right of the screen
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});

export default PlanDetailsScreen;