// SuitsScreen.js
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const suits = [
  {
    id: 1,
    name: 'Classic Black Suit',
    price: 299,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/pp1.jpg'),
  },
  {
    id: 2,
    name: 'Slim Fit Navy Suit',
    price: 349,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/pp2.jpg'),
  },
  {
    id: 3,
    name: 'Modern Grey Suit',
    price: 399,
    sizes: ['S', 'L'],
    image: require('../assets/images/pp3.jpg'),
  },
  {
    id: 4,
    name: 'Executive Charcoal Suit',
    price: 449,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/pp4.jpg'),
  },
  {
    id: 5,
    name: 'Business Professional Suit',
    price: 379,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/pp5.jpg'),
  },
  {
    id: 6,
    name: 'Formal Evening Suit',
    price: 529,
    sizes: ['M', 'L'],
    image: require('../assets/images/pp6.jpg'),
  },
  {
    id: 7,
    name: 'Contemporary Fit Suit',
    price: 329,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/pp7.jpg'),
  },
  {
    id: 8,
    name: 'Wedding Special Suit',
    price: 599,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/pp8.jpg'),
  },
  {
    id: 9,
    name: 'Casual Business Suit',
    price: 289,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/pp9.jpg'),
  },
  {
    id: 10,
    name: 'Premium Tailored Suit',
    price: 649,
    sizes: ['M', 'L'],
    image: require('../assets/images/pp10.jpg'),
  },
  {
    id: 11,
    name: 'Classic Three-Piece Suit',
    price: 459,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/pp11.jpg'),
  },
  {
    id: 12,
    name: 'Modern Slim Cut Suit',
    price: 389,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/pp12.jpg'),
  },
];

export default function SuitsScreen({ navigation, route }) {
  const { viewOnly } = route.params || {};
const renderItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={item.image} style={styles.image} />
    <Text style={styles.name}>{item.name}</Text>
    <Text style={styles.price}>${item.price}</Text>

      <View style={styles.buttonRow}>
        {viewOnly ? (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductDetailScreen', { product: item, category: 'suit' })}
            style={styles.detailsButtonFull}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => navigation.navigate('CustomizeSuitScreen', { suit: item })}
            style={styles.customizeButtonFull}
          >
            <Text style={styles.buttonText}>Customize</Text>
          </TouchableOpacity>
        )}
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
detailsButtonFull: {
  width: '100%',
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
customizeButtonFull: {
  width: '100%',
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
