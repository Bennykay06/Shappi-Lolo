import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppointments } from '../Context/AppointmentContext';

const AppointmentsListScreen = () => {
  const navigation = useNavigation();
  const { appointments, deleteAppointment, updateAppointment } = useAppointments();

  const handleCancelAppointment = (appointmentId, serviceName) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel your ${serviceName} appointment?`,
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: () => deleteAppointment(appointmentId)
        }
      ]
    );
  };

  const handleReschedule = (appointmentId) => {
    Alert.alert(
      'Reschedule Appointment',
      'To reschedule your appointment, please book a new one and cancel this one.',
      [
        { text: 'OK' }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#4CAF50';
      case 'confirmed': return '#2196F3';
      case 'completed': return '#9E9E9E';
      case 'cancelled': return '#F44336';
      default: return '#666';
    }
  };

  const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case 'Initial Measurement': return 'resize';
      case 'Fitting Session': return 'shirt';
      case 'Consultation': return 'chatbubbles';
      case 'Bulk Order Planning': return 'people';
      default: return 'calendar';
    }
  };

  const formatDate = (dateString) => {
    if (dateString.includes(',')) {
      return dateString; // Already formatted
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled' || apt.status === 'confirmed');
  const pastAppointments = appointments.filter(apt => apt.status === 'completed' || apt.status === 'cancelled');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('AppointmentBooking')}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {appointments.length === 0 ? (
          // Empty State
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Appointments Yet</Text>
            <Text style={styles.emptyStateText}>
              Book your first appointment to get started with custom tailoring
            </Text>
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={() => navigation.navigate('AppointmentBooking')}
            >
              <Ionicons name="calendar" size={20} color="white" />
              <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                {upcomingAppointments.map((appointment) => (
                  <View key={appointment.id} style={styles.appointmentCard}>
                    <View style={styles.appointmentHeader}>
                      <View style={styles.serviceInfo}>
                        <Ionicons 
                          name={getServiceIcon(appointment.service?.name || appointment.type)} 
                          size={24} 
                          color="#007AFF" 
                        />
                        <View style={styles.serviceDetails}>
                          <Text style={styles.serviceName}>
                            {appointment.service?.name || appointment.type}
                          </Text>
                          <Text style={styles.serviceDescription}>
                            {appointment.service?.description || ''}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
                        <Text style={styles.statusText}>
                          {appointment.status || 'scheduled'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.appointmentDetails}>
                      <View style={styles.detailRow}>
                        <Ionicons name="calendar" size={16} color="#666" />
                        <Text style={styles.detailText}>
                          {formatDate(appointment.date)}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Ionicons name="time" size={16} color="#666" />
                        <Text style={styles.detailText}>{appointment.time}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Ionicons name="person" size={16} color="#666" />
                        <Text style={styles.detailText}>{appointment.customer?.name}</Text>
                      </View>
                      {appointment.customer?.phone && (
                        <View style={styles.detailRow}>
                          <Ionicons name="call" size={16} color="#666" />
                          <Text style={styles.detailText}>{appointment.customer.phone}</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.appointmentActions}>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => handleReschedule(appointment.id)}
                      >
                        <Ionicons name="calendar" size={16} color="#007AFF" />
                        <Text style={styles.actionButtonText}>Reschedule</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.actionButton, styles.cancelButton]}
                        onPress={() => handleCancelAppointment(appointment.id, appointment.service?.name || appointment.type)}
                      >
                        <Ionicons name="close" size={16} color="#F44336" />
                        <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Past Appointments</Text>
                {pastAppointments.map((appointment) => (
                  <View key={appointment.id} style={[styles.appointmentCard, styles.pastAppointmentCard]}>
                    <View style={styles.appointmentHeader}>
                      <View style={styles.serviceInfo}>
                        <Ionicons 
                          name={getServiceIcon(appointment.service?.name || appointment.type)} 
                          size={24} 
                          color="#999" 
                        />
                        <View style={styles.serviceDetails}>
                          <Text style={[styles.serviceName, styles.pastServiceName]}>
                            {appointment.service?.name || appointment.type}
                          </Text>
                          <Text style={styles.serviceDescription}>
                            {appointment.service?.description || ''}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
                        <Text style={styles.statusText}>
                          {appointment.status || 'completed'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.appointmentDetails}>
                      <View style={styles.detailRow}>
                        <Ionicons name="calendar" size={16} color="#999" />
                        <Text style={[styles.detailText, styles.pastDetailText]}>
                          {formatDate(appointment.date)}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Ionicons name="time" size={16} color="#999" />
                        <Text style={[styles.detailText, styles.pastDetailText]}>{appointment.time}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      {appointments.length > 0 && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('AppointmentBooking')}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}
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
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
  appointmentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pastAppointmentCard: {
    opacity: 0.7,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  serviceDetails: {
    marginLeft: 12,
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  pastServiceName: {
    color: '#666',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  appointmentDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  pastDetailText: {
    color: '#999',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f8f9ff',
    borderWidth: 1,
    borderColor: '#007AFF',
    flex: 0.48,
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff5f5',
    borderColor: '#F44336',
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  cancelButtonText: {
    color: '#F44336',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default AppointmentsListScreen;