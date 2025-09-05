import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// MTailor-style simplified categories
const categories = [
  { 
    id: 1, 
    name: 'Custom Dress Shirts', 
    image: require('../assets/images/imgq1.jpg'), 
    route: 'ShirtsScreen',
    price: 'Starting at $79',
    subtitle: 'Perfect fit, every time',
    popular: true,
    description: '16 measurements for the perfect fit',
    height: 320
  },
  { 
    id: 2, 
    name: 'Custom Suits', 
    image: require('../assets/images/suits.jpg'), 
    route: 'SuitsScreen',
    price: 'Starting at $399',
    subtitle: 'Tailored to perfection',
    description: 'Professional grade tailoring',
    height: 380
  },
  { 
    id: 3, 
    name: 'Custom Jeans', 
    image: require('../assets/images/jeans.jpg'), 
    route: 'JeansScreen',
    price: 'Starting at $99',
    subtitle: 'Your perfect fit',
    description: 'Precision fit technology',
    height: 320
  },
  { 
    id: 4, 
    name: 'Custom Blazers', 
    image: require('../assets/images/blazzers.webp'), 
    route: 'BlazersScreen',
    price: 'Starting at $299',
    subtitle: 'Business ready',
    description: 'Expert craftsmanship',
    height: 320
  },
  { 
    id: 5, 
    name: 'Custom Pants', 
    image: require('../assets/images/dress pant.webp'), 
    route: 'PantsScreen',
    price: 'Starting at $149',
    subtitle: 'Perfect fit, every time',
    description: 'Precision tailored to your measurements',
    height: 320
  },
  { 
    id: 6, 
    name: 'African Wear', 
    image: require('../assets/images/jeans.jpg'), 
    route: 'AfricaWearScreen',
    price: 'Starting at $69',
    subtitle: 'Traditional & modern styles',
    description: 'Authentic African fashion',
    height: 320
  },
  { 
    id: 7, 
    name: 'Clothing Store', 
    image: require('../assets/images/men short.jpg'), 
    route: 'ClothingStoreScreen',
    price: 'Starting at $29',
    subtitle: 'Everyday essentials',
    description: 'Casual to semi-formal wear',
    height: 320
  },
];

export default function ShopScreen({ navigation }) {
  const handleCategoryPress = (category) => {
    if (category.categoryName) {
      navigation.navigate(category.route, { categoryName: category.categoryName });
    } else {
      navigation.navigate(category.route);
    }
  };

  const handleBuyNow = (category) => {
    if (category.categoryName) {
      navigation.navigate(category.route, { 
        categoryName: category.categoryName,
        viewOnly: true 
      });
    } else {
      navigation.navigate(category.route, { 
        viewOnly: true 
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Custom Clothing</Text>
        <Text style={styles.headerSubtitle}>Made to your measurements</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <View
            key={category.id}
            style={[
              styles.categoryCard, 
              category.popular && styles.popularCard,
              { height: category.height }
            ]}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <View style={styles.cardOverlay}>
              {category.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              <View style={styles.cardContent}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                <Text style={styles.categoryPrice}>{category.price}</Text>
                
                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={styles.buyNowButton}
                    onPress={() => handleBuyNow(category)}
                  >
                    <Text style={styles.buyNowButtonText}>Buy Now</Text>
                    <Ionicons name="bag" size={14} color="white" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.customizeButton}
                    onPress={() => handleCategoryPress(category)}
                  >
                    <Text style={styles.customizeButtonText}>Customize</Text>
                    <Ionicons name="arrow-forward" size={14} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  categoryCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  popularCard: {
    borderWidth: 3,
    borderColor: '#007AFF',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
  },
  popularBadge: {
    position: 'absolute',
    top: -60,
    right: 0,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    alignItems: 'flex-start',
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  categoryPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  buyNowButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buyNowButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  customizeButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  customizeButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  bottomPadding: {
    height: 40,
  },
});
