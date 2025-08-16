// SuitsScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const suits = [
  {
    id: 1,
    name: 'Classic Black Suit',
    price: 299,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/suits.jpg'),
  },
  {
    id: 2,
    name: 'Slim Fit Navy Suit',
    price: 349,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/suits.jpg'),
  },
  {
    id: 3,
    name: 'Modern Grey Suit',
    price: 399,
    sizes: ['S', 'L'],
    image: require('../assets/images/suits.jpg'),
  },
];

export default function SuitsScreen({ navigation }) {
const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>${item.price}</Text>

    <View style={styles.buttonRow}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('SuitDetail', { suit: item })}
        style={styles.detailsButton}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('CustomizeSuit', { suit: item })}
        style={styles.customizeButton}
      >
        <Text style={styles.buttonText}>Customize</Text>
      </TouchableOpacity>
    </View>
  </View>
);


  return (
    <View style={{ flex: 1 }}>
      {/* Custom Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suits</Text>
      </View>

      {/* List of Suits */}
      <FlatList
        data={suits}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 400,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  },
  price: {
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  paddingBottom: 10,
  gap: 10,
},
detailsButton: {
  flex: 1,
  backgroundColor: '#6200ee',
  padding: 10,
  borderRadius: 6,
  alignItems: 'center',
},
customizeButton: {
  flex: 1,
  backgroundColor: '#03dac6',
  padding: 10,
  borderRadius: 6,
  alignItems: 'center',
},
buttonText: {
  color: '#fff',
  fontWeight: '600',
},

});
