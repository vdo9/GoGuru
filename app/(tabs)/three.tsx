import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const Three = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorite Foods/Drinks:</Text>
      <TextInput style={styles.input} placeholder="Korean" />
      <TextInput style={styles.input} placeholder="Sandwiches" />
      <TextInput style={styles.input} placeholder="Grilled" />
      <TextInput style={styles.input} placeholder="Fastfood" />
      <TextInput style={styles.input} placeholder="Healthy" />
      <TextInput style={styles.input} placeholder="Vegetarian" />
      <TextInput style={styles.input} placeholder="Alcohol" />

      <Text style={styles.heading}>Favorite Activities:</Text>
      <TextInput style={styles.input} placeholder="Movies" />
      <TextInput style={styles.input} placeholder="Golf" />
      <TextInput style={styles.input} placeholder="Sightseeing" />
      <TextInput style={styles.input} placeholder="Hiking" />
      <TextInput style={styles.input} placeholder="Arcade" />
      <TextInput style={styles.input} placeholder="Board Games" />
      <TextInput style={styles.input} placeholder="Shopping" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
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
});

export default Three;