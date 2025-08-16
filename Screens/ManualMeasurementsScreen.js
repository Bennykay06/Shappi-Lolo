import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const ManualMeasurementScreen = ({ navigation }) => {
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    inseam: ''
  });

  const handleSave = () => {
    // Save logic here
    Alert.alert(
      'Measurements Saved',
      'Your measurements have been saved successfully!',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Measurements (in inches)</Text>
      
      {Object.keys(measurements).map((key) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={measurements[key]}
            onChangeText={(text) => 
              setMeasurements({...measurements, [key]: text})
            }
            placeholder="0.0"
          />
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Measurements</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    width: 100,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 8,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ManualMeasurementScreen;