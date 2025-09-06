import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../Context/CartContext';

const CustomizeJeansScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { jeans, item } = route.params || {};
  const product = jeans || item;
  console.log('Customizing jeans:', product);
  
  // Jeans customization - 5 step process
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [selections, setSelections] = useState({
    wash: null,
    fit: null,
    rise: null,
    length: null,
    details: null
  });

  // Jeans customization options
  const jeansOptions = {
    wash: [
      { 
        id: 1, 
        name: 'Classic Blue', 
        desc: 'Traditional indigo wash - versatile and timeless', 
        img: require('../assets/images/jeans.jpg'),
        preview: require('../assets/images/jeans.jpg'),
        price: '$89',
        type: 'indigo',
        popular: true,
        color: '#4169E1'
      },
      { 
        id: 2, 
        name: 'Light Wash', 
        desc: 'Faded casual look - perfect for weekend wear', 
        img: require('../assets/images/jeans.jpg'),
        preview: require('../assets/images/jeans.jpg'),
        price: '$89',
        type: 'light',
        popular: true,
        color: '#87CEEB'
      },
      { 
        id: 3, 
        name: 'Dark Wash', 
        desc: 'Deep indigo - sophisticated and professional', 
        img: require('../assets/images/jeans.jpg'),
        preview: require('../assets/images/jeans.jpg'),
        price: '$99',
        type: 'dark',
        color: '#191970'
      },
      { 
        id: 4, 
        name: 'Black', 
        desc: 'Sleek black finish - modern and edgy', 
        img: require('../assets/images/jeans.jpg'),
        preview: require('../assets/images/jeans.jpg'),
        price: '$99',
        type: 'black',
        color: '#000000'
      },
      { 
        id: 5, 
        name: 'Distressed', 
        desc: 'Pre-worn look - casual and trendy', 
        img: require('../assets/images/jeans.jpg'),
        preview: require('../assets/images/jeans.jpg'),
        price: '$109',
        type: 'distressed',
        color: '#696969'
      }
    ],
    fit: [
      { 
        id: 1, 
        name: 'Skinny Fit', 
        desc: 'Ultra-slim throughout - modern tapered silhouette', 
        img: require('../assets/images/skinny-jeans.jpg'),
        preview: require('../assets/images/skinny-jeans.jpg'),
        measurements: 'Tight fit',
        popular: true,
        fitType: 'SKINNY'
      },
      { 
        id: 2, 
        name: 'Slim Fit', 
        desc: 'Fitted through thigh with slight taper - contemporary style', 
        img: require('../assets/images/slim-jeans.jpg'),
        preview: require('../assets/images/slim-jeans.jpg'),
        measurements: 'Fitted silhouette',
        popular: true,
        fitType: 'SLIM'
      },
      { 
        id: 3, 
        name: 'Straight Fit', 
        desc: 'Classic straight leg - timeless and versatile', 
        img: require('../assets/images/straight-jeans.jpg'),
        preview: require('../assets/images/straight-jeans.jpg'),
        measurements: 'Straight through leg',
        fitType: 'STRAIGHT'
      },
      { 
        id: 4, 
        name: 'Relaxed Fit', 
        desc: 'Comfortable through hip and thigh - easy wear', 
        img: require('../assets/images/relaxed-jeans.jpg'),
        preview: require('../assets/images/relaxed-jeans.jpg'),
        measurements: 'Roomy fit',
        fitType: 'RELAXED'
      }
    ],
    rise: [
      { 
        id: 1, 
        name: 'Low Rise', 
        desc: 'Sits below waist - modern casual style', 
        img: require('../assets/images/low-rise.png'),
        preview: require('../assets/images/low-rise.png'),
        style: 'modern',
        popular: true,
        riseType: 'LOW'
      },
      { 
        id: 2, 
        name: 'Mid Rise', 
        desc: 'Sits at natural waist - balanced comfort', 
        img: require('../assets/images/mid-rise.png'),
        preview: require('../assets/images/mid-rise.png'),
        style: 'balanced',
        riseType: 'MID'
      },
      { 
        id: 3, 
        name: 'High Rise', 
        desc: 'Sits above waist - retro-inspired look', 
        img: require('../assets/images/high-rise.png'),
        preview: require('../assets/images/high-rise.png'),
        style: 'retro',
        riseType: 'HIGH'
      }
    ],
    details: [
      { 
        id: 1, 
        name: 'Classic 5-Pocket', 
        desc: 'Two front, two back, plus coin pocket - traditional styling', 
        img: require('../assets/images/slim-jeans.jpg'),
        preview: require('../assets/images/slim-jeans.jpg'),
        popular: true,
        pocketType: 'CLASSIC'
      },
      { 
        id: 2, 
        name: '4-Pocket Style', 
        desc: 'Two front and two back pockets - no coin pocket', 
        img: require('../assets/images/slim-jeans.jpg'),
        preview: require('../assets/images/slim-jeans.jpg'),
        pocketType: 'FOUR_POCKET'
      },
      { 
        id: 3, 
        name: 'Minimalist', 
        desc: 'Front pockets only - clean streamlined look', 
        img: require('../assets/images/jeans.jpg'),
        preview: require('../assets/images/jeans.jpg'),
        pocketType: 'MINIMAL'
      },
      { 
        id: 4, 
        name: 'Cargo Style', 
        desc: 'Multiple utility pockets - maximum functionality', 
        img: require('../assets/images/cargo-style.jpg'),
        preview: require('../assets/images/cargo-style.jpg'),
        pocketType: 'CARGO'
      }
    ]
  };

  // Get configuration for current step
  const getCurrentOptions = () => {
    switch(currentStep) {
      case 1: return { 
        title: 'Choose Your Wash', 
        subtitle: 'Select your preferred denim wash and color',
        options: jeansOptions.wash,
        selected: selections.wash,
        type: 'fabric',
        field: 'wash'
      };
      case 2: return { 
        title: 'Select Fit Style', 
        subtitle: 'Choose your preferred fit through hip and thigh',
        options: jeansOptions.fit,
        selected: selections.fit,
        type: 'image',
        field: 'fit'
      };
      case 3: return { 
        title: 'Choose Rise', 
        subtitle: 'Select where the waistline sits on your body',
        options: jeansOptions.rise,
        selected: selections.rise,
        type: 'image',
        field: 'rise'
      };
      case 4: return { 
        title: 'Choose Details', 
        subtitle: 'Select pocket configuration and styling details',
        options: jeansOptions.details,
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
    if (!selections.wash || !selections.fit || !selections.rise || !selections.details) {
      Alert.alert('Incomplete Selection', 'Please complete all customization steps.');
      return;
    }

    const customJeans = {
      id: Date.now().toString(),
      name: 'Custom Jeans',
      price: parseFloat(selections.wash?.price?.replace('$', '') || '89'),
      image: selections.wash?.img,
      quantity: 1,
      customizations: selections,
      type: 'jeans'
    };

    addToCart(customJeans);
    Alert.alert('Success', 'Custom jeans added to cart!', [
      { text: 'Continue Shopping', onPress: () => navigation.navigate('MainTabs', { screen: 'ShopTab', params: { screen: 'ShopMain' } }) },
      { text: 'View Cart', onPress: () => navigation.navigate('MainTabs', { screen: 'CartTab' }) }
    ]);
  };

  const currentConfig = getCurrentOptions();
  if (!currentConfig) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={prevStep} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Custom Jeans</Text>
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
              
              {currentStep === 1 && option.color ? (
                <View style={[styles.colorBlock, { backgroundColor: option.color }]}>
                  <Text style={styles.washTypeText}>{option.type ? option.type.toUpperCase() : 'WASH'}</Text>
                </View>
              ) : (
                <View style={styles.imageContainer}>
                  <Image source={option.img} style={styles.optionImage} />
                  {currentStep === 2 && option.fitType && (
                    <View style={styles.fitOverlay}>
                      <Text style={styles.fitTypeText}>{option.fitType}</Text>
                    </View>
                  )}
                  {currentStep === 3 && option.riseType && (
                    <View style={styles.fitOverlay}>
                      <Text style={styles.fitTypeText}>{option.riseType} RISE</Text>
                    </View>
                  )}
                </View>
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

      {/* Navigation Footer */}
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
  imageContainer: {
    position: 'relative',
  },
  optionImage: {
    width: '100%',
    height: 600,
    resizeMode: 'contain',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  fitOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  fitTypeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  colorBlock: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  washTypeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
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
});

export default CustomizeJeansScreen;