import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const africanMaterials = [
  {
    id: '1',
    name: 'Ankara Print',
    price: 25.99,
    description: 'Vibrant wax print cotton fabric',
    pattern: 'Geometric & Floral',
    origin: 'West Africa',
    image: require('../assets/images/jeans.jpg'), // Replace with ankara fabric image
    popular: true
  },
  {
    id: '2',
    name: 'Kente Cloth',
    price: 45.99,
    description: 'Traditional handwoven silk & cotton',
    pattern: 'Colorful Strips',
    origin: 'Ghana',
    image: require('../assets/images/jeans.jpg'), // Replace with kente fabric image
    popular: true
  },
  {
    id: '3',
    name: 'Dashiki Cotton',
    price: 19.99,
    description: 'Soft cotton with embroidered neckline',
    pattern: 'Traditional Dashiki',
    origin: 'West Africa',
    image: require('../assets/images/jeans.jpg'), // Replace with dashiki fabric image
  },
  {
    id: '4',
    name: 'Mudcloth (Bogolan)',
    price: 35.99,
    description: 'Hand-dyed cotton with natural pigments',
    pattern: 'Earth Tones',
    origin: 'Mali',
    image: require('../assets/images/jeans.jpg'), // Replace with mudcloth image
  },
  {
    id: '5',
    name: 'Kitenge Fabric',
    price: 22.99,
    description: 'Colorful cotton fabric with African motifs',
    pattern: 'Bold Prints',
    origin: 'East Africa',
    image: require('../assets/images/jeans.jpg'), // Replace with kitenge fabric image
  },
  {
    id: '6',
    name: 'Adinkra Cloth',
    price: 29.99,
    description: 'Symbolic cotton fabric with stamped designs',
    pattern: 'Adinkra Symbols',
    origin: 'Ghana',
    image: require('../assets/images/jeans.jpg'), // Replace with adinkra fabric image
  },
  {
    id: '7',
    name: 'Shweshwe Cotton',
    price: 24.99,
    description: 'Indigo-dyed cotton with geometric patterns',
    pattern: 'Geometric',
    origin: 'South Africa',
    image: require('../assets/images/jeans.jpg'), // Replace with shweshwe fabric image
  },
  {
    id: '8',
    name: 'Aso Oke Fabric',
    price: 39.99,
    description: 'Traditional handwoven Yoruba cloth',
    pattern: 'Striped Weave',
    origin: 'Nigeria',
    image: require('../assets/images/jeans.jpg'), // Replace with aso oke fabric image
  }
];

const africanStyles = [
  { id: 1, name: 'Dashiki Shirt', icon: 'shirt-outline' },
  { id: 2, name: 'Agbada Robe', icon: 'person-outline' },
  { id: 3, name: 'Boubou Dress', icon: 'person-outline' },
  { id: 4, name: 'Kaftan Top', icon: 'shirt-outline' },
  { id: 5, name: 'Wrapper Skirt', icon: 'person-outline' },
  { id: 6, name: 'African Suit', icon: 'business-outline' }
];

const ClothingStoreScreen = ({ navigation, route }) => {
  const { viewOnly } = route.params || {};
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
  };

  const handleProceedToCustomization = () => {
    if (!selectedMaterial || !selectedStyle) {
      alert('Please select both material and style');
      return;
    }
    
    navigation.navigate('CustomizeAfricanOutfitScreen', { 
      material: selectedMaterial, 
      style: selectedStyle,
      category: 'african-outfit'
    });
  };
  
  const renderMaterial = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.materialCard,
        selectedMaterial?.id === item.id && styles.selectedCard,
        item.popular && styles.popularCard
      ]}
      onPress={() => handleMaterialSelect(item)}
    >
      {item.popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>POPULAR</Text>
        </View>
      )}
      <Image source={item.image} style={styles.materialImage} />
      <View style={styles.materialInfo}>
        <Text style={styles.materialName}>{item.name}</Text>
        <Text style={styles.materialDescription}>{item.description}</Text>
        <View style={styles.materialDetails}>
          <Text style={styles.materialPattern}>Pattern: {item.pattern}</Text>
          <Text style={styles.materialOrigin}>Origin: {item.origin}</Text>
        </View>
        <Text style={styles.materialPrice}>${item.price.toFixed(2)} per yard</Text>
        {selectedMaterial?.id === item.id && (
          <View style={styles.selectedIndicator}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.selectedText}>Selected</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>African Fabric Store</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Materials Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Material</Text>
          <Text style={styles.sectionSubtitle}>Select from authentic African fabrics</Text>
          
          <FlatList
            data={africanMaterials}
            renderItem={renderMaterial}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.materialsContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>

        {/* Styles Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Style</Text>
          <Text style={styles.sectionSubtitle}>Select the outfit style you want</Text>
          
          <View style={styles.stylesGrid}>
            {africanStyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.styleCard,
                  selectedStyle?.id === style.id && styles.selectedStyleCard
                ]}
                onPress={() => handleStyleSelect(style)}
              >
                <Ionicons 
                  name={style.icon} 
                  size={32} 
                  color={selectedStyle?.id === style.id ? '#fff' : '#6200ee'} 
                />
                <Text style={[
                  styles.styleName,
                  selectedStyle?.id === style.id && styles.selectedStyleText
                ]}>
                  {style.name}
                </Text>
                {selectedStyle?.id === style.id && (
                  <Ionicons name="checkmark-circle" size={16} color="#fff" style={styles.styleCheckmark} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Summary and Action */}
        {(selectedMaterial || selectedStyle) && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Your Selection</Text>
            {selectedMaterial && (
              <Text style={styles.summaryItem}>Material: {selectedMaterial.name}</Text>
            )}
            {selectedStyle && (
              <Text style={styles.summaryItem}>Style: {selectedStyle.name}</Text>
            )}
            
            {selectedMaterial && selectedStyle && (
              <TouchableOpacity 
                style={styles.proceedButton}
                onPress={handleProceedToCustomization}
              >
                <Text style={styles.proceedButtonText}>Proceed to Customization</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
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
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  materialsContent: {
    paddingHorizontal: 15,
  },
  materialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
  },
  popularCard: {
    borderColor: '#FF9800',
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 1,
  },
  popularText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  materialImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  materialInfo: {
    padding: 15,
  },
  materialName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  materialDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  materialDetails: {
    marginBottom: 10,
  },
  materialPattern: {
    fontSize: 12,
    color: '#6200ee',
    marginBottom: 2,
  },
  materialOrigin: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  materialPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  stylesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  styleCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  selectedStyleCard: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  styleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
  selectedStyleText: {
    color: '#fff',
  },
  styleCheckmark: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  summarySection: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  bottomPadding: {
    height: 20,
  },
});

export default ClothingStoreScreen;