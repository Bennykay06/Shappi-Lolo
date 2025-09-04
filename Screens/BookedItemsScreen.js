import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppointments } from '../Context/AppointmentContext';
import { useCart } from '../Context/CartContext';

const BookedItemsScreen = () => {
  const navigation = useNavigation();
  const { appointments, deleteAppointment } = useAppointments();
  const { cartItems } = useCart();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh - in real app you'd reload data
    setTimeout(() => setRefreshing(false), 1000);
  };

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#4CAF50';
      case 'confirmed': return '#2196F3';
      case 'pending': return '#FF9800';
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
    if (typeof dateString === 'string' && dateString.includes(',')) {
      return dateString;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Sample order requests - in real app this would come from a context/API
  const orderRequests = [
    {
      id: '1',
      type: 'Custom Suit',
      status: 'pending',
      requestDate: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      price: '$399',
      details: 'Navy blue custom suit with measurements taken'
    },
    {
      id: '2',
      type: 'Bulk Wedding Order',
      status: 'confirmed',
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedCompletion: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      price: '$2,400',
      details: '6 custom suits for wedding party'
    }
  ];

  const activeAppointments = appointments.filter(apt => 
    apt.status === 'scheduled' || apt.status === 'confirmed'
  );

  const pendingOrders = orderRequests.filter(order => 
    order.status === 'pending' || order.status === 'confirmed'
  );

  const TabButton = ({ title, isActive, onPress, count }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabButtonText, isActive && styles.activeTabButtonText]}>
        {title}
      </Text>
      {count > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const AppointmentCard = ({ appointment }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemInfo}>
          <Ionicons 
            name={getServiceIcon(appointment.service?.name || appointment.type)} 
            size={24} 
            color="#007AFF" 
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>
              {appointment.service?.name || appointment.type}
            </Text>
            <Text style={styles.itemSubtitle}>
              {formatDate(appointment.date)} at {appointment.time}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
          <Text style={styles.statusText}>
            {appointment.status || 'scheduled'}
          </Text>
        </View>
      </View>

      <View style={styles.itemContent}>
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

      <View style={styles.itemActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Reschedule', 'Feature coming soon!')}
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
  );

  const OrderCard = ({ order }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={styles.itemInfo}>
          <Ionicons 
            name="shirt" 
            size={24} 
            color="#4CAF50" 
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{order.type}</Text>
            <Text style={styles.itemSubtitle}>
              Requested on {formatDate(order.requestDate)}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.itemContent}>
        <Text style={styles.orderDetails}>{order.details}</Text>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color="#666" />
          <Text style={styles.detailText}>{order.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={styles.detailText}>
            Est. completion: {formatDate(order.estimatedCompletion)}
          </Text>
        </View>
      </View>

      <View style={styles.itemActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('OrderTracking')}
        >
          <Ionicons name="eye" size={16} color="#007AFF" />
          <Text style={styles.actionButtonText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.contactButton]}
          onPress={() => Alert.alert('Contact Support', 'Feature coming soon!')}
        >
          <Ionicons name="chatbubble" size={16} color="#FF9800" />
          <Text style={[styles.actionButtonText, styles.contactButtonText]}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const EmptyState = ({ type }) => (
    <View style={styles.emptyState}>
      <Ionicons 
        name={type === 'appointments' ? 'calendar-outline' : 'bag-outline'} 
        size={64} 
        color="#ccc" 
      />
      <Text style={styles.emptyStateTitle}>
        No {type === 'appointments' ? 'Appointments' : 'Orders'} Yet
      </Text>
      <Text style={styles.emptyStateText}>
        {type === 'appointments' 
          ? 'Book your first appointment to get started with custom tailoring'
          : 'Place your first order to see it here'
        }
      </Text>
      <TouchableOpacity 
        style={styles.emptyStateButton}
        onPress={() => {
          if (type === 'appointments') {
            navigation.navigate('AppointmentBooking');
          } else {
            navigation.navigate('MainTabs', { screen: 'ShopTab' });
          }
        }}
      >
        <Ionicons 
          name={type === 'appointments' ? 'calendar' : 'bag'} 
          size={20} 
          color="white" 
        />
        <Text style={styles.emptyStateButtonText}>
          {type === 'appointments' ? 'Book Appointment' : 'Browse Shop'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('AppointmentBooking')}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TabButton
          title="Appointments"
          isActive={activeTab === 'appointments'}
          onPress={() => setActiveTab('appointments')}
          count={activeAppointments.length}
        />
        <TabButton
          title="Orders"
          isActive={activeTab === 'orders'}
          onPress={() => setActiveTab('orders')}
          count={pendingOrders.length}
        />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'appointments' ? (
          activeAppointments.length > 0 ? (
            activeAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <EmptyState type="appointments" />
          )
        ) : (
          pendingOrders.length > 0 ? (
            pendingOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <EmptyState type="orders" />
          )
        )}
      </ScrollView>

      {/* Summary Footer */}
      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryCount}>{activeAppointments.length}</Text>
            <Text style={styles.summaryLabel}>Active Appointments</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryCount}>{pendingOrders.length}</Text>
            <Text style={styles.summaryLabel}>Pending Orders</Text>
          </View>
        </View>
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
  addButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: '#007AFF',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabButtonText: {
    color: 'white',
  },
  countBadge: {
    position: 'absolute',
    top: 4,
    right: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemSubtitle: {
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
  itemContent: {
    marginBottom: 12,
  },
  orderDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
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
  itemActions: {
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
  contactButton: {
    backgroundColor: '#fff8f0',
    borderColor: '#FF9800',
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
  contactButtonText: {
    color: '#FF9800',
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
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
  },
});

export default BookedItemsScreen;