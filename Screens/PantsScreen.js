import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const pants = [
  {
    id: 1,
    name: 'Classic Dress Pants',
    price: 149,
    sizes: ['S', 'M', 'L'],
    image: require('../assets/images/dress pant.webp'),
  },
  {
    id: 2,
    name: 'Slim Fit Trousers',
    price: 159,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/dress pant.webp'),
  },
  {
    id: 3,
    name: 'Business Casual Pants',
    price: 139,
    sizes: ['S', 'L'],
    image: require('../assets/images/dress pant.webp'),
  },
  {
    id: 4,
    name: 'Formal Suit Pants',
    price: 169,
    sizes: ['M', 'L', 'XL'],
    image: require('../assets/images/dress pant.webp'),
  },
  {
    id: 5,
    name: 'Premium Tailored Pants',
    price: 189,
    sizes: ['S', 'M', 'L', 'XL'],
    image: require('../assets/images/dress pant.webp'),
  },
];

export default function PantsScreen({ navigation, route }) {
  const { viewOnly } = route.params || {};
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>

      <View style={styles.buttonRow}>
        {viewOnly ? (
          <TouchableOpacity 
            onPress={() => navigation.navigate('ProductDetailScreen', { product: item, category: 'pants' })}
            style={styles.detailsButtonFull}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => navigation.navigate('CustomizePantsScreen', { pants: item })}
            style={styles.customizeButtonFull}
          >
            <Text style={styles.buttonText}>Customize</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Custom Pants</Text>
      </View>

      <FlatList
        data={pants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 400,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  },
  price: {
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailsButtonFull: {
    width: '100%',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  customizeButton: {
    flex: 1,
    backgroundColor: '#03dac6',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  customizeButtonFull: {
    width: '100%',
    backgroundColor: '#03dac6',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});