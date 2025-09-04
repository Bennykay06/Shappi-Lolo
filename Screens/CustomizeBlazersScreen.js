import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../Context/CartContext';

const CustomizeBlazersScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { blazer, item } = route.params || {};
  const product = blazer || item;
  console.log('Customizing blazer:', product);
  
  // MTailor-style blazer customization - 6 step process
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [selections, setSelections] = useState({
    fabric: null,
    lapel: null,
    buttons: null,
    vents: null,
    pockets: null,
    monogram: null
  });

  // Monogram text input
  const [monogramText, setMonogramText] = useState('');
  const [monogramLocation, setMonogramLocation] = useState(null);
  const [monogramFont, setMonogramFont] = useState(null);
  const [monogramColor, setMonogramColor] = useState(null);

  // MTailor's blazer customization options - suit-style comprehensive
  const blazerOptions = {
    fabric: [
      { 
        id: 1, 
        name: 'Navy Wool', 
        desc: 'Classic business essential - versatile and professional', 
        img: require('../assets/images/blazzers.webp'),
        preview: require('../assets/images/suits.jpg'),
        price: '$299',
        type: 'wool',
        popular: true
      },
      { 
        id: 2, 
        name: 'Charcoal Wool', 
        desc: 'Sophisticated formal - perfect for evening events', 
        img: require('../assets/images/suits.jpg'),
        preview: require('../assets/images/blazzers.webp'),
        price: '$299',
        type: 'wool',
        popular: true
      },
      { 
        id: 3, 
        name: 'Light Grey Wool', 
        desc: 'Modern professional - ideal for spring/summer', 
        img: require('../assets/images/dress pant.webp'),
        preview: require('../assets/images/dress pant.webp'),
        price: '$319',
        type: 'wool'
      },
      { 
        id: 4, 
        name: 'Cotton Blend', 
        desc: 'Casual comfort - breathable and flexible', 
        img: require('../assets/images/jeans.jpg'),
        preview: require('../assets/images/jeans.jpg'),
        price: '$279',
        type: 'cotton'
      },
      { 
        id: 5, 
        name: 'Linen Blend', 
        desc: 'Summer lightweight - perfect for warm weather', 
        img: require('../assets/images/men shirt.jpg'),
        preview: require('../assets/images/men shirt.jpg'),
        price: '$339',
        type: 'linen'
      },
      { 
        id: 6, 
        name: 'Velvet', 
        desc: 'Luxury evening wear - sophisticated texture', 
        img: require('../assets/images/polo.webp'),
        preview: require('../assets/images/polo.webp'),
        price: '$399',
        type: 'velvet'
      }
    ],
    lapel: [
      { 
        id: 1, 
        name: 'Notch Slim', 
        desc: 'Modern versatile style - classic business', 
        img: require('../assets/images/notch slim.jpg'),
        preview: require('../assets/images/notch slim.jpg'),
        popular: true
      },
      { 
        id: 2, 
        name: 'Notch', 
        desc: 'Classic formal look - traditional style', 
        img: require('../assets/images/notch.jpg'),
        preview: require('../assets/images/notch.jpg'),
        popular: true
      },
      { 
        id: 3, 
        name: 'Peak', 
        desc: 'Classic formal look - sophisticated elegance', 
        img: require('../assets/images/peak.jpg'),
        preview: require('../assets/images/peak.jpg')
      },
      { 
        id: 4, 
        name: 'Peak Wide', 
        desc: 'Bold statement style - formal occasions', 
        img: require('../assets/images/peak wide.jpg'),
        preview: require('../assets/images/peak wide.jpg')
      }
    ],
    buttons: [
      { 
        id: 1, 
        name: 'Two Button', 
        desc: 'Traditional business - clean contemporary lines', 
        img: require('../assets/images/two buttons.jpg'),
        preview: require('../assets/images/two buttons.jpg'),
        popular: true
      },
      { 
        id: 2, 
        name: 'One Button', 
        desc: 'Sleek minimalist style - modern elegance', 
        img: require('../assets/images/one button.jpg'),
        preview: require('../assets/images/one button.jpg'),
        popular: true
      },
      { 
        id: 3, 
        name: 'Three Button', 
        desc: 'Formal appearance - traditional style', 
        img: require('../assets/images/three buttons.jpg'),
        preview: require('../assets/images/three buttons.jpg')
      }
    ],
    vents: [
      { 
        id: 1, 
        name: 'Center Vent', 
        desc: 'Standard comfort - classic American style', 
        img: require('../assets/images/one vent.jpg'),
        preview: require('../assets/images/one vent.jpg'),
        popular: true
      },
      { 
        id: 2, 
        name: 'Side Vents', 
        desc: 'Modern tailored look - British style mobility', 
        img: require('../assets/images/two vents.jpg'),
        preview: require('../assets/images/two vents.jpg'),
        popular: true
      }
    ],
    pockets: [
      { 
        id: 1, 
        name: 'Jetted', 
        desc: 'Formal minimal - sleek hidden openings', 
        img: require('../assets/images/jetted pockect.jpg'),
        preview: require('../assets/images/jetted pockect.jpg'),
        popular: true
      },
      { 
        id: 2, 
        name: 'Flap', 
        desc: 'Traditional business - covered and protected', 
        img: require('../assets/images/flapped pocket.jpg'),
        preview: require('../assets/images/flapped pocket.jpg'),
        popular: true
      },
      { 
        id: 3, 
        name: 'Patch', 
        desc: 'Casual style - relaxed and informal', 
        img: require('../assets/images/patch pocket.jpg'),
        preview: require('../assets/images/patch pocket.jpg')
      }
    ]
  };

  // Monogram customization options
  const monogramLocations = [
    { id: 1, name: 'Inside Pocket', desc: 'Hidden personal touch' },
    { id: 2, name: 'Lower Left', desc: 'Subtle exterior placement' },
    { id: 3, name: 'Inside Collar', desc: 'Traditional location' }
  ];

  const monogramFonts = [
    { id: 1, name: 'Classic', sample: 'AB', desc: 'Traditional serif style' },
    { id: 2, name: 'Modern', sample: 'AB', desc: 'Clean contemporary' },
    { id: 3, name: 'Script', sample: 'AB', desc: 'Elegant cursive' }
  ];

  const monogramColors = [
    { id: 1, name: 'Navy', color: '#001f3f' },
    { id: 2, name: 'Gold', color: '#FFD700' },
    { id: 3, name: 'Silver', color: '#C0C0C0' },
    { id: 4, name: 'Black', color: '#000000' }
  ];

  // MTailor's exact customization flow - Get configuration for current step
  const getCurrentOptions = () => {
    switch(currentStep) {
      case 1: return { 
        title: 'Choose Your Fabric', 
        subtitle: 'Select from wool, cotton, linen, and luxury options',
        options: blazerOptions.fabric,
        selected: selections.fabric,
        type: 'fabric',
        field: 'fabric'
      };
      case 2: return { 
        title: 'Select Lapel Style', 
        subtitle: 'Choose your preferred lapel design',
        options: blazerOptions.lapel,
        selected: selections.lapel,
        type: 'image',
        field: 'lapel'
      };
      case 3: return { 
        title: 'Choose Button Style', 
        subtitle: 'Select number and arrangement of buttons',
        options: blazerOptions.buttons,
        selected: selections.buttons,
        type: 'image',
        field: 'buttons'
      };
      case 4: return { 
        title: 'Select Vent Style', 
        subtitle: 'Choose back vent configuration',
        options: blazerOptions.vents,
        selected: selections.vents,
        type: 'image',
        field: 'vents'
      };
      case 5: return { 
        title: 'Choose Pocket Style', 
        subtitle: 'Select pocket design and placement',
        options: blazerOptions.pockets,
        selected: selections.pockets,
        type: 'image',
        field: 'pockets'
      };
      case 6: return { 
        title: 'Add Monogram (Optional)', 
        subtitle: 'Personalize your blazer with custom monogramming',
        options: null,
        selected: selections.monogram,
        type: 'monogram',
        field: 'monogram'
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

  const handleMonogramComplete = () => {
    if (monogramText.trim()) {
      const monogramData = {
        text: monogramText.trim(),
        location: monogramLocation,
        font: monogramFont,
        color: monogramColor
      };
      setSelections(prev => ({
        ...prev,
        monogram: monogramData
      }));
    }
  };

  const nextStep = () => {
    if (currentStep === 6 && monogramText.trim()) {
      handleMonogramComplete();
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    const currentConfig = getCurrentOptions();
    if (currentConfig.type === 'monogram') {
      return true; // Monogram is optional
    }
    return currentConfig.selected !== null;
  };

  const handleAddToCart = () => {
    if (!selections.fabric || !selections.lapel || !selections.buttons || !selections.vents || !selections.pockets) {
      Alert.alert('Incomplete Selection', 'Please complete all required customization steps.');
      return;
    }

    if (currentStep === 6 && monogramText.trim()) {
      handleMonogramComplete();
    }

    const customBlazer = {
      id: Date.now().toString(),
      name: 'Custom Blazer',
      price: parseFloat(selections.fabric?.price?.replace('$', '') || '299'),
      image: selections.fabric?.img,
      quantity: 1,
      customizations: {
        ...selections,
        monogram: monogramText.trim() ? {
          text: monogramText.trim(),
          location: monogramLocation,
          font: monogramFont,
          color: monogramColor
        } : null
      },
      type: 'blazer'
    };

    addToCart(customBlazer);
    Alert.alert('Success', 'Custom blazer added to cart!', [
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Custom Blazer</Text>
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

        {/* Monogram Step */}
        {currentConfig.type === 'monogram' ? (
          <View style={styles.monogramContainer}>
            <View style={styles.monogramSection}>
              <Text style={styles.monogramSectionTitle}>Monogram Text (2-3 characters)</Text>
              <TextInput
                style={styles.monogramInput}
                value={monogramText}
                onChangeText={setMonogramText}
                placeholder="Enter initials (e.g., JD)"
                maxLength={3}
                autoCapitalize="characters"
              />
            </View>

            {monogramText.trim() && (
              <>
                <View style={styles.monogramSection}>
                  <Text style={styles.monogramSectionTitle}>Choose Location</Text>
                  <View style={styles.monogramOptions}>
                    {monogramLocations.map((location) => (
                      <TouchableOpacity
                        key={location.id}
                        style={[
                          styles.monogramOption,
                          monogramLocation?.id === location.id && styles.selectedMonogramOption
                        ]}
                        onPress={() => setMonogramLocation(location)}
                      >
                        <Text style={[
                          styles.monogramOptionText,
                          monogramLocation?.id === location.id && styles.selectedMonogramOptionText
                        ]}>
                          {location.name}
                        </Text>
                        <Text style={styles.monogramOptionDesc}>{location.desc}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.monogramSection}>
                  <Text style={styles.monogramSectionTitle}>Choose Font</Text>
                  <View style={styles.monogramOptions}>
                    {monogramFonts.map((font) => (
                      <TouchableOpacity
                        key={font.id}
                        style={[
                          styles.monogramOption,
                          monogramFont?.id === font.id && styles.selectedMonogramOption
                        ]}
                        onPress={() => setMonogramFont(font)}
                      >
                        <Text style={[
                          styles.monogramOptionText,
                          monogramFont?.id === font.id && styles.selectedMonogramOptionText
                        ]}>
                          {font.name}
                        </Text>
                        <Text style={styles.monogramOptionDesc}>{font.desc}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.monogramSection}>
                  <Text style={styles.monogramSectionTitle}>Choose Thread Color</Text>
                  <View style={styles.colorOptions}>
                    {monogramColors.map((colorOption) => (
                      <TouchableOpacity
                        key={colorOption.id}
                        style={[
                          styles.colorOption,
                          { backgroundColor: colorOption.color },
                          monogramColor?.id === colorOption.id && styles.selectedColorOption
                        ]}
                        onPress={() => setMonogramColor(colorOption)}
                      >
                        {monogramColor?.id === colorOption.id && (
                          <Ionicons name="checkmark" size={16} color="white" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>
        ) : (
          /* Options Grid */
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
                
                <Image source={option.img} style={styles.optionImage} />
                
                <View style={styles.optionContent}>
                  <Text style={styles.optionName}>{option.name}</Text>
                  <Text style={styles.optionDesc}>{option.desc}</Text>
                  
                  {option.price && (
                    <Text style={styles.optionPrice}>{option.price}</Text>
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
        )}
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
              style={[styles.nextButton, !isStepComplete() && styles.disabledButton]}
              disabled={!isStepComplete()}
            >
              <Text style={styles.nextButtonText}>Next Step</Text>
              <Ionicons name="arrow-forward" size={16} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              onPress={handleAddToCart} 
              style={styles.addToCartButton}
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
  monogramContainer: {
    paddingBottom: 100,
  },
  monogramSection: {
    marginBottom: 32,
  },
  monogramSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  monogramInput: {
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  monogramOptions: {
    flexDirection: 'column',
  },
  monogramOption: {
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  selectedMonogramOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f8f9ff',
  },
  monogramOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  selectedMonogramOptionText: {
    color: '#007AFF',
  },
  monogramOptionDesc: {
    fontSize: 14,
    color: '#666',
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#007AFF',
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

export default CustomizeBlazersScreen;