import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {

  // MTailor's main services
  const services = [
    {
      id: 1,
      name: 'Book Appointment',
      subtitle: 'Schedule measurement session',
      image: require('../assets/images/sewing.png'),
      description: 'Book a consultation with our expert tailors',
      route: 'AppointmentBooking',
      featured: true,
      icon: 'calendar'
    },
    {
      id: 2,
      name: 'Track Your Order',
      subtitle: 'Monitor outfit progress',
      image: require('../assets/images/login.jpg'),
      description: 'See real-time updates on your custom clothing',
      route: 'OrderTracking',
      featured: true,
      icon: 'trending-up'
    },
    {
      id: 3,
      name: 'Bulk Orders',
      subtitle: 'Group & event attire',
      image: require('../assets/images/suits.jpg'),
      description: 'Wedding parties, corporate events, funeral attire',
      route: 'BulkOrders',
      icon: 'people'
    },
    {
      id: 4,
      name: 'Custom Clothing',
      subtitle: 'Browse our collection',
      image: require('../assets/images/men shirt.jpg'),
      description: 'Shirts, suits, pants, blazers & more',
      route: 'ShopTab',
      icon: 'shirt'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      
      {/* MTailor-style Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>MTailor</Text>
        <Text style={styles.tagline}>Perfect fitting custom clothes</Text>
      </View>

      {/* Hero Section - Measurement Focus */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Get measured in 30 seconds</Text>
          <Text style={styles.heroSubtitle}>
            Using your phone's camera for measurements 20% more accurate than a professional tailor
          </Text>
          <TouchableOpacity 
            style={styles.measureButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'MeasurementsTab' })}
          >
            <Ionicons name="camera" size={20} color="white" style={{marginRight: 8}} />
            <Text style={styles.measureButtonText}>Get Measured Now</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={require('../assets/images/login.jpg')} 
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>

      {/* MTailor-style Services */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>How can we help you today?</Text>
        
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[styles.categoryCard, service.featured && styles.featuredCard]}
            onPress={() => {
              if (service.route === 'ShopTab') {
                navigation.navigate('MainTabs', { screen: 'ShopTab' });
              } else {
                navigation.navigate(service.route);
              }
            }}
          >
            <Image source={service.image} style={styles.categoryImage} />
            <View style={styles.categoryContent}>
              <View style={styles.categoryInfo}>
                <View style={styles.serviceHeader}>
                  <Ionicons name={service.icon} size={24} color="#007AFF" style={styles.serviceIcon} />
                  <Text style={styles.categoryName}>{service.name}</Text>
                </View>
                <Text style={styles.categorySubtitle}>{service.subtitle}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              {service.featured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredText}>POPULAR</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* MTailor-style Process */}
      <View style={styles.processSection}>
        <Text style={styles.sectionTitle}>How it works</Text>
        
        <View style={styles.processStep}>
          <View style={styles.stepIcon}>
            <Ionicons name="camera" size={24} color="#007AFF" />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>1. Get Measured</Text>
            <Text style={styles.stepDescription}>Use your phone to get measured in 30 seconds. No measuring tape required.</Text>
          </View>
        </View>
        
        <View style={styles.processStep}>
          <View style={styles.stepIcon}>
            <Ionicons name="shirt" size={24} color="#007AFF" />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>2. Customize</Text>
            <Text style={styles.stepDescription}>Choose your style, fit, and fabric from hundreds of options.</Text>
          </View>
        </View>
        
        <View style={styles.processStep}>
          <View style={styles.stepIcon}>
            <Ionicons name="build" size={24} color="#007AFF" />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>3. We Make It</Text>
            <Text style={styles.stepDescription}>Your custom clothing is made to your exact measurements and shipped to you.</Text>
          </View>
        </View>
      </View>

      {/* MTailor-style Testimonials */}
      <View style={styles.testimonialsSection}>
        <Text style={styles.sectionTitle}>What customers are saying</Text>
        
        <View style={styles.testimonialCard}>
          <View style={styles.testimonialHeader}>
            <Text style={styles.testimonialRating}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.testimonialDate}>2 days ago</Text>
          </View>
          <Text style={styles.testimonialText}>
            "The fit is incredible! I've never had a shirt that fits this perfectly. The measurement process was so easy and accurate."
          </Text>
          <Text style={styles.testimonialAuthor}>Sarah M. - Custom Dress Shirt</Text>
        </View>
        
        <View style={styles.testimonialCard}>
          <View style={styles.testimonialHeader}>
            <Text style={styles.testimonialRating}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.testimonialDate}>1 week ago</Text>
          </View>
          <Text style={styles.testimonialText}>
            "Better than any tailor I've been to. The app measured me perfectly and my suit fits like a glove."
          </Text>
          <Text style={styles.testimonialAuthor}>Mike T. - Custom Suit</Text>
        </View>
      </View>

      {/* Guarantee Section */}
      <View style={styles.guaranteeSection}>
        <Text style={styles.guaranteeTitle}>Perfect fit guaranteed</Text>
        <Text style={styles.guaranteeText}>
          If you don't love your order, we'll refund 100% of your money. 
          For 90 days after receiving your garment, you can have it remade or returned for free.
        </Text>
        <View style={styles.guaranteeFeatures}>
          <Text style={styles.guaranteeFeature}>✓ Free shipping</Text>
          <Text style={styles.guaranteeFeature}>✓ Free returns</Text>
          <Text style={styles.guaranteeFeature}>✓ 90-day guarantee</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  heroSection: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  heroContent: {
    flex: 1,
    paddingRight: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  measureButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  measureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  featuredCard: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  categoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  categoryContent: {
    padding: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  categorySubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  categoryAccuracy: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  processSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stepContent: {
    flex: 1,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  testimonialsSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  testimonialCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  testimonialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialRating: {
    fontSize: 16,
  },
  testimonialDate: {
    fontSize: 14,
    color: '#999',
  },
  testimonialText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  guaranteeSection: {
    padding: 20,
    backgroundColor: '#e8f4fd',
    margin: 20,
    borderRadius: 12,
  },
  guaranteeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  guaranteeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  guaranteeFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  guaranteeFeature: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceIcon: {
    marginRight: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
});