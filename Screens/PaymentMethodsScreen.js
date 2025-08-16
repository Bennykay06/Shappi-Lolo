import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentMethodsScreen = ({ navigation }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      cardType: 'visa',
      lastFour: '4532',
      expiryMonth: '12',
      expiryYear: '25',
      holderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      cardType: 'mastercard',
      lastFour: '8901',
      expiryMonth: '08',
      expiryYear: '26',
      holderName: 'John Doe',
      isDefault: false
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [addType, setAddType] = useState('card');
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
  });
  const [paypalEmail, setPaypalEmail] = useState('');

  const getCardIcon = (cardType) => {
    switch (cardType) {
      case 'visa':
        return 'card';
      case 'mastercard':
        return 'card';
      case 'amex':
        return 'card';
      default:
        return 'card';
    }
  };

  const getCardColor = (cardType) => {
    switch (cardType) {
      case 'visa':
        return '#1a1f71';
      case 'mastercard':
        return '#eb001b';
      case 'amex':
        return '#006fcf';
      default:
        return '#666';
    }
  };

  const handleAddPaymentMethod = () => {
    setNewCard({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
    });
    setShowAddModal(true);
  };

  const handleConnectPayPal = () => {
    setPaypalEmail('');
    setShowPayPalModal(true);
  };

  const handleSaveCard = () => {
    if (!newCard.cardNumber || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv || !newCard.holderName) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }

    const cardType = getCardTypeFromNumber(newCard.cardNumber);
    const newId = Math.max(...paymentMethods.map(p => p.id)) + 1;
    
    const newMethod = {
      id: newId,
      type: 'card',
      cardType: cardType,
      lastFour: newCard.cardNumber.slice(-4),
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      holderName: newCard.holderName,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddModal(false);
    Alert.alert('Success', 'Payment method added successfully');
  };

  const handleSavePayPal = () => {
    if (!paypalEmail) {
      Alert.alert('Error', 'Please enter your PayPal email address');
      return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paypalEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Check if PayPal account already exists
    const existingPayPal = paymentMethods.find(method => 
      method.type === 'paypal' && method.email === paypalEmail
    );

    if (existingPayPal) {
      Alert.alert('Error', 'This PayPal account is already connected');
      return;
    }

    const newId = Math.max(...paymentMethods.map(p => p.id)) + 1;
    
    const newPayPalMethod = {
      id: newId,
      type: 'paypal',
      email: paypalEmail,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newPayPalMethod]);
    setShowPayPalModal(false);
    Alert.alert('Success', 'PayPal account connected successfully');
  };

  const getCardTypeFromNumber = (number) => {
    const firstDigit = number.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    if (firstDigit === '3') return 'amex';
    return 'unknown';
  };

  const handleDeletePaymentMethod = (id) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setPaymentMethods(paymentMethods.filter(method => method.id !== id))
        }
      ]
    );
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const PaymentCard = ({ method }) => (
    <View style={styles.paymentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          {method.type === 'card' ? (
            <>
              <Ionicons 
                name={getCardIcon(method.cardType)} 
                size={24} 
                color={getCardColor(method.cardType)} 
              />
              <View style={styles.cardDetails}>
                <Text style={styles.cardType}>
                  {method.cardType.toUpperCase()} •••• {method.lastFour}
                </Text>
                <Text style={styles.cardExpiry}>
                  Expires {method.expiryMonth}/{method.expiryYear}
                </Text>
                <Text style={styles.cardHolder}>{method.holderName}</Text>
              </View>
            </>
          ) : (
            <>
              <Ionicons name="logo-paypal" size={24} color="#0070ba" />
              <View style={styles.cardDetails}>
                <Text style={styles.cardType}>PayPal</Text>
                <Text style={styles.cardExpiry}>{method.email}</Text>
              </View>
            </>
          )}
        </View>
        
        <View style={styles.cardActions}>
          {method.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Default</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => handleDeletePaymentMethod(method.id)}>
            <Ionicons name="trash" size={20} color="#d32f2f" />
          </TouchableOpacity>
        </View>
      </View>

      {!method.isDefault && (
        <TouchableOpacity 
          style={styles.setDefaultButton}
          onPress={() => handleSetDefault(method.id)}
        >
          <Text style={styles.setDefaultText}>Set as Default</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity onPress={handleAddPaymentMethod} style={styles.addButton}>
          <Ionicons name="add" size={24} color="#6200ee" />
        </TouchableOpacity>
      </View>

      {/* Payment Methods List */}
      <ScrollView style={styles.content}>
        {paymentMethods.map((method) => (
          <PaymentCard key={method.id} method={method} />
        ))}

        {/* Add Payment Options */}
        <View style={styles.addSection}>
          <Text style={styles.addSectionTitle}>Add Payment Method</Text>
          
          <TouchableOpacity style={styles.addOption} onPress={handleAddPaymentMethod}>
            <Ionicons name="card" size={24} color="#666" />
            <Text style={styles.addOptionText}>Add Card</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addOption} onPress={handleConnectPayPal}>
            <Ionicons name="logo-paypal" size={24} color="#0070ba" />
            <Text style={styles.addOptionText}>Connect PayPal</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {paymentMethods.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="card-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No payment methods added yet</Text>
          </View>
        )}
      </ScrollView>

      {/* Add Card Modal */}
      <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Card</Text>
            <TouchableOpacity onPress={handleSaveCard}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number *</Text>
              <TextInput
                style={styles.input}
                value={newCard.cardNumber}
                onChangeText={(text) => setNewCard({ ...newCard, cardNumber: text.replace(/\s/g, '') })}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={16}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Expiry Month *</Text>
                <TextInput
                  style={styles.input}
                  value={newCard.expiryMonth}
                  onChangeText={(text) => setNewCard({ ...newCard, expiryMonth: text })}
                  placeholder="MM"
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>Expiry Year *</Text>
                <TextInput
                  style={styles.input}
                  value={newCard.expiryYear}
                  onChangeText={(text) => setNewCard({ ...newCard, expiryYear: text })}
                  placeholder="YY"
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                <Text style={styles.label}>CVV *</Text>
                <TextInput
                  style={styles.input}
                  value={newCard.cvv}
                  onChangeText={(text) => setNewCard({ ...newCard, cvv: text })}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cardholder Name *</Text>
              <TextInput
                style={styles.input}
                value={newCard.holderName}
                onChangeText={(text) => setNewCard({ ...newCard, holderName: text })}
                placeholder="John Doe"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.securityInfo}>
              <Ionicons name="shield-checkmark" size={20} color="#4caf50" />
              <Text style={styles.securityText}>
                Your payment information is encrypted and secure
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Connect PayPal Modal */}
      <Modal visible={showPayPalModal} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowPayPalModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Connect PayPal</Text>
            <TouchableOpacity onPress={handleSavePayPal}>
              <Text style={styles.saveButton}>Connect</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.paypalHeader}>
              <Ionicons name="logo-paypal" size={48} color="#0070ba" />
              <Text style={styles.paypalTitle}>Connect your PayPal account</Text>
              <Text style={styles.paypalSubtitle}>
                Enter your PayPal email address to link your account for secure payments
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PayPal Email Address *</Text>
              <TextInput
                style={styles.input}
                value={paypalEmail}
                onChangeText={setPaypalEmail}
                placeholder="your-email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.paypalInfo}>
              <View style={styles.infoRow}>
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
                <Text style={styles.infoText}>Secure connection with PayPal</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
                <Text style={styles.infoText}>No additional fees</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="checkmark-circle" size={20} color="#4caf50" />
                <Text style={styles.infoText}>Easy refunds and buyer protection</Text>
              </View>
            </View>

            <View style={styles.paypalDisclaimer}>
              <Text style={styles.disclaimerText}>
                By connecting your PayPal account, you agree to PayPal's terms of service. 
                You can disconnect your account at any time from the payment methods page.
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardDetails: {
    marginLeft: 12,
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  cardHolder: {
    fontSize: 14,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  defaultBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  defaultText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  setDefaultButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#6200ee',
    marginTop: 12,
  },
  setDefaultText: {
    color: '#6200ee',
    fontSize: 12,
    fontWeight: '600',
  },
  addSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  addSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  addOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  addOptionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cancelButton: {
    color: '#666',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveButton: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  securityText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  paypalHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  paypalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  paypalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  paypalInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  paypalDisclaimer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff9c4',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});

export default PaymentMethodsScreen;