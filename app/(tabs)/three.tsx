import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const Three = () => {
  const [foodPrefs, setFoodPrefs] = useState(['', '', '']);
  const [activityPrefs, setActivityPrefs] = useState(['', '', '']);

  const handleFoodPrefChange = (index, value) => {
    const newFoodPrefs = [...foodPrefs];
    newFoodPrefs[index] = value;
    setFoodPrefs(newFoodPrefs);
  };

  const handleActivityPrefChange = (index, value) => {
    const newActivityPrefs = [...activityPrefs];
    newActivityPrefs[index] = value;
    setActivityPrefs(newActivityPrefs);
  };

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('userpref')
        .upsert({
          userid: user.id,
          food1: foodPrefs[0],
          food2: foodPrefs[1],
          food3: foodPrefs[2],
          activity1: activityPrefs[0],
          activity2: activityPrefs[1],
          activity3: activityPrefs[2],
        });

      if (error) {
        console.error('Error saving user preferences:', error);
      } else {
        console.log('User preferences saved successfully:', data);
      }
    } else {
      console.error('No authenticated user found');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorite Foods/Drinks:</Text>
      <TextInput
        style={styles.input}
        placeholder="Food 1"
        value={foodPrefs[0]}
        onChangeText={(text) => handleFoodPrefChange(0, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Food 2"
        value={foodPrefs[1]}
        onChangeText={(text) => handleFoodPrefChange(1, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Food 3"
        value={foodPrefs[2]}
        onChangeText={(text) => handleFoodPrefChange(2, text)}
      />

      <Text style={styles.heading}>Favorite Activities:</Text>
      <TextInput
        style={styles.input}
        placeholder="Activity 1"
        value={activityPrefs[0]}
        onChangeText={(text) => handleActivityPrefChange(0, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Activity 2"
        value={activityPrefs[1]}
        onChangeText={(text) => handleActivityPrefChange(1, text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Activity 3"
        value={activityPrefs[2]}
        onChangeText={(text) => handleActivityPrefChange(2, text)}
      />

      <Button title="Submit" onPress={handleSubmit} />
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