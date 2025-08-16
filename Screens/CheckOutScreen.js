import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems, total } = route.params;
  const [shippingInfo, setShippingInfo] = React.useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    email: '',
    phone: ''
  });

  const [paymentInfo, setPaymentInfo] = React.useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handlePlaceOrder = () => {
    // Process order logic here
    navigation.navigate('OrderConfirmation', {
      orderNumber: Math.floor(Math.random() * 1000000),
      total: total
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>Shipping Information</Text>
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={shippingInfo.name}
          onChangeText={(text) => setShippingInfo({...shippingInfo, name: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingInfo.address}
          onChangeText={(text) => setShippingInfo({...shippingInfo, address: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingInfo.city}
          onChangeText={(text) => setShippingInfo({...shippingInfo, city: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          value={shippingInfo.zip}
          onChangeText={(text) => setShippingInfo({...shippingInfo, zip: text})}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={shippingInfo.email}
          onChangeText={(text) => setShippingInfo({...shippingInfo, email: text})}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={shippingInfo.phone}
          onChangeText={(text) => setShippingInfo({...shippingInfo, phone: text})}
          keyboardType="phone-pad"
        />
      </View>

      <Text style={styles.sectionHeader}>Payment Information</Text>
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChangeText={(text) => setPaymentInfo({...paymentInfo, cardNumber: text})}
          keyboardType="numeric"
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 10 }]}
            placeholder="MM/YY"
            value={paymentInfo.expiry}
            onChangeText={(text) => setPaymentInfo({...paymentInfo, expiry: text})}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChangeText={(text) => setPaymentInfo({...paymentInfo, cvv: text})}
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
      </View>

      <Text style={styles.sectionHeader}>Order Summary</Text>
      <View style={styles.summarySection}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.summaryItem}>
            <Text style={styles.summaryText}>{item.name} (x{item.quantity})</Text>
            <Text style={styles.summaryPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={handlePlaceOrder}>
        <Text style={styles.checkoutButtonText}>PLACE ORDER</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  formSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
  },
  summarySection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  summaryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;