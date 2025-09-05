import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../Context/CartContext';

// Sample data for each category - you can move this to a separate data file
const categoryData = {
  'SUITS': [
    {
      id: 1,
      name: 'Classic Black Suit',
      price: 299,
      sizes: ['S', 'M', 'L'],
      image: require('../assets/images/suits.jpg'),
      category: 'SUITS'
    },
    {
      id: 2,
      name: 'Slim Fit Navy Suit',
      price: 349,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/suits.jpg'),
      category: 'SUITS'
    },
    {
      id: 3,
      name: 'Modern Grey Suit',
      price: 399,
      sizes: ['S', 'L'],
      image: require('../assets/images/suits.jpg'),
      category: 'SUITS'
    },
  ],
  'SHIRTS': [
    {
      id: 1,
      name: 'White Formal Shirt',
      price: 45,
      sizes: ['S', 'M', 'L'],
      image: require('../assets/images/men shirt.jpg'),
      category: 'SHIRTS'
    },
    {
      id: 2,
      name: 'Blue Casual Shirt',
      price: 35,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/men shirt.jpg'),
      category: 'SHIRTS'
    },
    {
      id: 3,
      name: 'Striped Office Shirt',
      price: 55,
      sizes: ['M', 'L'],
      image: require('../assets/images/men shirt.jpg'),
      category: 'SHIRTS'
    },
    {
      id: 4,
      name: 'Slim Fit Black Shirt',
      price: 50,
      sizes: ['S', 'M'],
      image: require('../assets/images/men shirt.jpg'),
      category: 'SHIRTS'
    },
  ],
  'BLAZERS': [
    {
      id: 1,
      name: 'Premium Navy Blazer',
      price: 199.99,
      sizes: ['S', 'M', 'L'],
      image: require('../assets/images/blazzers.webp'),
      category: 'BLAZERS'
    },
    {
      id: 2,
      name: 'Classic Black Blazer',
      price: 179.99,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/blazzers.webp'),
      category: 'BLAZERS'
    },
    {
      id: 3,
      name: 'Casual Brown Blazer',
      price: 159.99,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/blazzers.webp'),
      category: 'BLAZERS'
    },
  ],
  'DRESS PANTS': [
    {
      id: 1,
      name: 'Classic Black Dress Pants',
      price: 89,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/dress pant.webp'),
      category: 'DRESS PANTS'
    },
    {
      id: 2,
      name: 'Navy Blue Dress Pants',
      price: 95,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/dress pant.webp'),
      category: 'DRESS PANTS'
    },
    {
      id: 3,
      name: 'Charcoal Grey Dress Pants',
      price: 92,
      sizes: ['S', 'M', 'L'],
      image: require('../assets/images/dress pant.webp'),
      category: 'DRESS PANTS'
    },
  ],
  'LONG SLEEVES': [
    {
      id: 1,
      name: 'Cotton Long Sleeve Tee',
      price: 35,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/long sleeve tee.jpg'),
      category: 'LONG SLEEVES'
    },
    {
      id: 2,
      name: 'Premium Long Sleeve Tee',
      price: 45,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/long sleeve tee.jpg'),
      category: 'LONG SLEEVES'
    },
  ],
  'SHORT SLEEVES': [
    {
      id: 1,
      name: 'Basic Short Sleeve Tee',
      price: 25,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/short sleeve.png'),
      category: 'SHORT SLEEVES'
    },
    {
      id: 2,
      name: 'Premium Short Sleeve Tee',
      price: 35,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/short sleeve.png'),
      category: 'SHORT SLEEVES'
    },
  ],
  'T-SHIRTS': [
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      price: 22,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/Tee shirt.webp'),
      category: 'T-SHIRTS'
    },
    {
      id: 2,
      name: 'Premium T-Shirt',
      price: 32,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/Tee shirt.webp'),
      category: 'T-SHIRTS'
    },
  ],
  'LONG SLEEVE T-SHIRT': [
    {
      id: 1,
      name: 'Long Sleeve T-Shirt',
      price: 28,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/long sleeve tee.jpg'),
      category: 'LONG SLEEVE T-SHIRT'
    },
  ],
  'POLOS': [
    {
      id: 1,
      name: 'Classic Polo Shirt',
      price: 45,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/polo.webp'),
      category: 'POLOS'
    },
    {
      id: 2,
      name: 'Premium Polo Shirt',
      price: 55,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/polo.webp'),
      category: 'POLOS'
    },
  ],
  'LONG SLEEVE POLOS': [
    {
      id: 1,
      name: 'Long Sleeve Polo',
      price: 52,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/long sleeve polo.jpg'),
      category: 'LONG SLEEVE POLOS'
    },
  ],
  'JEANS': [
    {
      id: 1,
      name: 'Classic Blue Jeans',
      price: 65,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/jeans.jpg'),
      category: 'JEANS'
    },
    {
      id: 2,
      name: 'Slim Fit Black Jeans',
      price: 70,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/jeans.jpg'),
      category: 'JEANS'
    },
  ],
  'JEANS MEN': [
    {
      id: 1,
      name: 'Men\'s Classic Jeans',
      price: 68,
      sizes: ['S', 'M', 'L', 'XL'],
      image: require('../assets/images/jeans.jpg'),
      category: 'JEANS MEN'
    },
    {
      id: 2,
      name: 'Men\'s Skinny Jeans',
      price: 75,
      sizes: ['M', 'L', 'XL'],
      image: require('../assets/images/jeans.jpg'),
      category: 'JEANS MEN'
    },
  ],
};

export default function CategoryItemsScreen({ route, navigation }) {
  const { categoryName, viewOnly } = route.params;
  const items = categoryData[categoryName] || [];
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  // Categories that support customization
  const customizableCategories = ['SUITS', 'SHIRTS', 'BLAZERS', 'DRESS PANTS'];
  const isCustomizable = customizableCategories.includes(categoryName);

  // Map category names to route category params
  const getCategoryParam = (categoryName) => {
    switch(categoryName) {
      case 'SUITS': return 'suit';
      case 'SHIRTS': return 'shirt';
      case 'BLAZERS': return 'blazer';
      case 'DRESS PANTS': return 'dress pants';
      default: return 'suit';
    }
  };

  const handleAddToCart = (item) => {
    const selectedSize = selectedSizes[item.id] || item.sizes[0];
    
    const cartItem = {
      id: `${item.category}-${item.id}`,
      name: item.name,
      price: item.price,
      image: item.image,
      selectedSize: selectedSize,
      quantity: 1,
      category: item.category,
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
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        
        {/* Size Selection */}
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
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSizes[item.id] === size && styles.selectedSizeButtonText
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.buttonRow}>
          {viewOnly ? (
            <TouchableOpacity 
              style={styles.detailsButtonFull}
              onPress={() => navigation.navigate('ProductDetailScreen', { product: item })}
            >
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          ) : (
            <>
              {isCustomizable ? (
                <TouchableOpacity 
                  style={styles.customizeButtonFull}
                  onPress={() => {
                    if (categoryName === 'SHIRTS') {
                      navigation.navigate('CustomizeShirtScreen', { shirt: item });
                    } else {
                      navigation.navigate('CustomizeSuitScreen', { 
                        item, 
                        category: getCategoryParam(categoryName) 
                      });
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Customize</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={styles.addToCartButtonFull}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
      </View>

      {/* Items List */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => `${categoryName}-${item.id}`}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items available in this category</Text>
          <Text style={styles.emptySubtext}>Check back soon for new arrivals!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
  },
  sizesContainer: {
    marginBottom: 15,
  },
  sizesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedSizeButton: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedSizeButtonText: {
    color: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonFull: {
    width: '100%',
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#03dac6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  customizeButton: {
    flex: 1,
    backgroundColor: '#ff6b35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  customizeButtonFull: {
    width: '100%',
    backgroundColor: '#ff6b35',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonFull: {
    width: '100%',
    backgroundColor: '#03dac6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});