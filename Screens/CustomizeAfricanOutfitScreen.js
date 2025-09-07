import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../Context/CartContext';

const sizes = [
  { id: 1, name: 'XS', measurements: '32-34"' },
  { id: 2, name: 'S', measurements: '34-36"' },
  { id: 3, name: 'M', measurements: '36-38"' },
  { id: 4, name: 'L', measurements: '38-40"' },
  { id: 5, name: 'XL', measurements: '40-42"' },
  { id: 6, name: 'XXL', measurements: '42-44"' }
];

const customizationOptions = [
  {
    id: 1,
    name: 'Sleeve Length',
    options: [
      { id: 1, name: 'Short Sleeve', price: 0 },
      { id: 2, name: 'Long Sleeve', price: 5 },
      { id: 3, name: '3/4 Sleeve', price: 3 }
    ]
  },
  {
    id: 2,
    name: 'Neckline',
    options: [
      { id: 1, name: 'Round Neck', price: 0 },
      { id: 2, name: 'V-Neck', price: 2 },
      { id: 3, name: 'Boat Neck', price: 3 },
      { id: 4, name: 'High Neck', price: 4 }
    ]
  },
  {
    id: 3,
    name: 'Fit',
    options: [
      { id: 1, name: 'Regular Fit', price: 0 },
      { id: 2, name: 'Slim Fit', price: 5 },
      { id: 3, name: 'Loose Fit', price: 0 }
    ]
  },
  {
    id: 4,
    name: 'Length',
    options: [
      { id: 1, name: 'Standard', price: 0 },
      { id: 2, name: 'Long', price: 8 },
      { id: 3, name: 'Short', price: -3 }
    ]
  }
];

const CustomizeAfricanOutfitScreen = ({ navigation, route }) => {
  const { material, style } = route?.params || {};
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [customizations, setCustomizations] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const handleCustomizationSelect = (categoryId, option) => {
    setCustomizations(prev => ({
      ...prev,
      [categoryId]: option
    }));
  };

  const calculateTotalPrice = () => {
    let basePrice = material?.price || 50;
    let stylePrice = style?.price || 0;
    let customizationPrice = 0;
    
    Object.values(customizations).forEach(option => {
      customizationPrice += option.price || 0;
    });
    
    return basePrice + stylePrice + customizationPrice + 20; // Base tailoring fee
  };

  const hasSelections = () => {
    return isAddedToCart;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Size Required', 'Please select a size');
      return;
    }

    const cartItem = {
      id: `custom_${Date.now()}`,
      name: `Custom ${style?.name || 'African Outfit'}`,
      price: calculateTotalPrice(),
      image: material?.image,
      quantity: 1,
      type: 'custom-african',
      customizations: {
        material: material?.name,
        style: style?.name,
        size: selectedSize?.name,
        ...customizations
      }
    };

    addToCart(cartItem);
    setIsAddedToCart(true);
    Alert.alert(
      'Added to Cart',
      'Your custom African outfit has been added to cart!',
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => navigation.navigate('MainTabs', { screen: 'CartTab' }) }
      ]
    );
  };

  if (!material || !style) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Missing selection data</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customize Your Outfit</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Selected Items Summary */}
        <View style={styles.summaryCard}>
          <Image source={material.image} style={styles.materialImage} />
          <View style={styles.summaryInfo}>
            <Text style={styles.materialName}>{material.name}</Text>
            <Text style={styles.styleName}>Style: {style.name}</Text>
            <Text style={styles.basePrice}>${material.price.toFixed(2)} + ${style.price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizesGrid}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size.id}
                style={[
                  styles.sizeCard,
                  selectedSize?.id === size.id && styles.selectedSizeCard
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeName,
                  selectedSize?.id === size.id && styles.selectedSizeText
                ]}>
                  {size.name}
                </Text>
                <Text style={[
                  styles.sizeMeasurements,
                  selectedSize?.id === size.id && styles.selectedSizeText
                ]}>
                  {size.measurements}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Customization Options */}
        {customizationOptions.map((category) => (
          <View key={category.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.name}</Text>
            <View style={styles.optionsGrid}>
              {category.options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionCard,
                    customizations[category.id]?.id === option.id && styles.selectedOptionCard
                  ]}
                  onPress={() => handleCustomizationSelect(category.id, option)}
                >
                  <Text style={[
                    styles.optionName,
                    customizations[category.id]?.id === option.id && styles.selectedOptionText
                  ]}>
                    {option.name}
                  </Text>
                  <Text style={[
                    styles.optionPrice,
                    customizations[category.id]?.id === option.id && styles.selectedOptionText
                  ]}>
                    {option.price === 0 ? 'Free' : `$${option.price}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Price Summary */}
        <View style={styles.priceCard}>
          <Text style={styles.priceTitle}>Price Breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Base Material</Text>
            <Text style={styles.priceValue}>${material.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Style</Text>
            <Text style={styles.priceValue}>${style.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tailoring Fee</Text>
            <Text style={styles.priceValue}>$20.00</Text>
          </View>
          {Object.values(customizations).map((option, index) => (
            option.price !== 0 && (
              <View key={index} style={styles.priceRow}>
                <Text style={styles.priceLabel}>{option.name}</Text>
                <Text style={styles.priceValue}>${option.price.toFixed(2)}</Text>
              </View>
            )
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${calculateTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            hasSelections() ? styles.addToCartButtonSelected : styles.addToCartButtonDefault
          ]} 
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text style={styles.addToCartText}>Add to Cart - ${calculateTotalPrice().toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  materialImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  summaryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  materialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  styleName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  basePrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sizesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sizeCard: {
    width: '30%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedSizeCard: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  sizeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sizeMeasurements: {
    fontSize: 12,
    color: '#666',
  },
  selectedSizeText: {
    color: '#fff',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOptionCard: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  optionPrice: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  selectedOptionText: {
    color: '#fff',
  },
  priceCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addToCartButtonDefault: {
    backgroundColor: '#007AFF',
  },
  addToCartButtonSelected: {
    backgroundColor: '#4CAF50',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  goBackText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CustomizeAfricanOutfitScreen;