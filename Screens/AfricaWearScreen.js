import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const africaWear = [
  {
    id: '1',
    name: 'Traditional Dashiki',
    price: 89.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual dashiki image
  },
  {
    id: '2',
    name: 'Ankara Print Shirt',
    price: 75.99,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual ankara image
  },
  {
    id: '3',
    name: 'Kente Cloth Vest',
    price: 125.99,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual kente image
  },
  {
    id: '4',
    name: 'Agbada Robe',
    price: 199.99,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual agbada image
  },
  {
    id: '5',
    name: 'Boubou Grand Robe',
    price: 179.99,
    sizes: ['L', 'XL', 'XXL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual boubou image
  },
  {
    id: '6',
    name: 'Kitenge Shirt',
    price: 69.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual kitenge image
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
          {viewOnly ? (
            <TouchableOpacity 
              onPress={() => navigation.navigate('ProductDetailScreen', { product: item, category: 'africa-wear' })}
              style={styles.detailsButtonFull}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={() => navigation.navigate('CustomizeAfricaWearScreen', { item, category: 'africa-wear' })}
              style={styles.customizeButtonFull}
            >
              <Text style={styles.buttonText}>Customize</Text>
            </TouchableOpacity>
          )}
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
        data={africaWear}
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

export default AfricaWearScreen;