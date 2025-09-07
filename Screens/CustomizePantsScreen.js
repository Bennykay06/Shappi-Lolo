import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../Context/CartContext';

const CustomizePantsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { pants, item } = route.params || {};
  const product = pants || item;
  console.log('Customizing pants:', product);
  
  // Pants customization - 4 step process (matching jeans format)
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [selections, setSelections] = useState({
    fabric: null,
    waist: null,
    length: null,
    details: null
  });

  // MTailor's pants customization options using logo colors for fabrics
  const pantsOptions = {
    fabric: [
      { 
        id: 1, 
        name: 'Navy Blue Wool', 
        desc: 'Premium wool blend - wrinkle resistant and durable', 
        color: '#1e3a8a',
        fabricTexture: 'Wool Herringbone',
        price: '$149',
        type: 'wool',
        popular: true
      },
      { 
        id: 2, 
        name: 'Charcoal Grey Cotton', 
        desc: 'Modern tailored fit - perfect for business', 
        color: '#374151',
        fabricTexture: 'Cotton Twill',
        price: '$159',
        type: 'cotton',
        popular: true
      },
      { 
        id: 3, 
        name: 'Jet Black Premium', 
        desc: 'Versatile everyday wear - comfortable and stylish', 
        color: '#111827',
        fabricTexture: 'Performance Stretch',
        price: '$139',
        type: 'business'
      },
      { 
        id: 4, 
        name: 'Light Grey Formal', 
        desc: 'Professional grade tailoring - exceptional quality', 
        color: '#9ca3af',
        fabricTexture: 'Wool Gabardine',
        price: '$169',
        type: 'formal'
      },
      { 
        id: 5, 
        name: 'Deep Brown Luxury', 
        desc: 'Luxury comfort - precision fit technology', 
        color: '#78350f',
        fabricTexture: 'Italian Wool',
        price: '$189',
        type: 'luxury'
      }
    ],
    waist: [
      { 
        id: 1, 
        name: 'Luxury Dress Pants', 
        desc: 'Flat front - clean modern look with no pleats', 
        img: require('../assets/images/pa9.jpg'),
        preview: require('../assets/images/pa9.jpg'),
        style: 'modern',
        popular: true
      },
      { 
        id: 2, 
        name: 'Contemporary Fit Pants', 
        desc: 'Single pleat - traditional style with comfort', 
        img: require('../assets/images/pa10.jpg'),
        preview: require('../assets/images/pa10.jpg'),
        style: 'classic'
      },
      { 
        id: 3, 
        name: 'Designer Formal Pants', 
        desc: 'Double pleat - formal traditional with extra room', 
        img: require('../assets/images/pa11.jpg'),
        preview: require('../assets/images/pa11.jpg'),
        style: 'formal'
      }
    ],
    length: [
      { 
        id: 1, 
        name: 'Classic Navy Dress Pants', 
        desc: 'No break - modern length, hem just touches shoe', 
        img: require('../assets/images/pa1.jpg'),
        preview: require('../assets/images/pa1.jpg'),
        style: 'modern',
        popular: true
      },
      { 
        id: 2, 
        name: 'Charcoal Slim Fit Trousers', 
        desc: 'Quarter break - classic professional length', 
        img: require('../assets/images/pa2.jpg'),
        preview: require('../assets/images/pa2.jpg'),
        style: 'classic'
      },
      { 
        id: 3, 
        name: 'Black Business Casual Pants', 
        desc: 'Half break - traditional length with fold', 
        img: require('../assets/images/pa3.jpg'),
        preview: require('../assets/images/pa3.jpg'),
        style: 'traditional'
      }
    ],
    details: [
      { 
        id: 1, 
        name: 'Grey Formal Dress Pants', 
        desc: 'Side pockets - standard clean and functional', 
        img: require('../assets/images/pa4.jpg'),
        preview: require('../assets/images/pa4.jpg'),
        popular: true
      },
      { 
        id: 2, 
        name: 'Premium Tailored Pants', 
        desc: 'Back pockets - added extra functionality', 
        img: require('../assets/images/pa5.jpg'),
        preview: require('../assets/images/pa5.jpg')
      },
      { 
        id: 3, 
        name: 'Executive Dress Pants', 
        desc: 'Coin pocket - traditional detail styling', 
        img: require('../assets/images/pa6.jpg'),
        preview: require('../assets/images/pa6.jpg')
      }
    ]
  };

  // Pants customization flow - Get configuration for current step (matching jeans format)
  const getCurrentOptions = () => {
    switch(currentStep) {
      case 1: return { 
        title: 'Choose Your Fabric', 
        subtitle: 'Select from premium fabric colors and textures',
        options: pantsOptions.fabric,
        selected: selections.fabric,
        type: 'fabric',
        field: 'fabric'
      };
      case 2: return { 
        title: 'Choose Waist Style', 
        subtitle: 'Select flat front or pleated style',
        options: pantsOptions.waist,
        selected: selections.waist,
        type: 'image',
        field: 'waist'
      };
      case 3: return { 
        title: 'Select Length', 
        subtitle: 'Choose your preferred hem length and break',
        options: pantsOptions.length,
        selected: selections.length,
        type: 'image',
        field: 'length'
      };
      case 4: return { 
        title: 'Choose Details', 
        subtitle: 'Select pocket configuration and additional details',
        options: pantsOptions.details,
        selected: selections.details,
        type: 'image',
        field: 'details'
      };
      default: return null;
    }
  };

  const handleSelection = (option, field) => {
    setSelections(prev => ({
      ...prev,
      [field]: option
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack(); // Go back to shop if on first step
    }
  };

  const handleAddToCart = () => {
    if (!selections.fabric || !selections.waist || !selections.length || !selections.details) {
      Alert.alert('Incomplete Selection', 'Please complete all customization steps.');
      return;
    }

    const customPants = {
      id: Date.now().toString(),
      name: 'Custom Pants',
      price: parseFloat(selections.fabric?.price?.replace('$', '') || '149'),
      image: selections.fabric?.img,
      quantity: 1,
      customizations: selections,
      type: 'pants'
    };

    addToCart(customPants);
    Alert.alert('Success', 'Custom pants added to cart!', [
      { text: 'Continue Shopping', onPress: () => navigation.goBack() },
      { text: 'View Cart', onPress: () => navigation.navigate('MainTabs', { screen: 'CartTab' }) }
    ]);
  };


  const currentConfig = getCurrentOptions();
  if (!currentConfig) return null;

  return (
    <View style={styles.container}>
      {/* MTailor-style Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevStep} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Custom Pants</Text>
          <Text style={styles.stepCounter}>Step {currentStep} of {totalSteps}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${(currentStep / totalSteps) * 100}%` }]} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step Title */}
        <View style={styles.stepHeader}>
          <Text style={styles.stepTitle}>{currentConfig.title}</Text>
          <Text style={styles.stepSubtitle}>{currentConfig.subtitle}</Text>
        </View>

        {/* Options Grid */}
        <View style={styles.optionsContainer}>
          {currentConfig.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                currentConfig.selected?.id === option.id && styles.selectedOption,
                option.popular && styles.popularOption
              ]}
              onPress={() => handleSelection(option, currentConfig.field)}
            >
              {option.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>POPULAR</Text>
                </View>
              )}
              
              {currentConfig.type === 'fabric' && option.color ? (
                <View style={[styles.fabricSwatch, { backgroundColor: option.color }]}>
                  <View style={styles.fabricPattern} />
                </View>
              ) : (
                <Image source={option.img} style={styles.optionImage} />
              )}
              
              <View style={styles.optionContent}>
                <Text style={styles.optionName}>{option.name}</Text>
                <Text style={styles.optionDesc}>{option.desc}</Text>
                
                {option.price && (
                  <Text style={styles.optionPrice}>{option.price}</Text>
                )}
                
                {option.measurements && (
                  <Text style={styles.optionMeasurements}>{option.measurements}</Text>
                )}
                
                {option.style && (
                  <Text style={styles.optionStyle}>{option.style} style</Text>
                )}
                
                {option.fabricTexture && (
                  <Text style={styles.optionTexture}>{option.fabricTexture}</Text>
                )}

                {currentConfig.selected?.id === option.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
                    <Text style={styles.selectedText}>Selected</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* MTailor-style Navigation Footer */}
      <View style={styles.footer}>
        <View style={styles.navigationButtons}>
          {currentStep > 1 && (
            <TouchableOpacity onPress={prevStep} style={styles.prevButton}>
              <Ionicons name="arrow-back" size={16} color="#666" />
              <Text style={styles.prevButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.spacer} />
          
          {currentStep < totalSteps ? (
            <TouchableOpacity 
              onPress={nextStep} 
              style={[styles.nextButton, !currentConfig.selected && styles.disabledButton]}
              disabled={!currentConfig.selected}
            >
              <Text style={styles.nextButtonText}>Next Step</Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={handleAddToCart} 
              style={[styles.addToCartButton, !currentConfig.selected && styles.disabledButton]}
              disabled={!currentConfig.selected}
            >
              <Ionicons name="bag-add" size={16} color="white" style={{marginRight: 8}} />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  stepCounter: {
    fontSize: 14,
    color: '#666',
  },
  placeholder: {
    width: 40,
  },
  progressContainer: {
    height: 3,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#007AFF',
    borderRadius: 1.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepHeader: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  optionsContainer: {
    paddingBottom: 100,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedOption: {
    borderColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOpacity: 0.3,
  },
  popularOption: {
    borderColor: '#FF3B30',
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  optionImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  optionContent: {
    padding: 16,
  },
  optionName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  optionDesc: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  optionPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  optionMeasurements: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  optionStyle: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  selectedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  selectedText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  prevButtonText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#666',
  },
  spacer: {
    flex: 1,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    marginRight: 6,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addToCartText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  fabricSwatch: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabricPattern: {
    width: '80%',
    height: '80%',
    borderRadius: 6,
    opacity: 0.1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  optionTexture: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
    fontWeight: '500',
  },
});

export default CustomizePantsScreen;