import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const three = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Image source={require('../../assets/images/profile.png')} />
      <Text style={styles.name}>Skylar Smith</Text>
      <Text style={styles.role}>Software Engineer</Text>
      <TouchableOpacity style={styles.saveButton} onPress={() => console.log('Save Pressed')}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Assuming the background is black
  },
  header: {
    fontSize: 24,
    color: '#FFF',
    position: 'absolute',
    top: 60,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Make it half of width and height to create a circle
    borderColor: 'orange', // Assuming the border color should match the button
    borderWidth: 4,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  role: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 24,
  },
  saveButton: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'orange',
    // Shadow styles
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default three;
