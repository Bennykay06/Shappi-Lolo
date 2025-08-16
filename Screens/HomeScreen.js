import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
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
      </View>

      {/* Customization Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tailoring Services</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}
        >
          <TouchableOpacity style={styles.serviceCard}>
            <Image 
              source={require('../assets/images/suits.jpg')}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Bespoke Suits</Text>
            <Text style={styles.serviceDesc}>Handcrafted to your exact measurements</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Image 
              source={require('../assets/images/men shirt.jpg')}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Custom Shirts</Text>
            <Text style={styles.serviceDesc}>Choose fabrics, collars, and cuffs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Image 
              source={require('../assets/images/sewing.png')}
              style={styles.serviceImage}
            />
            <Text style={styles.serviceTitle}>Precision Alterations</Text>
            <Text style={styles.serviceDesc}>Perfect fit guaranteed</Text>
          </TouchableOpacity>
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
    paddingTop:20
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
  },
  heroSubtitle: {
    color: '#fff',
    fontSize: 16,
  },
  welcomeSection: {
    padding: 25,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
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
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceImage: {
    width: '100%',
    height: 150,
  },
  serviceTitle: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDesc: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    fontSize: 14,
    color: '#666',
  },
  tipCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#222',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
});