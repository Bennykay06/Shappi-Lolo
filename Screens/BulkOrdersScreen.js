import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BulkOrdersScreen = () => {
  const navigation = useNavigation();
  
  // Form state
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    eventName: '',
    eventDate: '',
    guestCount: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    specialRequirements: '',
    budget: ''
  });

  // Event types
  const eventTypes = [
    {
      id: 1,
      name: 'Wedding Party',
      description: 'Suits, dresses, and attire for the entire wedding party',
      image: require('../assets/images/suits.jpg'),
      minOrder: 4,
      discount: '15% off orders of 6+',
      icon: 'heart'
    },
    {
      id: 2,
      name: 'Corporate Event',
      description: 'Professional uniforms and business attire',
      image: require('../assets/images/blazzers.webp'),
      minOrder: 10,
      discount: '20% off orders of 20+',
      icon: 'business'
    },
    {
      id: 3,
      name: 'Funeral Attire',
      description: 'Respectful formal wear for memorial services',
      image: require('../assets/images/men shirt.jpg'),
      minOrder: 3,
      discount: '10% off all orders',
      icon: 'flower'
    },
    {
      id: 4,
      name: 'Special Occasion',
      description: 'Graduations, anniversaries, and celebrations',
      image: require('../assets/images/dress pant.webp'),
      minOrder: 5,
      discount: '12% off orders of 8+',
      icon: 'star'
    }
  ];

  // Pricing tiers
  const pricingTiers = [
    {
      range: '3-5 pieces',
      discount: '5% off',
      timeframe: '3-4 weeks'
    },
    {
      range: '6-10 pieces',
      discount: '10% off',
      timeframe: '4-5 weeks'
    },
    {
      range: '11-20 pieces',
      discount: '15% off',
      timeframe: '5-6 weeks'
    },
    {
      range: '21+ pieces',
      discount: '20% off',
      timeframe: '6-8 weeks'
    }
  ];

  const handleSubmit = () => {
    if (!selectedEventType || !orderDetails.eventName || !orderDetails.contactName || !orderDetails.contactPhone || !orderDetails.guestCount) {
      Alert.alert('Incomplete Information', 'Please fill in all required fields.');
      return;
    }

    // Create bulk order request
    const bulkOrderRequest = {
      id: Date.now().toString(),
      eventType: selectedEventType,
      details: orderDetails,
      submittedAt: new Date(),
      status: 'pending_consultation'
    };

    console.log('Bulk order request:', bulkOrderRequest);
    
    Alert.alert(
      'Request Submitted!',
      'Thank you for your bulk order inquiry. Our team will contact you within 24 hours to discuss your requirements and schedule a consultation.',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bulk Orders</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Group & Event Attire</Text>
          <Text style={styles.introText}>
            Whether it's a wedding, corporate event, or special occasion, we provide custom tailoring for groups of all sizes with special pricing and dedicated service.
          </Text>
        </View>

        {/* Event Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Event Type</Text>
          {eventTypes.map((eventType) => (
            <TouchableOpacity
              key={eventType.id}
              style={[
                styles.eventCard,
                selectedEventType?.id === eventType.id && styles.selectedCard
              ]}
              onPress={() => setSelectedEventType(eventType)}
            >
              <Image source={eventType.image} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <View style={styles.eventHeader}>
                  <Ionicons name={eventType.icon} size={20} color="#007AFF" />
                  <Text style={styles.eventName}>{eventType.name}</Text>
                  {selectedEventType?.id === eventType.id && (
                    <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
                  )}
                </View>
                <Text style={styles.eventDescription}>{eventType.description}</Text>
                <View style={styles.eventDetails}>
                  <Text style={styles.minOrder}>Min: {eventType.minOrder} pieces</Text>
                  <Text style={styles.discount}>{eventType.discount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pricing Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Volume Pricing</Text>
          <View style={styles.pricingContainer}>
            {pricingTiers.map((tier, index) => (
              <View key={index} style={styles.pricingTier}>
                <Text style={styles.pricingRange}>{tier.range}</Text>
                <Text style={styles.pricingDiscount}>{tier.discount}</Text>
                <Text style={styles.pricingTimeframe}>{tier.timeframe}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Event Details Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Event Name *</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.eventName}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, eventName: text}))}
              placeholder="e.g., Smith-Johnson Wedding"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Event Date</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.eventDate}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, eventDate: text}))}
              placeholder="MM/DD/YYYY"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Approximate Number of People *</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.guestCount}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, guestCount: text}))}
              placeholder="e.g., 12"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Budget Range (Optional)</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.budget}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, budget: text}))}
              placeholder="e.g., $2000-3000"
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Contact Name *</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.contactName}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, contactName: text}))}
              placeholder="Your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.contactPhone}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, contactPhone: text}))}
              placeholder="Your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={orderDetails.contactEmail}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, contactEmail: text}))}
              placeholder="your.email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Special Requirements</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={orderDetails.specialRequirements}
              onChangeText={(text) => setOrderDetails(prev => ({...prev, specialRequirements: text}))}
              placeholder="Color preferences, style requirements, timeline constraints, etc."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You Get</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.benefitText}>Free consultation and planning</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.benefitText}>Volume discounts on large orders</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.benefitText}>Dedicated project manager</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.benefitText}>Coordinated fitting appointments</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.benefitText}>Guaranteed delivery timeline</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.benefitText}>Group styling coordination</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedEventType || !orderDetails.eventName || !orderDetails.contactName || !orderDetails.contactPhone || !orderDetails.guestCount) 
            && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!selectedEventType || !orderDetails.eventName || !orderDetails.contactName || !orderDetails.contactPhone || !orderDetails.guestCount}
        >
          <Ionicons name="send" size={20} color="white" style={{marginRight: 8}} />
          <Text style={styles.submitButtonText}>Submit Bulk Order Request</Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  introSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  introText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#007AFF',
    backgroundColor: '#f8f9ff',
  },
  eventImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  eventInfo: {
    flex: 1,
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minOrder: {
    fontSize: 12,
    color: '#666',
  },
  discount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  pricingContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pricingTier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pricingRange: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  pricingDiscount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  pricingTimeframe: {
    fontSize: 12,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  benefitsList: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BulkOrdersScreen;