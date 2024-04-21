import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
// import { runGeminiQuery } from './gemini';

const Gemini = () => {
  const [userQuery, setUserQuery] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [response, setResponse] = useState('');

  const handleUserQuerySubmit = async () => {
    try {
      // const result = await runGeminiQuery(userQuery, userLocation);
      // setResponse(result);
      console.log('User Query:', userQuery);
      console.log('User Location:', userLocation);
      setResponse('This is a placeholder response. Gemini integration is currently commented out.');
    } catch (error) {
      console.error('Error running Gemini query:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your query"
        value={userQuery}
        onChangeText={setUserQuery}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your location (zip code or city)"
        value={userLocation}
        onChangeText={setUserLocation}
      />
      <Button title="Submit Query" onPress={handleUserQuerySubmit} />
      <Text style={styles.response}>{response}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  response: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Gemini;