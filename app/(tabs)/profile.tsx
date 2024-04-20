import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const profile = () => {

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      {/* <Image
        source={require('./path/to/default-profile-image.jpg')} // Use a default image path here
        style={styles.profileImage}
      /> */}

      {/* Bio */}
      <Text style={styles.sectionTitle}>Bio</Text>
      <Text style={styles.bioText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>

      {/* Preferences */}
      <Text style={styles.sectionTitle}>Preferences</Text>
      {/* Add preference options here */}

      {/* Button to Edit Profile */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default profile;