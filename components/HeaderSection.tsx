import { withLayoutContext } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderSection = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HeaderSection;