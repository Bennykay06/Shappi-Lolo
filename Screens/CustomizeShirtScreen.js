import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCart } from '../Context/CartContext';

const CustomizeShirtScreen = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { shirt, item, viewOnly } = route.params || {};
  const product = shirt || item;
  console.log('Customizing shirt:', product);
  console.log('View only mode:', viewOnly);
  
  // Track current step (1-7 for shirts)
  const [currentStep, setCurrentStep] = useState(1);
  
  // Store all user selections for shirt - MTailor's exact flow
  const [selections, setSelections] = useState({
    fabric: null,        // Step 1: Choose fabric first
    collar: null,        // Step 2: Choose collar
    cuffs: null,         // Step 3: Choose cuff
    shirtLength: null,   // Step 4: Tucked vs untucked
    shirtCut: null,      // Step 5: Shirt cut/fit
    
    // Additional options - Step 6
    pocket: null,
    buttonColor: null,
    contrastCollar: null,
    contrastCuff: null,
    
    // Monogram options - Step 7
    monogram: {
      enabled: null,
      initials: '',
      location: null,
      font: null,
      color: null
    }
  });

  // MTailor's actual shirt customization options - EXACT FLOW
  const shirtOptions = {
    fabric: [
      { 
        id: 1, 
        name: 'White Oxford', 
        desc: 'Classic solid - perfect for any occasion', 
        img: require('../assets/images/shirt11.jpg'),
        preview: require('../assets/images/shirt12.jpg'),
        price: '$79',
        type: 'solid',
        popular: true
      },
      { 
        id: 2, 
        name: 'Light Blue Poplin', 
        desc: 'Professional solid - crisp and clean', 
        img: require('../assets/images/shirt13.jpg'),
        preview: require('../assets/images/shirt14.jpg'),
        price: '$79',
        type: 'solid',
        popular: true
      },
      { 
        id: 3, 
        name: 'Navy Stripe', 
        desc: 'Classic pattern - timeless professional', 
        img: require('../assets/images/shirt15.jpg'),
        preview: require('../assets/images/shirt16.jpg'),
        price: '$85',
        type: 'stripe'
      },
      { 
        id: 4, 
        name: 'Blue Check', 
        desc: 'Subtle pattern - modern business casual', 
        img: require('../assets/images/shirt17.jpg'),
        preview: require('../assets/images/shirt18.jpg'),
        price: '$85',
        type: 'check'
      },
      { 
        id: 5, 
        name: 'Navy Flannel', 
        desc: 'Warm texture - perfect for cooler weather', 
        img: require('../assets/images/shirt19.jpg'),
        preview: require('../assets/images/shirt20.jpg'),
        price: '$89',
        type: 'flannel'
      },
      { 
        id: 6, 
        name: 'Non-Iron White', 
        desc: 'Wrinkle-resistant - travel-friendly', 
        img: require('../assets/images/shirt11.jpg'),
        preview: require('../assets/images/shirt13.jpg'),
        price: '$89',
        type: 'non-iron'
      }
    ],
    collar: [
      { 
        id: 1, 
        name: 'Button Down', 
        desc: 'Casual American style - great for no tie', 
        img: require('../assets/images/button down.jpg'),
        preview: require('../assets/images/button down.jpg'),
        popular: true
      },
      { 
        id: 2, 
        name: 'Widespread', 
        desc: 'Modern professional - perfect for wider ties', 
        img: require('../assets/images/widespread.jpg'),
        preview: require('../assets/images/widespread.jpg'),
        popular: true
      },
      { 
        id: 3, 
        name: 'Straight Point', 
        desc: 'Classic and versatile - works with any tie', 
        img: require('../assets/images/straight point.jpg'),
        preview: require('../assets/images/straight point.jpg')
      },
      { 
        id: 4, 
        name: 'Casual Button Down', 
        desc: 'Relaxed button-down style - perfect for casual wear', 
        img: require('../assets/images/casual button down.jpg'),
        preview: require('../assets/images/casual button down.jpg')
      },
      { 
        id: 5, 
        name: 'Cutaway Band', 
        desc: 'Bold European style - formal occasions', 
        img: require('../assets/images/band.jpg'),
        preview: require('../assets/images/band.jpg')
      },
      { 
        id: 6, 
        name: 'Tuxedo Wingtip', 
        desc: 'Formal evening wear - perfect for bow ties', 
        img: require('../assets/images/tuxedo wingtip.jpg'),
        preview: require('../assets/images/tuxedo wingtip.jpg')
      },
      { 
        id: 7, 
        name: 'Tuxedo Widespread', 
        desc: 'Formal tuxedo style - elegant and sophisticated', 
        img: require('../assets/images/texedo widespread.jpg'),
        preview: require('../assets/images/texedo widespread.jpg')
      }
    ],
    cuffs: [
      { 
        id: 1, 
        name: 'One Button Round', 
        desc: 'Classic everyday style - comfortable fit', 
        img: require('../assets/images/one button round.jpg'),
        preview: require('../assets/images/one button round.jpg'),
        popular: true
      },
      { 
        id: 2, 
        name: 'Two Button Angled', 
        desc: 'Traditional formal - secure and refined', 
        img: require('../assets/images/two buttons angled.jpg'),
        preview: require('../assets/images/two buttons angled.jpg'),
        popular: true
      },
      { 
        id: 3, 
        name: 'French Cuff', 
        desc: 'Formal elegance - requires cufflinks', 
        img: require('../assets/images/french cuff.jpg'),
        preview: require('../assets/images/french cuff.jpg')
      }
    ],
    shirtLength: [
      { 
        id: 1, 
        name: 'Tucked', 
        desc: 'Longer tails - designed to stay tucked in', 
        img: require('../assets/images/tucked.jpg'),
        preview: require('../assets/images/tucked.jpg'),
        style: 'formal',
        popular: true
      },
      { 
        id: 2, 
        name: 'Untucked', 
        desc: 'Shorter tails - perfect for casual wear', 
        img: require('../assets/images/untucked.jpg'),
        preview: require('../assets/images/untucked.jpg'),
        style: 'casual'
      }
    ],
    shirtCut: [
      { 
        id: 1, 
        name: 'Slim Cut', 
        desc: 'Fitted silhouette - modern tailored look', 
        img: require('../assets/images/shirt11.jpg'),
        preview: require('../assets/images/shirt12.jpg'),
        measurements: 'Fitted through chest and waist',
        popular: true
      },
      { 
        id: 2, 
        name: 'Classic Cut', 
        desc: 'Traditional fit - comfortable with room to move', 
        img: require('../assets/images/shirt13.jpg'),
        preview: require('../assets/images/shirt14.jpg'),
        measurements: 'Relaxed fit through body'
      },
      { 
        id: 3, 
        name: 'Athletic Cut', 
        desc: 'Room in shoulders - tapered at waist', 
        img: require('../assets/images/shirt15.jpg'),
        preview: require('../assets/images/shirt16.jpg'),
        measurements: 'Extra room in chest and shoulders'
      }
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

  // MTailor's exact customization flow - Get configuration for current step
  const getCurrentOptions = () => {
    switch(currentStep) {
      case 1: return { 
        title: 'Choose Your Fabric', 
        subtitle: 'Select from solids, stripes, checks, and non-iron options',
        options: shirtOptions.fabric,
        selected: selections.fabric,
        type: 'fabric',
        field: 'fabric'
      };
      case 2: return { 
        title: 'Select Collar Style', 
        subtitle: 'Choose from 5 classic collar options',
        options: shirtOptions.collar,
        selected: selections.collar,
        type: 'image',
        field: 'collar'
      };
      case 3: return { 
        title: 'Choose Cuff Style', 
        subtitle: 'Pick from 3 most common cuff options',
        options: shirtOptions.cuffs,
        selected: selections.cuffs,
        type: 'image',
        field: 'cuffs'
      };
      case 4: return { 
        title: 'Shirt Length', 
        subtitle: 'Tucked or untucked style?',
        options: shirtOptions.shirtLength,
        selected: selections.shirtLength,
        type: 'image',
        field: 'shirtLength'
      };
      case 5: return { 
        title: 'Shirt Cut', 
        subtitle: 'Choose your preferred fit',
        options: shirtOptions.shirtCut,
        selected: selections.shirtCut,
        type: 'image',
        field: 'shirtCut'
      };
      case 6: return {
        title: 'Additional Options',
        subtitle: 'Customize extra details',
        options: [
          { id: 'pocket', name: 'Chest pocket', desc: 'Add a chest pocket', price: 0 },
          { id: 'buttonColor', name: 'Button color', desc: 'White or matching buttons', price: 0 },
          { id: 'contrastCollar', name: 'Contrast white collar', desc: 'Classic formal touch', price: 10 },
          { id: 'contrastCuff', name: 'Contrast white cuffs', desc: 'Professional detail', price: 10 }
        ],
        type: 'additional'
      };
      case 7: return {
        title: 'Monogram Options',
        subtitle: 'Add personal initials (optional)',
        type: 'monogram'
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
    
    if (type === 'image' || type === 'fabric') return !selected;
    
    if (type === 'additional') {
      // Additional options are optional, so never disabled
      return false;
    }
    
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
        price: parseFloat(selections.fabric?.price?.replace('$', '') || '79'),
        selectedSize: product?.selectedSize || 'Default',
        quantity: product?.quantity || 1,
        image: selections.fabric?.img || product?.image,
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

  // Handle adding pre-made shirt to cart (view only mode)
  const handleAddToCart = (shirtOption) => {
    const productToAdd = {
      id: `${shirtOption.id}_${Date.now()}`,
      name: shirtOption.name,
      price: parseFloat(shirtOption.price?.replace('$', '') || '79'),
      selectedSize: 'Default',
      quantity: 1,
      image: shirtOption.img,
      category: 'shirt',
      isCustomized: false
    };
    
    addToCart(productToAdd);
    Alert.alert(
      'Added to Cart!', 
      `${shirtOption.name} has been added to your cart.`,
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
  };

  // If in view only mode, show shirts without customization
  if (viewOnly) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.header}>Custom Dress Shirts</Text>
            <Text style={styles.subtitle}>View details and add to cart</Text>
          </View>
          <View style={styles.placeholder} />
        </View>
        
        <ScrollView style={styles.content} contentContainerStyle={styles.optionsContainer}>
          {shirtOptions.fabric.map((shirtOption) => (
            <View key={shirtOption.id} style={styles.viewOnlyOption}>
              <Image source={shirtOption.img} style={styles.viewOnlyImage} />
              <View style={styles.viewOnlyInfo}>
                <View style={styles.viewOnlyHeader}>
                  <Text style={styles.viewOnlyName}>{shirtOption.name}</Text>
                  {shirtOption.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.viewOnlyDesc}>{shirtOption.desc}</Text>
                <Text style={styles.viewOnlyPrice}>{shirtOption.price}</Text>
                <TouchableOpacity 
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(shirtOption)}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                  <Ionicons name="bag" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  const { title, subtitle, options, selected, type } = getCurrentOptions();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.header}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
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
                  selected === option.id && styles.selectedOption,
                  option.popular && styles.popularOption
                ]}
                onPress={() => handleImageSelect(option.id)}
              >
                <Image source={option.img} style={styles.optionImage} />
                <View style={styles.optionInfo}>
                  <View style={styles.optionHeader}>
                    <Text style={styles.optionText}>{option.name}</Text>
                    {option.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>POPULAR</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.optionSubtext}>{option.desc}</Text>
                  {option.measurements && (
                    <Text style={styles.measurementText}>{option.measurements}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Fabric selection screen (step 4) */}
      {type === 'fabric' && (
        <>
          <View style={styles.divider} />

          {/* Selected fabric preview */}
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
              <View style={styles.fabricDetails}>
                <Text style={styles.fabricComposition}>
                  {options.find(opt => opt.id === selected).composition}
                </Text>
                <Text style={styles.fabricPrice}>
                  {options.find(opt => opt.id === selected).price}
                </Text>
              </View>
            </>
          )}

          <View style={styles.divider} />

          {/* Fabric options list */}
          <ScrollView contentContainerStyle={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.fabricOption,
                  selected === option.id && styles.selectedOption,
                  option.popular && styles.popularOption
                ]}
                onPress={() => handleImageSelect(option.id)}
              >
                <Image source={option.img} style={styles.fabricImage} />
                <View style={styles.fabricInfo}>
                  <View style={styles.fabricHeader}>
                    <Text style={styles.optionText}>{option.name}</Text>
                    {option.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>POPULAR</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.optionSubtext}>{option.desc}</Text>
                  <Text style={styles.fabricComposition}>{option.composition}</Text>
                  <Text style={styles.fabricPrice}>{option.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Color selection screen (step 5) */}
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
          <ScrollView contentContainerStyle={styles.colorGrid}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.colorOptionCard,
                  selected === option.id && styles.selectedColorOption
                ]}
                onPress={() => handleImageSelect(option.id)}
              >
                <View style={styles.colorImageContainer}>
                  <Image source={option.img} style={styles.colorShirtImage} />
                  <View style={[styles.colorOverlay, { backgroundColor: option.color }]} />
                  {option.popular && (
                    <View style={styles.colorPopularBadge}>
                      <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                  )}
                </View>
                <View style={styles.colorInfo}>
                  <Text style={styles.colorName}>{option.name}</Text>
                  <Text style={styles.colorDesc}>{option.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {/* Additional options screen (step 6) */}
      {type === 'additional' && (
        <ScrollView contentContainerStyle={styles.additionalContainer}>
          <View style={styles.additionalGrid}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.additionalOption,
                  selections[option.id] === true && styles.selectedAdditional
                ]}
                onPress={() => setSelections(prev => ({ 
                  ...prev, 
                  [option.id]: !prev[option.id] 
                }))}
              >
                <View style={styles.additionalHeader}>
                  <Text style={styles.additionalName}>{option.name}</Text>
                  {option.price > 0 && (
                    <Text style={styles.additionalPrice}>+${option.price}</Text>
                  )}
                  {option.price === 0 && (
                    <Text style={styles.additionalFree}>FREE</Text>
                  )}
                </View>
                <Text style={styles.additionalDesc}>{option.desc}</Text>
                <View style={styles.checkboxContainer}>
                  <View style={[
                    styles.checkbox,
                    selections[option.id] && styles.checkedBox
                  ]}>
                    {selections[option.id] && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    {selections[option.id] ? 'Added' : 'Add this option'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Monogram screen (step 7) */}
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
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
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
  // MTailor-style enhancements
  optionInfo: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  popularBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  popularOption: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  measurementText: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
    marginTop: 4,
  },
  // Fabric-specific styles
  fabricOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fabricImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  fabricInfo: {
    flex: 1,
  },
  fabricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fabricDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  fabricComposition: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  fabricPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  // Color grid styles
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  colorOptionCard: {
    width: '48%',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedColorOption: {
    borderColor: '#007AFF',
    borderWidth: 3,
  },
  colorImageContainer: {
    position: 'relative',
    height: 120,
  },
  colorShirtImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  colorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  colorPopularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  colorInfo: {
    padding: 12,
  },
  colorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  colorDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  // Additional options styles
  additionalContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  additionalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  additionalOption: {
    width: '48%',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAdditional: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  additionalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  additionalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  additionalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  additionalFree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  additionalDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
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
  },
  // View only mode styles
  viewOnlyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  viewOnlyImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 16,
  },
  viewOnlyInfo: {
    flex: 1,
  },
  viewOnlyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  viewOnlyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  viewOnlyDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  viewOnlyPrice: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
});

export default CustomizeShirtScreen;