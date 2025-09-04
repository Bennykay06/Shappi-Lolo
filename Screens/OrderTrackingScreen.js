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

const OrderTrackingScreen = () => {
  const navigation = useNavigation();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  // Sample order data (in real app, this would come from API)
  const sampleOrders = {
    'MT2024001': {
      id: 'MT2024001',
      customerName: 'John Smith',
      items: [
        { name: 'Custom Navy Suit', quantity: 1 },
        { name: 'Custom White Shirt', quantity: 2 }
      ],
      orderDate: '2024-01-15',
      estimatedCompletion: '2024-02-15',
      currentStatus: 3,
      totalCost: '$899',
      nextFitting: '2024-02-08',
      tailor: 'Master Taylor Johnson'
    },
    'MT2024002': {
      id: 'MT2024002',
      customerName: 'Sarah Johnson',
      items: [
        { name: 'Custom Blazer', quantity: 1 },
        { name: 'Custom Pants', quantity: 1 }
      ],
      orderDate: '2024-01-20',
      estimatedCompletion: '2024-02-20',
      currentStatus: 2,
      totalCost: '$549',
      nextFitting: '2024-02-10',
      tailor: 'Senior Taylor Maria'
    }
  };

  const orderStages = [
    {
      id: 1,
      title: 'Order Received',
      description: 'Your measurements and preferences have been recorded',
      icon: 'checkmark-circle'
    },
    {
      id: 2,
      title: 'Cutting & Preparation',
      description: 'Fabric is being cut according to your measurements',
      icon: 'cut'
    },
    {
      id: 3,
      title: 'Tailoring in Progress',
      description: 'Our master tailors are crafting your garments',
      icon: 'construct'
    },
    {
      id: 4,
      title: 'First Fitting Ready',
      description: 'Ready for your fitting appointment',
      icon: 'person'
    },
    {
      id: 5,
      title: 'Final Adjustments',
      description: 'Making final adjustments based on fitting',
      icon: 'build'
    },
    {
      id: 6,
      title: 'Quality Check',
      description: 'Final quality inspection and pressing',
      icon: 'checkmark-done-circle'
    },
    {
      id: 7,
      title: 'Ready for Pickup',
      description: 'Your custom clothing is ready!',
      icon: 'bag-check'
    }
  ];

  const handleTrackOrder = () => {
    const trimmedOrderNumber = orderNumber.trim().toUpperCase();
    
    if (!trimmedOrderNumber) {
      Alert.alert('Missing Information', 'Please enter your order number.');
      return;
    }

    if (sampleOrders[trimmedOrderNumber]) {
      setOrderDetails(sampleOrders[trimmedOrderNumber]);
    } else {
      Alert.alert(
        'Order Not Found', 
        'Please check your order number and try again.\n\nSample order numbers:\n• MT2024001\n• MT2024002'
      );
    }
  };

  const getStatusColor = (stageId, currentStatus) => {
    if (stageId <= currentStatus) return '#4CAF50'; // Green for completed
    if (stageId === currentStatus + 1) return '#FF9800'; // Orange for current
    return '#E0E0E0'; // Gray for pending
  };

  const getStatusIcon = (stageId, currentStatus) => {
    if (stageId <= currentStatus) return 'checkmark-circle';
    if (stageId === currentStatus + 1) return 'time';
    return 'ellipse';
  };

  const calculateDaysRemaining = (completionDate) => {
    const today = new Date();
    const completion = new Date(completionDate);
    const timeDiff = completion.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Your Order</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Number Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enter Order Number</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.orderInput}
              value={orderNumber}
              onChangeText={setOrderNumber}
              placeholder="Enter your order number (e.g., MT2024001)"
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
              <Text style={styles.trackButtonText}>Track</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.helpText}>
            <Ionicons name="information-circle" size={16} color="#666" />
            <Text style={styles.helpTextContent}>
              Your order number can be found in your confirmation email or receipt
            </Text>
          </View>
        </View>

        {/* Order Details */}
        {orderDetails && (
          <>
            {/* Order Summary */}
            <View style={styles.section}>
              <View style={styles.orderSummaryCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderNumber}>Order #{orderDetails.id}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>
                      {orderStages[orderDetails.currentStatus - 1]?.title}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.orderInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Customer:</Text>
                    <Text style={styles.infoValue}>{orderDetails.customerName}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Order Date:</Text>
                    <Text style={styles.infoValue}>{new Date(orderDetails.orderDate).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Estimated Completion:</Text>
                    <Text style={styles.infoValue}>
                      {new Date(orderDetails.estimatedCompletion).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Days Remaining:</Text>
                    <Text style={[styles.infoValue, styles.daysRemaining]}>
                      {calculateDaysRemaining(orderDetails.estimatedCompletion)} days
                    </Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total Cost:</Text>
                    <Text style={[styles.infoValue, styles.totalCost]}>{orderDetails.totalCost}</Text>
                  </View>
                </View>

                <View style={styles.itemsList}>
                  <Text style={styles.itemsTitle}>Items:</Text>
                  {orderDetails.items.map((item, index) => (
                    <Text key={index} style={styles.itemText}>
                      • {item.name} (Qty: {item.quantity})
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            {/* Progress Tracking */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Order Progress</Text>
              <View style={styles.progressContainer}>
                {orderStages.map((stage, index) => (
                  <View key={stage.id} style={styles.stageContainer}>
                    <View style={styles.stageContent}>
                      <View style={[
                        styles.stageIcon,
                        { backgroundColor: getStatusColor(stage.id, orderDetails.currentStatus) }
                      ]}>
                        <Ionicons 
                          name={getStatusIcon(stage.id, orderDetails.currentStatus)} 
                          size={20} 
                          color="white" 
                        />
                      </View>
                      <View style={styles.stageInfo}>
                        <Text style={[
                          styles.stageTitle,
                          stage.id <= orderDetails.currentStatus && styles.completedStage
                        ]}>
                          {stage.title}
                        </Text>
                        <Text style={styles.stageDescription}>
                          {stage.description}
                        </Text>
                      </View>
                    </View>
                    
                    {index < orderStages.length - 1 && (
                      <View style={[
                        styles.stageLine,
                        { backgroundColor: getStatusColor(stage.id + 1, orderDetails.currentStatus) }
                      ]} />
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Next Appointment */}
            {orderDetails.nextFitting && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Next Appointment</Text>
                <View style={styles.appointmentCard}>
                  <Ionicons name="calendar" size={24} color="#007AFF" />
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentTitle}>Fitting Appointment</Text>
                    <Text style={styles.appointmentDate}>
                      {new Date(orderDetails.nextFitting).toLocaleDateString()}
                    </Text>
                    <Text style={styles.appointmentTailor}>
                      with {orderDetails.tailor}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.rescheduleButton}>
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Contact Support */}
            <View style={styles.section}>
              <TouchableOpacity style={styles.supportButton}>
                <Ionicons name="chatbubble" size={20} color="#007AFF" />
                <Text style={styles.supportText}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
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
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  orderInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
    marginRight: 12,
  },
  trackButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  trackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  helpTextContent: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  orderSummaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  orderInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  daysRemaining: {
    color: '#FF9800',
  },
  totalCost: {
    color: '#4CAF50',
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stageContainer: {
    marginBottom: 24,
  },
  stageContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stageInfo: {
    flex: 1,
  },
  stageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  completedStage: {
    color: '#333',
  },
  stageDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  stageLine: {
    width: 2,
    height: 24,
    marginLeft: 19,
    marginTop: 8,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 2,
  },
  appointmentTailor: {
    fontSize: 14,
    color: '#666',
  },
  rescheduleButton: {
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  rescheduleText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  supportText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default OrderTrackingScreen;