import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const blazers = [
  {
    id: '1',
    name: 'Premium Navy Blazer',
    price: 199.99,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/blazzers.webp'),
  },
  {
    id: '2',
    name: 'Classic Black Blazer',
    price: 179.99,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/blazzers.webp'),
  },
  // Add more blazers as needed
];

const BlazersScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.sizes}>Sizes: {item.sizes.join(', ')}</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductDetailScreen', { item, category: 'blazer' })}
            style={styles.detailsButton}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('CustomizeSuitScreen', { item, category: 'blazer' })}
            style={styles.customizeButton}
          >
            <Text style={styles.buttonText}>Customize</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      <FlatList
        data={blazers}
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  listContent: {
    padding: 16,
    paddingTop: 80, // To make space for the back button
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
    height: 500,
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

export default BlazersScreen;
