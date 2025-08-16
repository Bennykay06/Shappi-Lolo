import React, { useState, useEffect } from 'react';
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
import { useMeasurements } from '../Context/MeasurementContext';

const { width } = Dimensions.get('window');

export default function FittingScreen({ navigation }) {
  const { addAppointment, loading } = useAppointments();
  const { currentMeasurements, hasValidMeasurements } = useMeasurements();
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    shoulders: '',
    sleeves: '',
    inseam: '',
    neck: ''
  });
  const [notes, setNotes] = useState('');

  // Auto-populate measurements from user's saved measurements
  useEffect(() => {
    if (currentMeasurements && hasValidMeasurements()) {
      setMeasurements({
        chest: currentMeasurements.chest || '',
        waist: currentMeasurements.waist || '',
        shoulders: currentMeasurements.shoulders || '',
        sleeves: currentMeasurements.sleeves || '',
        inseam: currentMeasurements.inseam || '',
        neck: currentMeasurements.neck || ''
      });
    }
  }, [currentMeasurements, hasValidMeasurements]);

  const fittingTypes = [
    { id: 'initial', name: 'Initial Measurements', duration: '45 min', description: 'First-time comprehensive body measurements' },
    { id: 'progress', name: 'Progress Fitting', duration: '30 min', description: 'Check fit during garment construction' },
    { id: 'final', name: 'Final Fitting', duration: '20 min', description: 'Final adjustments and completion' },
    { id: 'alteration', name: 'Alteration Fitting', duration: '25 min', description: 'Fitting for existing garment alterations' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
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
      const selectedTypeData = fittingTypes.find(t => t.id === selectedType);
      
      const appointmentData = {
        type: 'fitting',
        fittingType: selectedType,
        fittingName: selectedTypeData.name,
        duration: selectedTypeData.duration,
        description: selectedTypeData.description,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientPhone,
        measurements,
        notes,
      };

      const savedAppointment = await addAppointment(appointmentData);

      // Navigate to confirmation screen
      navigation.navigate('AppointmentConfirmation', {
        appointmentId: savedAppointment.id
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule fitting. Please try again.');
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
        <Text style={styles.title}>Fitting Session</Text>
        <Text style={styles.subtitle}>Schedule your measurement and fitting appointment</Text>
      </View>

      {/* Fitting Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Fitting Type</Text>
        {fittingTypes.map((type) => (
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
              <Text style={styles.typeDuration}>{type.duration}</Text>
              <Text style={styles.typeDescription}>{type.description}</Text>
            </View>
            <View style={[
              styles.radioButton,
              selectedType === type.id && styles.radioButtonSelected
            ]} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Current Measurements (Optional) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Measurements (Optional)</Text>
        <Text style={styles.sectionSubtitle}>
          {hasValidMeasurements() 
            ? 'Your saved measurements have been loaded. You can modify them if needed.' 
            : 'If you have previous measurements, please enter them below'
          }
        </Text>
        
        {hasValidMeasurements() && (
          <TouchableOpacity 
            style={styles.autoFillButton}
            onPress={() => navigation.navigate('ManualMeasurement')}
          >
            <Text style={styles.autoFillButtonText}>📏 Edit Saved Measurements</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.measurementGrid}>
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Chest (in)</Text>
            <TextInput
              style={styles.measurementInput}
              placeholder="40"
              value={measurements.chest}
              onChangeText={(text) => setMeasurements({...measurements, chest: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Waist (in)</Text>
            <TextInput
              style={styles.measurementInput}
              placeholder="34"
              value={measurements.waist}
              onChangeText={(text) => setMeasurements({...measurements, waist: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Shoulders (in)</Text>
            <TextInput
              style={styles.measurementInput}
              placeholder="18"
              value={measurements.shoulders}
              onChangeText={(text) => setMeasurements({...measurements, shoulders: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Sleeve (in)</Text>
            <TextInput
              style={styles.measurementInput}
              placeholder="34"
              value={measurements.sleeves}
              onChangeText={(text) => setMeasurements({...measurements, sleeves: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Inseam (in)</Text>
            <TextInput
              style={styles.measurementInput}
              placeholder="32"
              value={measurements.inseam}
              onChangeText={(text) => setMeasurements({...measurements, inseam: text})}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.measurementItem}>
            <Text style={styles.measurementLabel}>Neck (in)</Text>
            <TextInput
              style={styles.measurementInput}
              placeholder="16"
              value={measurements.neck}
              onChangeText={(text) => setMeasurements({...measurements, neck: text})}
              keyboardType="numeric"
            />
          </View>
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
          placeholder="Special requests or fitting preferences (optional)"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
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
            {loading ? 'Scheduling...' : 'Schedule Fitting'}
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
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
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
  measurementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  measurementItem: {
    width: (width - 80) / 2,
    marginBottom: 15,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  measurementInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#fff',
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
    width: (width - 80) / 4,
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
    height: 80,
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
  autoFillButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  autoFillButtonText: {
    color: '#2c3e50',
    fontSize: 14,
    fontWeight: '600',
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