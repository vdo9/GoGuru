// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function TabOneScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="app/(tabs)/index.tsx" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';

const DATA = [
  { id: '1', title: 'Picnic Date Idea', subtitle: 'Filled with a nice park and cute cafes to visit nearby!' },
  { id: '2', title: 'Skylars Best Night Ever', subtitle: 'Expect to eat, eat, and eat!' },
  { id: '3', title: 'Scavenger Hunt Adventure', subtitle: 'Hidden treasures at each location!' },
  { id: '4', title: 'Coffee Friends', subtitle: 'Guiding you through the best coffee spots in town ;)' },
  { id: '5', title: 'Where should we go?', subtitle: 'Click the plan to see! Not clickbait.' },
  { id: '6', title: 'Study Date <3', subtitle: 'Looking for a good study date? I got you!' },
  { id: '7', title: 'Soul Searching in LA', subtitle: 'This plan takes you to the best spots in DTLA!! Live like a local.' },

  // ... add more items as needed
];

const Item = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <View style={styles.item}>
    <View style={styles.thumbnail} />
    <View style={styles.itemContent}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  
  const renderItem = ({ item }: { item: { title: string, subtitle: string } }) => (
    <Item title={item.title} subtitle={item.subtitle} />
  );

  const filteredData = DATA.filter((item, index) => {
    if (searchInput === '91732') {
      return index < 3;
    } else if (searchInput.toLowerCase() === 'los angeles') {
      return true;
    } else {
      return false;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Community Plans</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter city or zipcode"
            placeholderTextColor="#999999"
            onChangeText={text => setSearchInput(text)}
            value={searchInput}
          />
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    paddingVertical: 20,
    paddingLeft: 20,
    alignItems: 'flex-start',
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  listContentContainer: {
    paddingHorizontal: 16,
  },
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFA500',
  },
  footerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
});

export default App;
