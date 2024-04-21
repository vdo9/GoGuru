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
        <StatusBar barStyle="light-content" />
        <Text style={styles.header}>My Plans</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Modalize ref={modalizeRef} modalHeight={620} modalStyle={styles.modalContent}>
        <Text style={styles.modalHeader}>{selectedItem?.title}</Text>
        <Text style={styles.modalText}>{selectedItem?.subtitle}</Text>
        </Modalize>
        <TouchableOpacity
            onPress={() => {push('../plans/PlansDetailsScreen');}}
            style={styles.signin}
          >
            <View>
              <Text style={{ color: 'white', textAlign: 'center' }}>Add Plan</Text>
            </View>
          </TouchableOpacity>
        {/* <TouchableOpacity style={styles.addButton} onPress={() => push('../plans/PlansDetailsScreen')}>
          <Text>Add Plan</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
   
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  addButton: {
    paddingHorizontal: 40,
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
    backgroundColor: '#424242',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
  },
  signin: {
    marginTop: 18,
    marginBottom: 12,
    display: 'flex',
    width: 326,
    padding: 15,
    alignItems: 'center',
    padding: 20,
    gap: 5,
    borderRadius: 14,
    backgroundColor: '#F76800',
  },
});

export default planner; 
// for some reason export default makes it go back to the bottom nav
