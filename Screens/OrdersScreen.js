import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const OrdersScreen = ({ navigation }) => {
  const orders = [
    {
      id: '1',
      orderNumber: '#123456',
      date: 'June 12, 2023',
      status: 'Delivered',
      total: 349.99,
      items: [
        { name: 'Navy Blue Business Suit', quantity: 1, price: 349.99 }
      ]
    },
    {
      id: '2',
      orderNumber: '#123457',
      date: 'May 28, 2023',
      status: 'Shipped',
      total: 499.98,
      items: [
        { name: 'Charcoal Gray Suit', quantity: 1, price: 399.99 },
        { name: 'Dress Shirt', quantity: 1, price: 99.99 }
      ]
    }
  ];

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { order: item })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={styles.orderStatus}>{item.status}</Text>
      </View>
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderStatus: {
    fontSize: 16,
    color: 'green',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default OrdersScreen;