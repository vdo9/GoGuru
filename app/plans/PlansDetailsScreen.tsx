import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';


const PlanDetailsScreen = () => {
    const [planName, setPlanName] = useState('');
  
    return (
      <View style={styles.container}>
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