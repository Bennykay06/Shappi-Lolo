import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Alert, ScrollView } from 'react-native';
import { useCart } from '../Contexts/CartContext';
import { Ionicons } from '@expo/vector-icons';

export default function ShirtDetailScreen({ route, navigation }) {
  const { shirt } = route.params;
  const [selectedSize, setSelectedSize] = useState(shirt?.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const item = {
      id: shirt.id,
      name: shirt.name,
      price: shirt.price,
      selectedSize,
      quantity,
      image: shirt.image,
    };
    addToCart(item);
    Alert.alert('Added to Cart', `${shirt.name} (x${quantity}) added successfully.`);
    navigation.navigate('MainTabs', { screen: 'CartTab' });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#000" />
      </TouchableOpacity>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{shirt.name}</Text>

        <Image
          source={typeof shirt.image === 'number' ? shirt.image : { uri: shirt.image }}
          style={styles.image}
        />

        <Text style={styles.label}>Price: ${shirt.price}</Text>

        <Text style={styles.label}>Select Size:</Text>
        <View style={styles.sizeRow}>
          {shirt.sizes?.map((size) => (
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
                  styles.sizeButtonText,
                  selectedSize === size && styles.selectedSizeButtonText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.qtyRow}>
          <Button title="-" onPress={() => setQuantity((q) => (q > 1 ? q - 1 : 1))} />
          <Text style={styles.qtyText}>{quantity}</Text>
          <Button title="+" onPress={() => setQuantity((q) => q + 1)} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    elevation: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 50,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
  },
  sizeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 10,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#6200ee',
  },
  sizeButtonText: {
    fontSize: 14,
    color: '#000',
  },
  selectedSizeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    gap: 20,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
