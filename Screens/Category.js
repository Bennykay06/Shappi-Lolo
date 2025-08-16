import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const categoryItems = {
  SUITS: [
    { id: 1, name: 'Classic Navy Suit', price: '$299', image: require('../assets/images/navy-suit.jpg') },
    { id: 2, name: 'Black Tuxedo', price: '$349', image: require('../assets/images/black-tuxedo.jpg') },
  ],
  SHIRTS: [
    { id: 1, name: 'White Dress Shirt', price: '$59', image: require('../assets/images/white-shirt.jpg') },
    { id: 2, name: 'Blue Casual Shirt', price: '$49', image: require('../assets/images/blue-shirt.jpg') },
  ],
  TUXEDOS: [
    { id: 1, name: 'Classic Black Tuxedo', price: '$399', image: require('../assets/images/classic-tuxedo.jpg') },
  ],
  ACCESSORIES: [
    { id: 1, name: 'Silk Tie', price: '$39', image: require('../assets/images/silk-tie.jpg') },
  ],
};

export default function CategoryScreen({ route, navigation }) {
  const { categoryName } = route.params;
  const items = categoryItems[categoryName] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName}</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.itemCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemInfo: {
    padding: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: 'bold',
  },
});