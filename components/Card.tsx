import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';

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
    flex: 1,
    width: Dimensions.get('window').width - 50,
    height: 124,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#424242',
    borderRadius: 14,
    marginVertical: 8,
    padding: 16,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#d0d0d0',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold', 
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default Card;