import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ghanaianWear = [
  {
    id: '1',
    name: 'Kaba and Slit',
    price: 129.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual kaba and slit image
    description: 'Traditional Ghanaian women\'s outfit with fitted blouse and wrap skirt'
  },
  {
    id: '2',
    name: 'Smock (Fugu)',
    price: 89.99,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual smock image
    description: 'Traditional Northern Ghanaian shirt with embroidered neckline'
  },
  {
    id: '3',
    name: 'Kente Grand Boubou',
    price: 199.99,
    sizes: ['L', 'XL', 'XXL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual kente boubou image
    description: 'Elegant flowing robe made from authentic Ghanaian Kente cloth'
  },
  {
    id: '4',
    name: 'Batakari Shirt',
    price: 75.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual batakari image
    description: 'Traditional Ghanaian cotton shirt with ethnic patterns'
  },
  {
    id: '5',
    name: 'Dansinkran Dress',
    price: 149.99,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual dansinkran image
    description: 'Traditional Ghanaian dance dress with colorful Kente accents'
  },
  {
    id: '6',
    name: 'Agbada (Ghanaian Style)',
    price: 179.99,
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: require('../assets/images/jeans.jpg'), // Replace with actual ghanaian agbada image
    description: 'Flowing robe with traditional Ghanaian embroidery and Kente trim'
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