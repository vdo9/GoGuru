import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from 'react-native';

import Card from '../../components/Card';
import HeaderSection from '@/components/HeaderSection';


const DATA = [
  { id: '1', title: 'Picnic Date Idea', subtitle: 'Filled with a nice park and cute cafes to visit nearby!', thumbnailUrl: require('../../assets/images/picnic.jpg') },
  { id: '2', title: 'Skylars Best Night Ever', subtitle: 'Expect to eat, eat, and eat!' , thumbnailUrl: require('../../assets/images/picnic.jpg')},
  { id: '3', title: 'Scavenger Hunt Adventure', subtitle: 'Hidden treasures at each location!' , thumbnailUrl: require('../../assets/images/picnic.jpg')},
  { id: '4', title: 'Coffee Friends', subtitle: 'Guiding you through the best coffee spots in town ;)' , thumbnailUrl: require('../../assets/images/picnic.jpg')},
  { id: '5', title: 'Where should we go?', subtitle: 'Click the plan to see! Not clickbait.' , thumbnailUrl: require('../../assets/images/picnic.jpg')},
  { id: '6', title: 'Study Date <3', subtitle: 'Looking for a good study date? I got you!' , thumbnailUrl: require('../../assets/images/picnic.jpg')},
  { id: '7', title: 'Soul Searching in LA', subtitle: 'This plan takes you to the best spots in DTLA!! Live like a local.' , thumbnailUrl: require('../../assets/images/picnic.jpg')},

  // ... add more items as needed
];

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  // const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState<{ id: string; title: string; subtitle: string; thumbnailUrl: string } | null>(null);

  // const [modalVisible, setModalVisible] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  
  const renderItem = ({ item }: { item: { id: string, title: string, subtitle: string, thumbnailUrl: string } }) => (
    <Card
      item={item}
      thumbnailUrl={item.thumbnailUrl}
      onPress={() => {
        setSelectedItem(item);
        modalizeRef.current?.open();
      }}
    />
  );

  const filteredData = DATA.filter((item, index) => {
    if (searchInput === '91732') {
      return index % 2 == 0 && index > 3;
    } else if (searchInput.toLowerCase() === 'los angeles') {
      return true;
    } else {
      return item;
    }
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
  
      <HeaderSection title="Community Plans"/>
        {/* <Text style={styles.headerText}>Community Plans</Text> */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter city or zipcode"
            placeholderTextColor="#999999"
            onChangeText={text => setSearchInput(text)}
            value={searchInput}
          />
        </View>
    
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ ...styles.listContentContainer }} // Add paddingRight here
        />
      <Modalize ref={modalizeRef} modalHeight={620} modalStyle={styles.modalContent}>
        <Text style={styles.modalHeader}>{selectedItem?.title}</Text>
        <Text style={styles.modalText}>{selectedItem?.subtitle}</Text>
      </Modalize>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: Dimensions.get('window').width - 40, // Adjust the subtraction value as needed
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    color: 'black',
    paddingLeft: 10
  },
  listContentContainer: {
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
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
});

export default App;
