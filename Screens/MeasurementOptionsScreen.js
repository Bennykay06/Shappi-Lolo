import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MeasurementOptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Measurement Method</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CameraMeasurement')}
      >
        <Text style={styles.buttonText}>Use Camera</Text>
        <Text style={styles.buttonSubtext}>Automated measurement using your phone's camera</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('ManualMeasurement')}
      >
        <Text style={styles.buttonText}>Enter Manually</Text>
        <Text style={styles.buttonSubtext}>Type in your measurements directly</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default MeasurementOptionsScreen;