import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import { useAppointments } from '../Context/AppointmentContext';

const { width } = Dimensions.get('window');

export default function ConsultationScreen({ navigation }) {
  const { addAppointment, loading } = useAppointments();
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [style, setStyle] = useState('');
  const [occasion, setOccasion] = useState('');
  const [notes, setNotes] = useState('');

  const consultationTypes = [
    { 
      id: 'design', 
      name: 'Design Consultation', 
      duration: '60 min', 
      price: 'Free',
      description: 'Discuss your vision, style preferences, and garment design'
    },
    { 
      id: 'fabric', 
      name: 'Fabric Selection', 
      duration: '45 min', 
      price: 'Free',
      description: 'Choose from our premium fabric collection'
    },
    { 
      id: 'wardrobe', 
      name: 'Wardrobe Planning', 
      duration: '90 min', 
      price: '$100',
      description: 'Comprehensive wardrobe analysis and planning session'
    },
    { 
      id: 'style', 
      name: 'Style Advice', 
      duration: '30 min', 
      price: 'Free',
      description: 'Personal styling tips and recommendations'
    }
  ];

  const styleOptions = [
    'Classic Traditional', 'Modern Contemporary', 'Business Professional', 
    'Formal Evening', 'Casual Smart', 'Vintage Inspired'
  ];

  const occasionOptions = [
    'Business/Office', 'Wedding', 'Formal Events', 'Daily Wear', 
    'Special Occasions', 'Travel Wardrobe'
  ];

  const budgetRanges = [
    'Under $1,000', '$1,000 - $2,500', '$2,500 - $5,000', 
    '$5,000 - $10,000', 'Above $10,000', 'Open Budget'
  ];

  const timeSlots = [
    '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM',
    '3:00 PM', '4:30 PM', '6:00 PM'
  ];

  const dates = [
    { date: '2024-01-15', day: 'Mon' },
    { date: '2024-01-16', day: 'Tue' },
    { date: '2024-01-17', day: 'Wed' },
    { date: '2024-01-18', day: 'Thu' },
    { date: '2024-01-19', day: 'Fri' }
  ];

  const handleBooking = async () => {
    if (!selectedType || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const selectedTypeData = consultationTypes.find(t => t.id === selectedType);
      
      const appointmentData = {
        type: 'consultation',
        consultationType: selectedType,
        consultationName: selectedTypeData.name,
        duration: selectedTypeData.duration,
        price: selectedTypeData.price,
        description: selectedTypeData.description,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientPhone,
        preferences: {
          budget,
          style,
          occasion,
        },
        notes,
      };

      const savedAppointment = await addAppointment(appointmentData);

      // Navigate to confirmation screen
      navigation.navigate('AppointmentConfirmation', {
        appointmentId: savedAppointment.id
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule consultation. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Design Consultation</Text>
        <Text style={styles.subtitle}>Reserve time with our design experts</Text>
      </View>

      {/* Consultation Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Consultation Type</Text>
        {consultationTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeOption,
              selectedType === type.id && styles.selectedOption
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <View style={styles.typeInfo}>
              <Text style={styles.typeName}>{type.name}</Text>
              <Text style={styles.typeDuration}>{type.duration} • {type.price}</Text>
              <Text style={styles.typeDescription}>{type.description}</Text>
            </View>
            <View style={[
              styles.radioButton,
              selectedType === type.id && styles.radioButtonSelected
            ]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Style Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style Preference</Text>
        <View style={styles.optionGrid}>
          {styleOptions.map((styleOption) => (
            <TouchableOpacity
              key={styleOption}
              style={[
                styles.optionChip,
                style === styleOption && styles.selectedChip
              ]}
              onPress={() => setStyle(styleOption)}
            >
              <Text style={[
                styles.chipText,
                style === styleOption && styles.selectedChipText
              ]}>
                {styleOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Occasion */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Primary Occasion</Text>
        <View style={styles.optionGrid}>
          {occasionOptions.map((occasionOption) => (
            <TouchableOpacity
              key={occasionOption}
              style={[
                styles.optionChip,
                occasion === occasionOption && styles.selectedChip
              ]}
              onPress={() => setOccasion(occasionOption)}
            >
              <Text style={[
                styles.chipText,
                occasion === occasionOption && styles.selectedChipText
              ]}>
                {occasionOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Budget Range */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Range (Optional)</Text>
        <View style={styles.optionGrid}>
          {budgetRanges.map((budgetOption) => (
            <TouchableOpacity
              key={budgetOption}
              style={[
                styles.optionChip,
                budget === budgetOption && styles.selectedChip
              ]}
              onPress={() => setBudget(budgetOption)}
            >
              <Text style={[
                styles.chipText,
                budget === budgetOption && styles.selectedChipText
              ]}>
                {budgetOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Date Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
          {dates.map((dateItem) => (
            <TouchableOpacity
              key={dateItem.date}
              style={[
                styles.dateOption,
                selectedDate === dateItem.date && styles.selectedDateOption
              ]}
              onPress={() => setSelectedDate(dateItem.date)}
            >
              <Text style={[
                styles.dayText,
                selectedDate === dateItem.date && styles.selectedDateText
              ]}>
                {dateItem.day}
              </Text>
              <Text style={[
                styles.dateText,
                selectedDate === dateItem.date && styles.selectedDateText
              ]}>
                {dateItem.date.split('-')[2]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Time Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTimeSlot
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[
                styles.timeText,
                selectedTime === time && styles.selectedTimeText
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Client Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name *"
          value={clientName}
          onChangeText={setClientName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Phone Number *"
          value={clientPhone}
          onChangeText={setClientPhone}
          keyboardType="phone-pad"
        />
        
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Tell us about your vision, inspiration, or specific requirements..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Book Button */}
      <View style={styles.bookingSection}>
        <TouchableOpacity 
          style={[styles.bookButton, loading && styles.bookButtonDisabled]} 
          onPress={handleBooking}
          disabled={loading}
        >
          <Text style={styles.bookButtonText}>
            {loading ? 'Reserving...' : 'Reserve Consultation'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 25,
    backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#f0f8ff',
    borderColor: '#2c3e50',
  },
  typeInfo: {
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  typeDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  typeDescription: {
    fontSize: 12,
    color: '#888',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  radioButtonSelected: {
    backgroundColor: '#2c3e50',
    borderColor: '#2c3e50',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#2c3e50',
    borderColor: '#2c3e50',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  selectedChipText: {
    color: '#fff',
  },
  dateScroll: {
    flexDirection: 'row',
  },
  dateOption: {
    alignItems: 'center',
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 60,
  },
  selectedDateOption: {
    backgroundColor: '#2c3e50',
    borderColor: '#2c3e50',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#fff',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: (width - 80) / 3,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedTimeSlot: {
    backgroundColor: '#2c3e50',
    borderColor: '#2c3e50',
  },
  timeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTimeText: {
    color: '#fff',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  bookingSection: {
    padding: 20,
    paddingBottom: 40,
  },
  bookButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookButtonDisabled: {
    backgroundColor: '#95a5a6',
    opacity: 0.7,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});