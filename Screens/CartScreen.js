import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../Context/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CartScreen({ navigation }) {
  const { cartItems, setCartItems, clearCart } = useCart();
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleRemove = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const renderCustomizationDetails = (selections = {}) => {
    const getLapelValue = () => {
      if (selections.lapel === 1) return 'Notch Slim';
      if (selections.lapel === 2) return 'Notch';
      if (selections.lapel === 3) return 'Peak';
      if (selections.lapel === 4) return 'Peak Wide';
      return 'Notch';
    };

    const getButtonValue = () => {
      if (selections.buttons === 1) return 'One Button';
      if (selections.buttons === 2) return 'Two Buttons';
      if (selections.buttons === 3) return 'Three Buttons';
      return 'Two Buttons';
    };

    const getVentValue = () => {
      if (selections.vents === 1) return 'Center Vent';
      if (selections.vents === 2) return 'Side Vents';
      return 'One Vent';
    };

    const getMonogramColorValue = () => {
      if (selections.monogram?.color === 1) return 'White';
      if (selections.monogram?.color === 2) return 'Black';
      if (selections.monogram?.color === 3) return 'Navy';
      if (selections.monogram?.color === 4) return 'Silver';
      return 'Black';
    };

    const getFabricValue = () => {
      if (selections.fabric === 1) return 'Navy Performance Blend';
      if (selections.fabric === 2) return 'Charcoal Wool';
      if (selections.fabric === 3) return 'Black Formal';
      if (selections.fabric === 4) return 'Grey Business';
      if (selections.fabric === 5) return 'Brown Heritage';
      return 'Navy Performance Blend';
    };

    const options = [
      { label: 'FABRIC', value: getFabricValue() },
      { label: 'LAPEL', value: getLapelValue() },
      { label: 'Lining Fabric', value: 'Navy' },
      { label: 'BUTTONS', value: getButtonValue() },
      { label: 'VENTS', value: getVentValue() },
      { label: 'SLEEVE BUTTONHOLES', value: selections.functionalButtonholes ? 'Yes' : 'No' },
      { label: 'MONOGRAM', value: selections.monogram?.enabled ? 'Yes' : 'No' },
      { label: 'MONOGRAM COLOR', value: selections.monogram?.enabled ? getMonogramColorValue() : 'N/A' },
      { label: 'PANT PLEATS', value: selections.pleatedPants ? 'Yes' : 'No' },
      { label: 'PANT CUFFS', value: selections.cuffedHem ? 'Yes' : 'No' },
      { label: 'SUSPENDER BUTTONS', value: selections.suspenderButtons ? 'Yes' : 'No' },
      { label: 'BELT LOOPS REMOVED', value: 'No' },
      { label: 'CELL PHONE POCKET', value: selections.phonePocket ? 'Yes' : 'No' },
      { label: 'INVISISTRETCH™ WAIST', value: 'No' }
    ];

    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>DETAILS</Text>
        
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleRemove(expandedItem)}
          >
            <Text style={styles.removeText}>REMOVE FROM CART</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <Text style={styles.itemTitle}>ITEM</Text>
        
        {options.map((option, index) => (
          <View key={index} style={styles.optionRow}>
            <Text style={styles.optionLabel}>- {option.label}</Text>
            <Text style={styles.optionValue}>{option.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity 
                  style={styles.itemHeader}
                  onPress={() => toggleExpand(item.id)}
                >
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                  <Icon 
                    name={expandedItem === item.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                    size={24} 
                    color="#666" 
                  />
                </TouchableOpacity>

                {expandedItem === item.id && (
                  renderCustomizationDetails(item.customizations || item.selections)
                )}
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${getTotal()}</Text>
            </View>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('PaymentScreen')}
            >
              <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 18,
    color: '#666'
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden'
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 16
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  detailsContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  actionButton: {
    paddingVertical: 4
  },
  editText: {
    fontWeight: 'bold',
    color: '#000'
  },
  removeText: {
    fontWeight: 'bold',
    color: '#d32f2f'
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  optionLabel: {
    fontWeight: '500'
  },
  optionValue: {
    color: '#666'
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600'
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center'
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});