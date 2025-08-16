import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const categoryItems = {
  SUITS: [
    {
      id: 1,
      name: 'Classic Navy Suit',
      price: '$299',
      image: require('../assets/images/navy-suit.jpg'),
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 2,
      name: 'Black Tuxedo',
      price: '$349',
      image: require('../assets/images/black-tuxedo.jpg'),
      sizes: ['S', 'M', 'L'],
    },
  ],
  SHIRTS: [
    {
      id: 1,
      name: 'White Dress Shirt',
      price: '$59',
      image: require('../assets/images/white-shirt.jpg'),
      sizes: ['M', 'L'],
    },
    {
      id: 2,
      name: 'Blue Casual Shirt',
      price: '$49',
      image: require('../assets/images/blue-shirt.jpg'),
      sizes: ['S', 'M'],
    },
  ],
  // Add other categories...
};

export default function CategoryScreen({ route }) {
  const navigation = useNavigation();
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
            onPress={() => navigation.navigate('SuitDetail', { suit: item })}
          >
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
