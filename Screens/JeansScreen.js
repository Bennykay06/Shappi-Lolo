import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../Context/CartContext';

const jeans = [
  {
    id: 1,
    name: 'Classic Blue Jeans',
    price: 65,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'),
  },
  {
    id: 2,
    name: 'Slim Fit Black Jeans',
    price: 70,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'),
  },
  {
    id: 3,
    name: 'Straight Cut Jeans',
    price: 68,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'),
  },
  {
    id: 4,
    name: 'Skinny Fit Jeans',
    price: 75,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'),
  },
  {
    id: 5,
    name: 'Relaxed Fit Jeans',
    price: 72,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/jeans.jpg'),
  },
];

export default function JeansScreen({ navigation, route }) {
  const { viewOnly } = route.params || {};
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleAddToCart = (item) => {
    const selectedSize = selectedSizes[item.id] || item.sizes[0];
    
    const cartItem = {
      id: `jeans-${item.id}`,
      name: item.name,
      price: item.price,
      image: item.image,
      selectedSize: selectedSize,
      quantity: 1,
      category: 'jeans',
    };

    addToCart(cartItem);
    Alert.alert(
      'Added to Cart',
      `${item.name} (${selectedSize}) has been added to your cart!`,
      [{ text: 'OK' }]
    );
  };

  const handleSizeSelect = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size
    }));
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      
      <View style={styles.sizesContainer}>
        <Text style={styles.sizesLabel}>Size:</Text>
        <View style={styles.sizesRow}>
          {item.sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSizes[item.id] === size && styles.selectedSizeButton
              ]}
              onPress={() => handleSizeSelect(item.id, size)}
            >
              <Text style={[
                styles.sizeText,
                selectedSizes[item.id] === size && styles.selectedSizeText
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.buttonRow}>
        {viewOnly ? (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductDetailScreen', { product: item, category: 'jeans' })}
            style={styles.detailsButtonFull}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => navigation.navigate('CustomizeJeansScreen', { item, category: 'jeans' })}
            style={styles.customizeButtonFull}
          >
            <Text style={styles.buttonText}>Customize</Text>
          </TouchableOpacity>
        )}
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
        <Text style={styles.headerTitle}>Custom Jeans</Text>
      </View>

      <FlatList
        data={jeans}
        keyExtractor={(item) => item.id.toString()}
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
  sizesContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  sizesLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedSizeButton: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
  },
});