import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Card = ({ item, onPress }: { item: { title: string, subtitle: string }, onPress: () => void }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.thumbnail} />
    <View style={styles.itemContent}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#d0d0d0',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
  },
});

export default Card;