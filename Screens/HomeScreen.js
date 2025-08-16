import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('CustomizeSuit', { searchQuery: searchQuery.trim() });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <View style={styles.heroContainer}>
        <Image 
          source={require('../assets/images/login.jpg')} 
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>CRAFTING YOUR SIGNATURE STYLE</Text>
          <Text style={styles.heroSubtitle}>Premium Custom Tailoring for the Modern Gentleman</Text>
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.sectionTitle}>Welcome to SHELL'S</Text>
        <Text style={styles.sectionText}>
          Where every stitch tells your story. Our master tailors create 
          perfectly fitted garments that reflect your personality and lifestyle.
        </Text>
        
        {/* Quick Action Buttons */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Consultation')}
          >
            <Text style={styles.primaryButtonText}>Design Consultation</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Fitting')}
          >
            <Text style={styles.secondaryButtonText}>Book Fitting</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for customization options..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Appointment Services */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Book Your Visit</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => navigation.navigate('Consultation')}
          >
            <Image 
              source={require('../assets/images/suits.jpg')}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Design Consultation</Text>
            <Text style={styles.serviceDesc}>Free 60-min session to plan your perfect garment</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => navigation.navigate('Fitting')}
          >
            <Image 
              source={require('../assets/images/men shirt.jpg')}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Measurement & Fitting</Text>
            <Text style={styles.serviceDesc}>Professional body measurements for perfect fit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.serviceCard}
            onPress={() => navigation.navigate('Appointment')}
          >
            <Image 
              source={require('../assets/images/sewing.png')}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>General Appointment</Text>
            <Text style={styles.serviceDesc}>Alterations, repairs, and follow-up visits</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Customization Process */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Customization Process</Text>
        
        <View style={styles.processStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Design Consultation</Text>
            <Text style={styles.stepDescription}>Discuss your vision, style preferences, and fabric choices</Text>
          </View>
        </View>
        
        <View style={styles.processStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Precise Measurements</Text>
            <Text style={styles.stepDescription}>Professional measurement session for perfect fit</Text>
          </View>
        </View>
        
        <View style={styles.processStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Expert Crafting</Text>
            <Text style={styles.stepDescription}>Master tailors handcraft your garment with attention to detail</Text>
          </View>
        </View>
        
        <View style={styles.processStep}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Final Fitting</Text>
            <Text style={styles.stepDescription}>Perfect adjustments and delivery of your completed piece</Text>
          </View>
        </View>
      </View>

      {/* Customer Testimonials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Our Clients Say</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.testimonialScroll}
        >
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "Exceptional craftsmanship! My suit fits perfectly and the attention to detail is remarkable."
            </Text>
            <Text style={styles.testimonialAuthor}>- Michael R.</Text>
            <Text style={styles.testimonialRating}>⭐⭐⭐⭐⭐</Text>
          </View>
          
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "Professional service from start to finish. The custom shirt exceeded my expectations."
            </Text>
            <Text style={styles.testimonialAuthor}>- James K.</Text>
            <Text style={styles.testimonialRating}>⭐⭐⭐⭐⭐</Text>
          </View>
          
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>
              "Quality tailoring with modern convenience. Highly recommend Shell's for any formal wear needs."
            </Text>
            <Text style={styles.testimonialAuthor}>- David L.</Text>
            <Text style={styles.testimonialRating}>⭐⭐⭐⭐⭐</Text>
          </View>
        </ScrollView>
      </View>

      {/* Style Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style Inspiration</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>The Art of Layering</Text>
          <Text style={styles.tipText}>
            Master the balance between your suit jacket, waistcoat, and shirt for 
            a polished look that transitions seamlessly from day to evening.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>Fabric Selection Guide</Text>
          <Text style={styles.tipText}>
            Learn how to choose between wool, linen, and cotton blends based on 
            season, occasion, and personal comfort preferences.
          </Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  heroContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '70%',
    paddingTop: 20
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  welcomeSection: {
    padding: 25,
    backgroundColor: '#fff',
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2c3e50',
    flex: 0.48,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2c3e50',
    fontWeight: '600',
    fontSize: 16,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  serviceCard: {
    width: width * 0.6,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  serviceImage: {
    width: '100%',
    height: 150,
  },
  serviceTitle: {
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDesc: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    fontSize: 14,
    color: '#666',
  },
  testimonialScroll: {
    paddingRight: 20,
  },
  testimonialCard: {
    width: width * 0.8,
    marginRight: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2c3e50',
  },
  testimonialText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  testimonialRating: {
    fontSize: 16,
  },
  tipCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#2c3e50',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    fontSize: 20,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});