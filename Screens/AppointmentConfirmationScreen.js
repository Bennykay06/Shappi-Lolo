import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { useAppointments } from '../Context/AppointmentContext';

const { width } = Dimensions.get('window');

export default function AppointmentConfirmationScreen({ route, navigation }) {
  const { appointments } = useAppointments();
  const { appointmentId } = route.params || {};
  
  // Find the appointment by ID
  const appointment = appointments.find(apt => apt.id === appointmentId);

  if (!appointment) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Appointment Not Found</Text>
        <Text style={styles.errorText}>The appointment details could not be loaded.</Text>
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAppointmentIcon = (type) => {
    switch (type) {
      case 'consultation': return '💼';
      case 'fitting': return '📏';
      case 'general': return '📅';
      default: return '📅';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#27ae60';
      case 'completed': return '#3498db';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const handleShareAppointment = () => {
    const appointmentDetails = `
Appointment Confirmation
${getAppointmentIcon(appointment.type)} ${appointment.serviceName || appointment.consultationName || appointment.fittingName}

📅 Date: ${formatDate(appointment.date)}
⏰ Time: ${appointment.time}
👤 Client: ${appointment.clientName}
📞 Phone: ${appointment.clientPhone}
🆔 ID: ${appointment.id}

${appointment.notes ? `Notes: ${appointment.notes}` : ''}
    `.trim();

    Alert.alert(
      'Share Appointment',
      appointmentDetails,
      [
        { text: 'Copy', onPress: () => Alert.alert('Copied', 'Appointment details copied!') },
        { text: 'Close', style: 'cancel' }
      ]
    );
  };

  const renderMeasurements = () => {
    if (!appointment.measurements) return null;
    
    const validMeasurements = Object.entries(appointment.measurements)
      .filter(([key, value]) => value && parseFloat(value) > 0);
    
    if (validMeasurements.length === 0) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📏 Measurements</Text>
        {validMeasurements.map(([key, value]) => (
          <View key={key} style={styles.dataRow}>
            <Text style={styles.dataLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
            <Text style={styles.dataValue}>{value}"</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderPreferences = () => {
    if (!appointment.preferences) return null;
    
    const { budget, style, occasion } = appointment.preferences;
    if (!budget && !style && !occasion) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Preferences</Text>
        {style && (
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Style:</Text>
            <Text style={styles.dataValue}>{style}</Text>
          </View>
        )}
        {occasion && (
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Occasion:</Text>
            <Text style={styles.dataValue}>{occasion}</Text>
          </View>
        )}
        {budget && (
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Budget:</Text>
            <Text style={styles.dataValue}>{budget}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.successIcon}>
          <Text style={styles.successIconText}>✅</Text>
        </View>
        <Text style={styles.title}>Appointment Confirmed!</Text>
        <Text style={styles.subtitle}>Your booking has been successfully saved</Text>
      </View>

      {/* Appointment Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.appointmentIcon}>
            {getAppointmentIcon(appointment.type)}
          </Text>
          <View style={styles.summaryTitle}>
            <Text style={styles.serviceName}>
              {appointment.serviceName || appointment.consultationName || appointment.fittingName}
            </Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
                <Text style={styles.statusText}>{appointment.status.toUpperCase()}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.appointmentDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>{formatDate(appointment.date)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>⏰</Text>
            <Text style={styles.detailText}>{appointment.time}</Text>
          </View>
          {appointment.duration && (
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>⏱️</Text>
              <Text style={styles.detailText}>{appointment.duration}</Text>
            </View>
          )}
          {appointment.price && (
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>💰</Text>
              <Text style={styles.detailText}>{appointment.price}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Appointment ID */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🆔 Appointment Information</Text>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>ID:</Text>
          <Text style={styles.dataValue}>{appointment.id}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Type:</Text>
          <Text style={styles.dataValue}>{appointment.type}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Created:</Text>
          <Text style={styles.dataValue}>{formatDate(appointment.createdAt)}</Text>
        </View>
      </View>

      {/* Client Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Client Information</Text>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Name:</Text>
          <Text style={styles.dataValue}>{appointment.clientName}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Phone:</Text>
          <Text style={styles.dataValue}>{appointment.clientPhone}</Text>
        </View>
      </View>

      {/* Measurements (if applicable) */}
      {renderMeasurements()}

      {/* Preferences (if applicable) */}
      {renderPreferences()}

      {/* Notes */}
      {appointment.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Notes</Text>
          <Text style={styles.notesText}>{appointment.notes}</Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShareAppointment}
        >
          <Text style={styles.shareButtonText}>📤 Share Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.homeButtonText}>🏠 Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newAppointmentButton}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs' }],
            });
          }}
        >
          <Text style={styles.newAppointmentButtonText}>📅 Book Another Appointment</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          We'll send you a reminder 24 hours before your appointment.
        </Text>
        <Text style={styles.footerSubtext}>
          If you need to reschedule or cancel, please contact us at least 24 hours in advance.
        </Text>
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
    backgroundColor: '#27ae60',
    padding: 30,
    alignItems: 'center',
    paddingTop: 50,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successIconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appointmentIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  summaryTitle: {
    flex: 1,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  appointmentDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 25,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  dataLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  dataValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  notesText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  actionSection: {
    padding: 15,
    gap: 12,
  },
  shareButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#2c3e50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newAppointmentButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2c3e50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  newAppointmentButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
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