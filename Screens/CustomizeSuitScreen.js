import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../Context/CartContext';
import { Ionicons } from '@expo/vector-icons';

const CustomizeSuitScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { suit, item, category = 'suit' } = route.params || {};
  const product = suit || item;
  console.log('Customizing item:', product, 'Category:', category);
  
  // Track current step (1-6)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Store all user selections - dynamic based on category
  const getInitialSelections = () => {
    const base = {
      fabric: null,
      monogram: {
        enabled: null,
        initials: '',
        location: null,
        font: null,
        color: null
      }
    };

    // Add suit-specific selections
    return {
      ...base,
      lapel: null,
      buttons: null,
      vents: null,
      lining: null,
      pocketSquare: null
    };
  };

  const [selections, setSelections] = useState(getInitialSelections());

  // Customization configurations - using same format as blazer
  const customizationConfigs = {
    suit: {
      steps: 6, // fabric, lapel, buttons, vents, monogram, additional
      options: {
        fabric: [
          { id: 1, name: 'Navy Performance Blend', desc: 'Classic professional', color: '#001f3f' },
          { id: 2, name: 'Charcoal Wool', desc: 'Formal elegance', color: '#36454f' },
          { id: 3, name: 'Black Formal', desc: 'Traditional formal', color: '#000000' },
          { id: 4, name: 'Grey Business', desc: 'Modern professional', color: '#666666' },
          { id: 5, name: 'Brown Heritage', desc: 'Casual sophistication', color: '#8b4513' }
        ],
        lapel: [
          { id: 1, name: 'Notch Slim', desc: 'Modern versatile style', img: require('../assets/images/notch slim.jpg') },
          { id: 2, name: 'Notch', desc: 'Classic formal look', img: require('../assets/images/notch.jpg') },
          { id: 3, name: 'Peak', desc: 'Classic formal look', img: require('../assets/images/peak.jpg') },
          { id: 4, name: 'Peak Wide', desc: 'Classic formal look', img: require('../assets/images/peak wide.jpg') }
        ],
        buttons: [
          { id: 1, name: 'One Button', desc: 'Sleek minimalist style', img: require('../assets/images/one button.jpg') },
          { id: 2, name: 'Two Buttons', desc: 'Traditional business', img: require('../assets/images/two buttons.jpg') },
          { id: 3, name: 'Three Buttons', desc: 'Formal appearance', img: require('../assets/images/three buttons.jpg') }
        ],
        vents: [
          { id: 1, name: 'Center Vent', desc: 'Standard comfort', img: require('../assets/images/one vent.jpg') },
          { id: 2, name: 'Side Vents', desc: 'Modern tailored look', img: require('../assets/images/two vents.jpg') }
        ]
      }
    }
  };

  const currentConfig = customizationConfigs['suit'];

  // Monogram customization options
  const monogramLocations = [
    { id: 1, name: 'Chest' },
    { id: 2, name: 'Cuff' },
    { id: 3, name: 'Inside Jacket' }
  ];

  const monogramFonts = [
    { id: 1, name: 'Classic', sample: 'DA' },
    { id: 2, name: 'Modern', sample: 'DA' },
    { id: 3, name: 'Script', sample: 'DA' }
  ];

  const threadColors = [
    { id: 1, name: 'White', color: '#ffffff' },
    { id: 2, name: 'Black', color: '#000000' },
    { id: 3, name: 'Navy', color: '#001f3f' },
    { id: 4, name: 'Silver', color: '#dddddd' }
  ];

  // Get configuration for current step - suit customization
  const getCurrentOptions = () => {
    switch(currentStep) {
      case 1: return { 
        title: 'Fabric Color', 
        options: currentConfig.options.fabric,
        selected: selections.fabric,
        type: 'color',
        field: 'fabric'
      };
      case 2: return { 
        title: 'Lapel Style', 
        options: currentConfig.options.lapel,
        selected: selections.lapel,
        type: 'image',
        field: 'lapel'
      };
      case 3: return { 
        title: 'Button Arrangement', 
        options: currentConfig.options.buttons,
        selected: selections.buttons,
        type: 'image',
        field: 'buttons'
      };
      case 4: return { 
        title: 'Vent Style', 
        options: currentConfig.options.vents,
        selected: selections.vents,
        type: 'image',
        field: 'vents'
      };
      case 5: return {
        title: 'Monogram',
        type: 'monogram'
      };
      case 6: return {
        title: 'Additional Options',
        options: [
          { id: 'lining', name: 'Do you want custom lining?', price: 50 },
          { id: 'pocketSquare', name: 'Do you want a pocket square pocket?', price: 25 }
        ],
        type: 'yesno'
      };
      default: return { title: '', options: [], selected: null, type: '' };
    }
  };

  // Handle image selection
  const handleImageSelect = (id) => {
    const { field } = getCurrentOptions();
    if (field) {
      setSelections(prev => ({ ...prev, [field]: id }));
    }
  };

  // Handle color selection
  const handleColorSelect = (id) => {
    const { field } = getCurrentOptions();
    if (field) {
      setSelections(prev => ({ ...prev, [field]: id }));
    }
  };

  // Handle monogram selections
  const handleMonogramSelect = (field, value) => {
    setSelections(prev => ({
      ...prev,
      monogram: { ...prev.monogram, [field]: value }
    }));
  };

  // Handle yes/no selections
  const handleYesNoSelect = (id, value) => {
    setSelections(prev => ({ ...prev, [id]: value }));
  };

  // Check if next button should be disabled
  const isNextDisabled = () => {
    const { type, options, selected } = getCurrentOptions();
    
    if (type === 'image' || type === 'color') return !selected;
    
    if (type === 'monogram') {
      if (selections.monogram.enabled === null) return true;
      if (selections.monogram.enabled) {
        return !selections.monogram.initials || 
               !selections.monogram.location || 
               !selections.monogram.font || 
               !selections.monogram.color;
      }
      return false;
    }
    
    if (type === 'yesno') {
      return options.some(opt => selections[opt.id] === null);
    }
    
    return false;
  };

  // Handle navigation to previous step
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack(); // Go back to shop if on first step
    }
  };

  // Handle navigation to next step
  const handleNext = () => {
    const maxSteps = currentConfig.steps;
    if (currentStep < maxSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit all selections and add to cart
      const customizedItem = {
        id: `${product?.id || 'suit'}_${Date.now()}`, // Unique ID for customized item
        name: product?.name || 'Custom Suit',
        price: product?.price || 0,
        selectedSize: product?.selectedSize || 'Default',
        quantity: product?.quantity || 1,
        image: product?.image,
        customizations: selections,
        category: 'suit',
        isCustomized: true
      };
      
      addToCart(customizedItem);
      Alert.alert(
        'Suit Customized!', 
        `Your customized ${product?.name || 'suit'} has been added to cart.`,
        [
          {
            text: 'Continue Shopping',
            onPress: () => navigation.navigate('ShopMain')
          },
          {
            text: 'View Cart',
            onPress: () => navigation.navigate('MainTabs', { screen: 'CartTab' })
          }
        ]
      );
    }
  };


  const { title, options, selected, type } = getCurrentOptions();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handlePrev} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        {/* Step indicators - dynamic based on category */}
        <View style={styles.stepsContainer}>
        {Array.from({ length: currentConfig.steps }, (_, i) => i + 1).map((step) => (
          <Text 
            key={step} 
            style={[
              styles.stepNumber,
              currentStep === step && styles.activeStep,
              step < currentStep && styles.completedStep
            ]}
          >
            {step}
          </Text>
        ))}
      </View>

      {/* Image selection screens */}
      {type === 'image' && (
        <>
          <View style={styles.divider} />

          {/* Selected option preview */}
          {selected && (
            <>
              <Image 
                source={options.find(opt => opt.id === selected).img}
                style={styles.previewImage}
              />
              <Text style={styles.optionName}>
                {options.find(opt => opt.id === selected).name}
              </Text>
              <Text style={styles.optionDesc}>
                {options.find(opt => opt.id === selected).desc}
              </Text>
            </>
          )}

          <View style={styles.divider} />

          {/* Options list */}
          <ScrollView contentContainerStyle={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  selected === option.id && styles.selectedOption
                ]}
                onPress={() => handleImageSelect(option.id)}
              >
                <Image source={option.img} style={styles.optionImage} />
                <View>
                  <Text style={styles.optionText}>{option.name}</Text>
                  <Text style={styles.optionSubtext}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Color selection screen */}
      {type === 'color' && (
        <>
          <View style={styles.divider} />

          {/* Selected color preview */}
          {selected && (
            <>
              <View style={[styles.selectedColorPreview, { backgroundColor: options.find(opt => opt.id === selected).color }]} />
              <Text style={styles.optionName}>
                {options.find(opt => opt.id === selected).name}
              </Text>
              <Text style={styles.optionDesc}>
                {options.find(opt => opt.id === selected).desc}
              </Text>
            </>
          )}

          <View style={styles.divider} />

          {/* Color options list */}
          <ScrollView contentContainerStyle={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.colorOptionButton,
                  selected === option.id && styles.selectedOption
                ]}
                onPress={() => handleColorSelect(option.id)}
              >
                <View style={[styles.colorSwatch, { backgroundColor: option.color }]} />
                <View style={styles.colorInfo}>
                  <Text style={styles.optionText}>{option.name}</Text>
                  <Text style={styles.optionSubtext}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Monogram screen */}
      {type === 'monogram' && (
        <ScrollView contentContainerStyle={styles.monogramContainer}>
          {/* Monogram toggle */}
          <View style={styles.yesnoOption}>
            <Text style={styles.yesnoQuestion}>Do you want a monogram (initials)?</Text>
            <View style={styles.yesnoButtons}>
              <TouchableOpacity
                style={[
                  styles.yesnoButton,
                  selections.monogram.enabled === false && styles.selectedYesNo
                ]}
                onPress={() => handleMonogramSelect('enabled', false)}
              >
                <Text style={[
                  styles.yesnoButtonText,
                  selections.monogram.enabled === false && styles.selectedYesNoText
                ]}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesnoButton,
                  selections.monogram.enabled === true && styles.selectedYesNo
                ]}
                onPress={() => handleMonogramSelect('enabled', true)}
              >
                <Text style={[
                  styles.yesnoButtonText,
                  selections.monogram.enabled === true && styles.selectedYesNoText
                ]}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>

          {selections.monogram.enabled && (
            <>
              {/* Initials input */}
              <View style={styles.monogramSection}>
                <Text style={styles.sectionTitle}>Add your initials (2 or 3 letters)</Text>
                <TextInput
                  style={styles.initialsInput}
                  maxLength={3}
                  value={selections.monogram.initials}
                  onChangeText={text => handleMonogramSelect('initials', text.toUpperCase())}
                  placeholder="DA"
                />
              </View>

              {/* Location selection */}
              <View style={styles.monogramSection}>
                <Text style={styles.sectionTitle}>Select a monogram location</Text>
                <Text style={styles.chooseOne}>CHOOSE ONE</Text>
                <View style={styles.optionsRow}>
                  {monogramLocations.map(location => (
                    <TouchableOpacity
                      key={location.id}
                      style={[
                        styles.monogramOption,
                        selections.monogram.location === location.id && styles.selectedMonogramOption
                      ]}
                      onPress={() => handleMonogramSelect('location', location.id)}
                    >
                      <Text>{location.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Font selection */}
              <View style={styles.monogramSection}>
                <Text style={styles.sectionTitle}>Select a monogram font</Text>
                <View style={styles.fontOptions}>
                  {monogramFonts.map(font => (
                    <TouchableOpacity
                      key={font.id}
                      style={[
                        styles.fontOption,
                        selections.monogram.font === font.id && styles.selectedFontOption
                      ]}
                      onPress={() => handleMonogramSelect('font', font.id)}
                    >
                      <Text style={styles.fontSample}>{font.sample}</Text>
                      <Text style={styles.fontName}>{font.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Thread color selection */}
              <View style={styles.monogramSection}>
                <Text style={styles.sectionTitle}>Select a thread color (view your fabric)</Text>
                <Text style={styles.chooseOne}>CHOOSE ONE</Text>
                <View style={styles.colorOptions}>
                  {threadColors.map(color => (
                    <TouchableOpacity
                      key={color.id}
                      style={[
                        styles.colorOption,
                        { backgroundColor: color.color },
                        selections.monogram.color === color.id && styles.selectedColorOption
                      ]}
                      onPress={() => handleMonogramSelect('color', color.id)}
                    />
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      )}

      {/* Yes/No options screens */}
      {type === 'yesno' && (
        <ScrollView contentContainerStyle={styles.yesnoContainer}>
          {options.map((option) => (
            <View key={option.id} style={styles.yesnoOption}>
              <Text style={styles.yesnoQuestion}>
                {option.name}{option.price > 0 ? ` (+$${option.price})` : ''}
              </Text>
              <View style={styles.yesnoButtons}>
                <TouchableOpacity
                  style={[
                    styles.yesnoButton,
                    selections[option.id] === false && styles.selectedYesNo
                  ]}
                  onPress={() => handleYesNoSelect(option.id, false)}
                >
                  <Text style={[
                    styles.yesnoButtonText,
                    selections[option.id] === false && styles.selectedYesNoText
                  ]}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.yesnoButton,
                    selections[option.id] === true && styles.selectedYesNo
                  ]}
                  onPress={() => handleYesNoSelect(option.id, true)}
                >
                  <Text style={[
                    styles.yesnoButtonText,
                    selections[option.id] === true && styles.selectedYesNoText
                  ]}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Navigation button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          isNextDisabled() && styles.disabledButton
        ]}
        onPress={handleNext}
        disabled={isNextDisabled()}
      >
        <Text style={styles.nextButtonText}>
          {currentStep === currentConfig.steps ? 'DONE' : 'NEXT'}
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 4,
  },
  backButton: {
    padding: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    width: 34, // Same width as back button for centering
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15
  },
  stepNumber: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#ccc',
    fontWeight: 'bold'
  },
  activeStep: {
    color: '#000',
    fontSize: 18
  },
  completedStep: {
    color: '#666'
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10
  },
  optionName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  optionDesc: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10
  },
  optionsContainer: {
    paddingBottom: 20
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8
  },
  selectedOption: {
    borderColor: '#000',
    backgroundColor: '#f8f8f8'
  },
  optionImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500'
  },
  optionSubtext: {
    fontSize: 14,
    color: '#666'
  },
  // Color selection styles
  selectedColorPreview: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  colorOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  colorInfo: {
    flex: 1
  },
  // Monogram styles
  monogramContainer: {
    padding: 20,
    paddingBottom: 40
  },
  monogramSection: {
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10
  },
  chooseOne: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic'
  },
  initialsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    fontSize: 16,
    width: 80,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  monogramOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    width: '30%',
    alignItems: 'center'
  },
  selectedMonogramOption: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5'
  },
  fontOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  fontOption: {
    alignItems: 'center',
    width: '30%'
  },
  selectedFontOption: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 5
  },
  fontSample: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'serif'
  },
  fontName: {
    fontSize: 14
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#000'
  },
  // Yes/No styles
  yesnoContainer: {
    paddingVertical: 20
  },
  yesnoOption: {
    marginBottom: 25
  },
  yesnoQuestion: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500'
  },
  yesnoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  yesnoButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  selectedYesNo: {
    backgroundColor: '#000',
    borderColor: '#000'
  },
  yesnoButtonText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  selectedYesNoText: {
    color: '#fff'
  },
  // Next button
  nextButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  disabledButton: {
    opacity: 0.5
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default CustomizeSuitScreen;