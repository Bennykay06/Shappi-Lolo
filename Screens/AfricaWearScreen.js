import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ghanaianWear = [
  {
    id: '1',
    name: 'Traditional Kente Suit',
    price: 189.99,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: require('../assets/images/a1.jpg'),
    description: 'Elegant three-piece suit made from authentic Kente fabric'
  },
  {
    id: '2',
    name: 'Dashiki Shirt',
    price: 69.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/a2.jpg'),
    description: 'Classic African print shirt with traditional Dashiki design'
  },
  {
    id: '3',
    name: 'Agbada Robe',
    price: 159.99,
    sizes: ['L', 'XL', 'XXL'],
    image: require('../assets/images/a3.jpg'),
    description: 'Flowing traditional West African ceremonial robe'
  },
  {
    id: '4',
    name: 'Batakari Traditional Shirt',
    price: 79.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/a4.jpg'),
    description: 'Northern Ghanaian cotton shirt with ethnic embroidery'
  },
  {
    id: '5',
    name: 'Smock (Fugu)',
    price: 89.99,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: require('../assets/images/a5.jpg'),
    description: 'Traditional Northern Ghanaian shirt with embroidered neckline'
  },
  {
    id: '6',
    name: 'Kente Kaftan',
    price: 129.99,
    sizes: ['L', 'XL', 'XXL'],
    image: require('../assets/images/a6.jpg'),
    description: 'Comfortable loose-fitting robe with Kente patterns'
  },
  {
    id: '7',
    name: 'African Print Blazer',
    price: 149.99,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/a7.jpg'),
    description: 'Modern blazer with traditional African print fabric'
  },
  {
    id: '8',
    name: 'Ceremonial Robe',
    price: 219.99,
    sizes: ['L', 'XL', 'XXL'],
    image: require('../assets/images/a8.jpg'),
    description: 'Luxurious ceremonial robe for special occasions'
  },
  {
    id: '9',
    name: 'Traditional Vest',
    price: 59.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/a9.jpg'),
    description: 'Sleeveless traditional African vest with ethnic patterns'
  },
  {
    id: '10',
    name: 'Embroidered Tunic',
    price: 99.99,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/a10.jpg'),
    description: 'Hand-embroidered traditional tunic with intricate designs'
  },
  {
    id: '11',
    name: 'Kente Stole Set',
    price: 169.99,
    sizes: ['One Size'],
    image: require('../assets/images/a11.jpg'),
    description: 'Traditional Kente stole with matching accessories'
  },
  {
    id: '12',
    name: 'African Print Shirt',
    price: 64.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/a12.jpg'),
    description: 'Modern African-inspired shirt with vibrant prints'
  }
];

const AfricaWearScreen = ({ navigation, route }) => {
  const { viewOnly } = route.params || {};
  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.sizes}>Sizes: {item.sizes.join(', ')}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductDetailScreen', { product: item, category: 'africa-wear' })}
            style={styles.detailsButtonFull}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>African Wear</Text>
      </View>

      <FlatList
        data={ghanaianWear}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
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
    padding: 16,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sizes: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  detailsButtonFull: {
    width: '100%',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AfricaWearScreen;