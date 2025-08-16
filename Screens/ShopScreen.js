import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const categories = [
  { id: 1, name: 'SUITS', image: require('../assets/images/suits.jpg'), route: 'Suits' },
  { id: 2, name: 'SHIRTS', image: require('../assets/images/men shirt.jpg'), route: 'ShirtsScreen' },
  { id: 3, name: 'BLAZERS', image: require('../assets/images/blazzers.webp'), route: 'BlazersScreen' },
  { id: 4, name: 'DRESS PANTS', image: require('../assets/images/dress pant.webp'), route: 'CategoryItems', categoryName: 'DRESS PANTS' },
  { id: 5, name: 'LONG SLEEVES', image: require('../assets/images/long sleeve tee.jpg'), route: 'CategoryItems', categoryName: 'LONG SLEEVES' },
  { id: 6, name: 'SHORT SLEEVES', image: require('../assets/images/short sleeve.png'), route: 'CategoryItems', categoryName: 'SHORT SLEEVES' },
  { id: 7, name: 'T-SHIRTS', image: require('../assets/images/Tee shirt.webp'), route: 'CategoryItems', categoryName: 'T-SHIRTS' },
  { id: 8, name: 'LONG SLEEVE T-SHIRT', image: require('../assets/images/long sleeve tee.jpg'), route: 'CategoryItems', categoryName: 'LONG SLEEVE T-SHIRT' },
  { id: 9, name: 'POLOS', image: require('../assets/images/polo.webp'), route: 'CategoryItems', categoryName: 'POLOS' },
  { id: 10, name: 'LONG SLEEVE POLOS', image: require('../assets/images/long sleeve polo.jpg'), route: 'CategoryItems', categoryName: 'LONG SLEEVE POLOS' },
  { id: 11, name: 'JEANS', image: require('../assets/images/jeans.jpg'), route: 'CategoryItems', categoryName: 'JEANS' },
  { id: 12, name: 'JEANS MEN', image: require('../assets/images/jeans.jpg'), route: 'CategoryItems', categoryName: 'JEANS MEN' },
];

export default function ShopScreen({ navigation }) {
  const handleCategoryPress = (category) => {
    if (category.categoryName) {
      navigation.navigate(category.route, { categoryName: category.categoryName });
    } else {
      navigation.navigate(category.route);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(category)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'black',
  },
  grid: {
   
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '100%',
    marginTop:70,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  categoryImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  categoryText: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});
