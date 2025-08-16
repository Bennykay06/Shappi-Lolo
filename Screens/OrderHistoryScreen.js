import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders] = useState([
    {
      id: '1001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 599.99,
      items: [
        {
          name: 'Wedding Special Suit',
          price: 599.99,
          quantity: 1,
          image: require('../assets/images/pp8.jpg'),
          customizations: ['Navy Performance Blend', 'Peak Lapel', 'Two Buttons']
        }
      ]
    },
    {
      id: '1002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 349.99,
      items: [
        {
          name: 'Slim Fit Navy Suit',
          price: 349.99,
          quantity: 1,
          image: require('../assets/images/pp2.jpg'),
          customizations: ['Charcoal Wool', 'Notch Lapel']
        }
      ]
    },
    {
      id: '1003',
      date: '2024-01-05',
      status: 'Processing',
      total: 728.98,
      items: [
        {
          name: 'Executive Charcoal Suit',
          price: 449.99,
          quantity: 1,
          image: require('../assets/images/pp4.jpg'),
          customizations: ['Black Formal', 'Peak Wide Lapel', 'One Button']
        },
        {
          name: 'Modern Grey Suit',
          price: 278.99,
          quantity: 1,
          image: require('../assets/images/pp3.jpg'),
          customizations: ['Grey Business', 'Notch Lapel']
        }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#4caf50';
      case 'Shipped':
        return '#2196f3';
      case 'Processing':
        return '#ff9800';
      case 'Cancelled':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const OrderItem = ({ order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
          <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
        </View>
      </View>

      {order.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            {item.customizations && (
              <View style={styles.customizations}>
                {item.customizations.map((custom, idx) => (
                  <Text key={idx} style={styles.customText}>• {custom}</Text>
                ))}
              </View>
            )}
          </View>
          <Text style={styles.quantity}>Qty: {item.quantity}</Text>
        </View>
      ))}

      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="receipt-outline" size={16} color="#6200ee" />
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={16} color="#6200ee" />
          <Text style={styles.actionText}>Support</Text>
        </TouchableOpacity>
        {order.status === 'Delivered' && (
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="repeat-outline" size={16} color="#6200ee" />
            <Text style={styles.actionText}>Reorder</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterTab, styles.activeFilter]}>
          <Text style={[styles.filterText, styles.activeFilterText]}>All Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Processing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Shipped</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterText}>Delivered</Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
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
  placeholder: {
    width: 34,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#6200ee',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '600',
  },
  ordersList: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: '600',
    marginBottom: 4,
  },
  customizations: {
    marginTop: 4,
  },
  customText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  quantity: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  actionText: {
    color: '#6200ee',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
});

export default OrderHistoryScreen;