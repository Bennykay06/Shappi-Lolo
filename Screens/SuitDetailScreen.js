import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { useCart } from '../Contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function SuitDetailScreen({ route, navigation }) {
  const { suit } = route.params || {};

  useEffect(() => {
    console.log('Suit received in detail screen:', suit);
  }, [suit]);

  if (!suit) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Suit details not found.</Text>
      </View>
    );
  }

  const [selectedSize, setSelectedSize] = useState(suit?.sizes?.[0] || 'Default');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      id: suit.id,
      name: suit.name,
      price: suit.price,
      selectedSize,
      quantity,
      image: suit.image,
    };

    addToCart(item);
    Alert.alert('Added to Cart', `${suit.name} (x${quantity}) added successfully.`);
    navigation.navigate('MainTabs', { screen: 'CartTab' });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suit Detail</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>{suit.name}</Text>

        {/* Suit Image */}
        {suit.image && (
          <Image
            source={typeof suit.image === 'string' ? { uri: suit.image } : suit.image}
            style={styles.image}
          />
        )}

        <Text style={styles.label}>Price: ${suit.price}</Text>
        <Text style={styles.label}>Available Sizes:</Text>

        {/* Size Selector */}
        <View style={styles.sizeRow}>
          {suit.sizes?.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedSizeText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity Control */}
        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.qtyRow}>
          <Button title="−" onPress={() => setQuantity((q) => Math.max(1, q - 1))} />
          <Text style={styles.qtyText}>{quantity}</Text>
          <Button title="+" onPress={() => setQuantity((q) => q + 1)} />
        </View>

        {/* Add to Cart */}
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    resizeMode: 'cover',
    marginTop: 10,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 5,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
  },
  selectedSizeButton: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  sizeText: {
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    gap: 20,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
