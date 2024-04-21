import { View, Text, TextInput, TouchableOpacity, Button, FlatList } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';


const PlanDetailsScreen = () => {
    const [planName, setPlanName] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = (message) => {
      setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }]);
      // Add your code to send the message to the chatbot and get the response
      // Then add the chatbot's response to the messages state
    };
  
    return (
      <View style={styles.container}>
        <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
        <TextInput
          placeholder="What's the name of your plan?"
          placeholderTextColor="lightgrey"
          value={planName}
          onChangeText={setPlanName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.circleButton} onPress={() => {/* Code to open chat screen */}}>
          <Text>Chat</Text>
        </TouchableOpacity>
        {/* Your event component goes here, duplicate as needed for initial events */}
        <Button title="Add Event" onPress={() => {/* Code to add an event */}} />
      </View>
    );
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#ddd',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        maxWidth: '80%',
        flexWrap: 'wrap',
      },
      botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ddd',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        maxWidth: '80%',
        flexWrap: 'wrap',
      },
    circleButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        margin: 10,
        width: '80%',
      },
});

export default PlanDetailsScreen;