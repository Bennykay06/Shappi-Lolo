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

export default function AppointmentScreen({ navigation }) {
  const { addAppointment, loading } = useAppointments();
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');

  const services = [
    { id: 'consultation', name: 'Design Consultation', duration: '45 min', price: 'Free' },
    { id: 'measurement', name: 'Measurement & Design', duration: '60 min', price: 'Free' },
    { id: 'alteration', name: 'Alterations', duration: '20 min', price: '$25' },
    { id: 'bulk-planning', name: 'Bulk Order Planning', duration: '60 min', price: 'Free' }
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
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const selectedServiceData = services.find(s => s.id === selectedService);
      
      const appointmentData = {
        type: 'general',
        serviceType: selectedService,
        serviceName: selectedServiceData.name,
        duration: selectedServiceData.duration,
        price: selectedServiceData.price,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientPhone,
        notes,
      };

      const savedAppointment = await addAppointment(appointmentData);

      // Navigate to confirmation screen
      navigation.navigate('AppointmentConfirmation', {
        appointmentId: savedAppointment.id
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
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
        <Text style={styles.title}>Book Appointment</Text>
        <Text style={styles.subtitle}>Schedule your visit with our master tailors</Text>
      </View>

      {/* Service Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Service</Text>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceOption,
              selectedService === service.id && styles.selectedOption
            ]}
            onPress={() => setSelectedService(service.id)}
          >
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDuration}>{service.duration} • {service.price}</Text>
            </View>
            <View style={[
              styles.radioButton,
              selectedService === service.id && styles.radioButtonSelected
            ]} />
          </TouchableOpacity>
        ))}
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
          placeholder="Special requests or notes (optional)"
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
            {loading ? 'Booking...' : 'Confirm Booking'}
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
  serviceOption: {
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
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
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