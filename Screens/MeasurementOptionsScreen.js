import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MeasurementOptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Your Perfect Measurements</Text>
      <Text style={styles.subtitle}>Choose your preferred method</Text>
      
      <TouchableOpacity 
        style={[styles.button, styles.cameraButton]}
        onPress={() => navigation.navigate('CameraMeasurement')}
      >
        <View style={styles.buttonHeader}>
          <Ionicons name="camera" size={32} color="#6200ee" />
          <View style={styles.recommendedBadge}>
            <Text style={styles.recommendedText}>RECOMMENDED</Text>
          </View>
        </View>
        <Text style={styles.buttonText}>Smart Camera Measurement</Text>
        <Text style={styles.buttonSubtext}>
          📸 Takes just 30 seconds{'\n'}
          🎯 20% more accurate than professional tailors{'\n'}
          🤖 Advanced AI-powered body analysis
        </Text>
        <View style={styles.accuracyBadge}>
          <Text style={styles.accuracyText}>95% Accuracy Guaranteed</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.manualButton]}
        onPress={() => navigation.navigate('ManualMeasurement')}
      >
        <View style={styles.buttonHeader}>
          <Ionicons name="create-outline" size={32} color="#666" />
        </View>
        <Text style={styles.buttonText}>Manual Entry</Text>
        <Text style={styles.buttonSubtext}>Enter measurements manually if you have them</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cameraButton: {
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  manualButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  buttonSubtext: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  accuracyBadge: {
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
  },
  accuracyText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MeasurementOptionsScreen;