import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../Context/CartContext';
import { Ionicons } from '@expo/vector-icons';

const CustomizeShirtScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { shirt, item } = route.params || {};
  const product = shirt || item;
  console.log('Customizing shirt:', product);
  
  // Track current step (1-7 for shirts)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Store all user selections for shirt
  const [selections, setSelections] = useState({
    collar: null,
    cuffs: null,
    fit: null,
    color: null,
    
    // Monogram options
    monogram: {
      enabled: null,
      initials: '',
      location: null,
      font: null,
      color: null
    },
    
    // Additional shirt options
    pocketStyle: null,
    hemStyle: null,
    extraLength: null
  });

  // Shirt-specific customization options
  const shirtOptions = {
    collar: [
      { id: 1, name: 'Point Collar', desc: 'Classic formal style', img: require('../assets/images/men shirt.jpg') },
      { id: 2, name: 'Spread Collar', desc: 'Modern professional', img: require('../assets/images/men shirt.jpg') },
      { id: 3, name: 'Button Down', desc: 'Casual versatile', img: require('../assets/images/men shirt.jpg') }
    ],
    cuffs: [
      { id: 1, name: 'One Button', desc: 'Classic everyday', img: require('../assets/images/men shirt.jpg') },
      { id: 2, name: 'Two Button', desc: 'Traditional style', img: require('../assets/images/men shirt.jpg') },
      { id: 3, name: 'French Cuffs', desc: 'Formal elegant', img: require('../assets/images/men shirt.jpg') }
    ],
    fit: [
      { id: 1, name: 'Slim Fit', desc: 'Modern tailored', img: require('../assets/images/men shirt.jpg') },
      { id: 2, name: 'Regular Fit', desc: 'Classic comfort', img: require('../assets/images/men shirt.jpg') },
      { id: 3, name: 'Relaxed Fit', desc: 'Comfortable loose', img: require('../assets/images/men shirt.jpg') }
    ],
    color: [
      { id: 1, name: 'White', desc: 'Classic clean', color: '#ffffff', img: require('../assets/images/men shirt.jpg') },
      { id: 2, name: 'Light Blue', desc: 'Professional fresh', color: '#add8e6', img: require('../assets/images/men shirt.jpg') },
      { id: 3, name: 'Navy', desc: 'Sophisticated bold', color: '#000080', img: require('../assets/images/men shirt.jpg') },
      { id: 4, name: 'Pink', desc: 'Modern stylish', color: '#ffc0cb', img: require('../assets/images/men shirt.jpg') },
      { id: 5, name: 'Gray', desc: 'Versatile neutral', color: '#808080', img: require('../assets/images/men shirt.jpg') }
    ]
  };

  // Monogram customization options
  const monogramLocations = [
    { id: 1, name: 'Chest' },
    { id: 2, name: 'Cuff' },
    { id: 3, name: 'Inside Collar' }
  ];

  const monogramFonts = [
    { id: 1, name: 'Classic', sample: 'AB' },
    { id: 2, name: 'Modern', sample: 'AB' },
    { id: 3, name: 'Script', sample: 'AB' }
  ];

  const threadColors = [
    { id: 1, name: 'White', color: '#ffffff' },
    { id: 2, name: 'Black', color: '#000000' },
    { id: 3, name: 'Navy', color: '#001f3f' },
    { id: 4, name: 'Silver', color: '#dddddd' }
  ];

  // Get configuration for current step
  const getCurrentOptions = () => {
    switch(currentStep) {
      case 1: return { 
        title: 'Collar Style', 
        options: shirtOptions.collar,
        selected: selections.collar,
        type: 'image',
        field: 'collar'
      };
      case 2: return { 
        title: 'Cuff Style', 
        options: shirtOptions.cuffs,
        selected: selections.cuffs,
        type: 'image',
        field: 'cuffs'
      };
      case 3: return { 
        title: 'Fit Style', 
        options: shirtOptions.fit,
        selected: selections.fit,
        type: 'image',
        field: 'fit'
      };
      case 4: return { 
        title: 'Shirt Color', 
        options: shirtOptions.color,
        selected: selections.color,
        type: 'color',
        field: 'color'
      };
      case 5: return {
        title: 'Monogram',
        type: 'monogram'
      };
      case 6: return {
        title: 'Additional Options',
        options: [
          { id: 'pocketStyle', name: 'Do you want a chest pocket?', price: 0 },
          { id: 'hemStyle', name: 'Do you want a curved hem?', price: 0 }
        ],
        type: 'yesno'
      };
      case 7: return {
        title: 'Final Touches',
        options: [
          { id: 'extraLength', name: 'Do you need extra shirt length?', price: 15 }
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

  // Handle navigation to next step
  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit all selections and add to cart
      const customizedShirt = {
        id: `${product?.id || 'shirt'}_${Date.now()}`, // Unique ID for customized shirt
        name: product?.name || 'Custom Shirt',
        price: product?.price || 0,
        selectedSize: product?.selectedSize || 'Default',
        quantity: product?.quantity || 1,
        image: product?.image,
        customizations: selections,
        category: 'shirt',
        isCustomized: true
      };
      
      addToCart(customizedShirt);
      Alert.alert(
        'Shirt Customized!', 
        `Your customized ${product?.name || 'shirt'} has been added to cart.`,
        [
          {
            text: 'Continue Shopping',
            onPress: () => navigation.navigate('MainTabs', { screen: 'ShopTab' })
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.content}>
        {/* Step indicators (1-6 for shirts) */}
        <View style={styles.stepsContainer}>
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
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

      {/* Image selection screens (steps 1-3) */}
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

      {/* Color selection screen (step 4) */}
      {type === 'color' && (
        <>
          <View style={styles.divider} />

          {/* Selected color preview */}
          {selected && (
            <>
              <View style={[styles.colorPreview, { backgroundColor: options.find(opt => opt.id === selected).color }]} />
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
                  styles.optionButton,
                  selected === option.id && styles.selectedOption
                ]}
                onPress={() => handleImageSelect(option.id)}
              >
                <View style={[styles.colorSwatch, { backgroundColor: option.color }]} />
                <View>
                  <Text style={styles.optionText}>{option.name}</Text>
                  <Text style={styles.optionSubtext}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Monogram screen (step 5) */}
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
                  placeholder="AB"
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
                <Text style={styles.sectionTitle}>Select a thread color</Text>
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

      {/* Yes/No options screens (steps 5-6) */}
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
          {currentStep === 7 ? 'DONE' : 'NEXT'}
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
  // Color selection styles
  colorPreview: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  colorSwatch: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  }
});

export default CustomizeShirtScreen;