import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, StatusBar, FlatList, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Card from '../../components/Card';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';




const DATA = [
  { id: '1', title: 'Picnic Date Idea', subtitle: 'Filled with a nice park and cute cafes to visit nearby!' },
  { id: '2', title: 'Skylars Best Night Ever', subtitle: 'Expect to eat, eat, and eat!' },
  { id: '3', title: 'Scavenger Hunt Adventure', subtitle: 'Hidden treasures at each location!' },


  // ... add more items as needed
];

const { push } = useRouter();


const planner = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const modalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();


  const renderItem = ({ item }: { item: { id: string, title: string, subtitle: string } }) => (
    <Card
      item={item}
      onPress={() => {
        setSelectedItem(item);
        modalizeRef.current?.open();
      }}
    />
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>My Plans</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Modalize ref={modalizeRef} modalHeight={500}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedItem?.title}</Text>
            <Text style={styles.modalText}>{selectedItem?.subtitle}</Text>
          </View>
        </Modalize>
        <TouchableOpacity style={styles.addButton} onPress={() => push('../PlanDetailsScreen')}>
          <Text>Add Plan</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ddd',
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    width: '80%',
  },
  modalContent: {
    padding: 15,
  },
  modalText: {
    fontSize: 16,
  },
});

export default planner; 
// for some reason export default makes it go back to the bottom nav