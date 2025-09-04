import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppointments } from '../Context/AppointmentContext';

const AppointmentBookingScreen = () => {
  const navigation = useNavigation();
  const { addAppointment } = useAppointments();
  
  // Form state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Available services
  const services = [
    {
      id: 1,
      name: 'Initial Measurement',
      duration: '45 min',
      description: 'Complete body measurements for custom clothing',
      price: 'Free consultation'
    },
    {
      id: 2,
      name: 'Fitting Session',
      duration: '30 min',
      description: 'Try on and adjust your custom clothing',
      price: 'Included with order'
    },
    {
      id: 3,
      name: 'Consultation',
      duration: '30 min',
      description: 'Discuss fabrics, styles, and design options',
      price: 'Free consultation'
    },
    {
      id: 4,
      name: 'Bulk Order Planning',
      duration: '60 min',
      description: 'Plan wedding, corporate, or event attire',
      price: 'Free consultation'
    }
  ];

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (day 0)
      if (date.getDay() !== 0) {
        dates.push({
          id: i,
          date: date,
          day: date.getDate(),
          month: date.toLocaleDateString('en-US', { month: 'short' }),
          weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        });
      }
    }
    
    return dates.slice(0, 10); // Show 10 available dates
  };

  const availableDates = generateDates();

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !customerInfo.name || !customerInfo.phone) {
      Alert.alert('Incomplete Information', 'Please fill in all required fields.');
      return;
    }

    try {
      // Create appointment object
      const appointmentData = {
        service: selectedService,
        date: `${selectedDate.weekday}, ${selectedDate.month} ${selectedDate.day}`,
        time: selectedTime,
        customer: customerInfo,
        type: selectedService.name
      };

      // Save appointment to context
      await addAppointment(appointmentData);
      
      Alert.alert(
        'Appointment Booked!',
        `Your ${selectedService.name} is scheduled for ${selectedDate.weekday}, ${selectedDate.month} ${selectedDate.day} at ${selectedTime}.`,
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      Alert.alert('Booking Failed', 'There was an error booking your appointment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService?.id === service.id && styles.selectedCard
              ]}
              onPress={() => setSelectedService(service)}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.serviceDetails}>
                  <Text style={styles.serviceDuration}>{service.duration}</Text>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                </View>
              </View>
              {selectedService?.id === service.id && (
                <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {availableDates.map((date) => (
              <TouchableOpacity
                key={date.id}
                style={[
                  styles.dateCard,
                  selectedDate?.id === date.id && styles.selectedDateCard
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[
                  styles.weekday,
                  selectedDate?.id === date.id && styles.selectedDateText
                ]}>
                  {date.weekday}
                </Text>
                <Text style={[
                  styles.day,
                  selectedDate?.id === date.id && styles.selectedDateText
                ]}>
                  {date.day}
                </Text>
                <Text style={[
                  styles.month,
                  selectedDate?.id === date.id && styles.selectedDateText
                ]}>
                  {date.month}
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

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={customerInfo.name}
              onChangeText={(text) => setCustomerInfo(prev => ({...prev, name: text}))}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={customerInfo.phone}
              onChangeText={(text) => setCustomerInfo(prev => ({...prev, phone: text}))}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={customerInfo.email}
              onChangeText={(text) => setCustomerInfo(prev => ({...prev, email: text}))}
              placeholder="Enter your email address"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Special Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={customerInfo.notes}
              onChangeText={(text) => setCustomerInfo(prev => ({...prev, notes: text}))}
              placeholder="Any specific requirements or notes..."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedService || !selectedDate || !selectedTime || !customerInfo.name || !customerInfo.phone) 
            && styles.disabledButton
          ]}
          onPress={handleBooking}
          disabled={!selectedService || !selectedDate || !selectedTime || !customerInfo.name || !customerInfo.phone}
        >
          <Ionicons name="calendar" size={20} color="white" style={{marginRight: 8}} />
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        </TouchableOpacity>
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
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  servicePrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  dateScroll: {
    flexDirection: 'row',
  },
  dateCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    minWidth: 70,
  },
  selectedDateCard: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  weekday: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  month: {
    fontSize: 12,
    color: '#666',
  },
  selectedDateText: {
    color: 'white',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    alignItems: 'center',
  },
  selectedTimeSlot: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  selectedTimeText: {
    color: 'white',
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
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  bookButton: {
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
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppointmentBookingScreen;