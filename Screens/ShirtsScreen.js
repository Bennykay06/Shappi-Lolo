// screens/ShirtsScreen.js
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

const shirts = [
  {
    id: '1',
    name: 'White Formal Shirt',
    price: 45,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/men shirt.jpg'),
  },
  {
    id: '2',
    name: 'Blue Casual Shirt',
    price: 35,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/men shirt.jpg'),
  },
  {
    id: '3',
    name: 'Striped Office Shirt',
    price: 55,
    sizes: ['M', 'L'],
    image: require('../assets/images/men shirt.jpg'),
  },
  {
    id: '4',
    name: 'Slim Fit Black Shirt',
    price: 50,
    sizes: ['S', 'M'],
    image: require('../assets/images/men shirt.jpg'),
  },
];

export default function ShirtsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ShirtDetailScreen', { shirt: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Back Button + Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shirts</Text>
      </View>

      <FlatList
        data={shirts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
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
    fontWeight: 'bold',
  },
  listContent: {
    padding: 10,
  },
  card: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  price: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
