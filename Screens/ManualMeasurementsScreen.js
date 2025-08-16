import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useMeasurements } from '../Context/MeasurementContext';

const ManualMeasurementScreen = ({ navigation }) => {
  const { 
    currentMeasurements, 
    saveMeasurements, 
    loading, 
    error,
    getMeasurementSummary 
  } = useMeasurements();
  
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    shoulders: '',
    sleeves: '',
    inseam: '',
    neck: '',
    bicep: '',
    forearm: '',
    thigh: '',
    calf: ''
  });

  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error'
  const saveTimeoutRef = useRef(null);

  // Load existing measurements when component mounts
  useEffect(() => {
    if (currentMeasurements) {
      setMeasurements(currentMeasurements);
    }
  }, [currentMeasurements]);

  // Auto-save measurements after user stops typing
  useEffect(() => {
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Only auto-save if there are some measurements entered
    const hasData = Object.values(measurements).some(value => value && parseFloat(value) > 0);
    
    if (hasData) {
      setSaveStatus('saving');
      
      // Debounce save by 2 seconds
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          await saveMeasurements(measurements, false); // Don't add to history for auto-saves
          setSaveStatus('saved');
        } catch (error) {
          setSaveStatus('error');
        }
      }, 2000);
    }

    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [measurements, saveMeasurements]);

  const handleSave = async () => {
    try {
      // Validate that at least some measurements are entered
      const hasData = Object.values(measurements).some(value => value && parseFloat(value) > 0);
      
      if (!hasData) {
        Alert.alert('Error', 'Please enter at least one measurement');
        return;
      }

      await saveMeasurements(measurements);
      
      const summary = getMeasurementSummary();
      
      Alert.alert(
        'Measurements Saved',
        `Your measurements have been saved successfully!\n\nCompleted: ${summary.completed}/${summary.total} measurements (${Math.round(summary.completionPercentage)}%)`,
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save measurements. Please try again.');
    }
  };

  const measurementLabels = {
    chest: 'Chest',
    waist: 'Waist', 
    hips: 'Hips',
    shoulders: 'Shoulders',
    sleeves: 'Sleeve Length',
    inseam: 'Inseam',
    neck: 'Neck',
    bicep: 'Bicep',
    forearm: 'Forearm',
    thigh: 'Thigh',
    calf: 'Calf'
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enter Your Measurements</Text>
        <Text style={styles.subtitle}>All measurements in inches</Text>
        
        {/* Auto-save Status */}
        <View style={styles.saveStatusContainer}>
          {saveStatus === 'saving' && (
            <Text style={styles.saveStatusSaving}>💾 Saving...</Text>
          )}
          {saveStatus === 'saved' && (
            <Text style={styles.saveStatusSaved}>✅ Auto-saved</Text>
          )}
          {saveStatus === 'error' && (
            <Text style={styles.saveStatusError}>❌ Save failed</Text>
          )}
        </View>
      </View>
      
      <View style={styles.content}>
        {Object.keys(measurements).map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>
              {measurementLabels[key]}:
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={measurements[key]}
              onChangeText={(text) => 
                setMeasurements({...measurements, [key]: text})
              }
              placeholder="0.0"
              editable={!loading}
            />
          </View>
        ))}

        <TouchableOpacity 
          style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Saving...' : 'Save to History'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.helpText}>
          💡 Your measurements auto-save as you type. Use "Save to History" to create a history entry.
        </Text>
        
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 25,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#2c3e50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonDisabled: {
    backgroundColor: '#95a5a6',
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
  saveStatusContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  saveStatusSaving: {
    color: '#f39c12',
    fontSize: 14,
    fontWeight: '600',
  },
  saveStatusSaved: {
    color: '#27ae60',
    fontSize: 14,
    fontWeight: '600',
  },
  saveStatusError: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '600',
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default ManualMeasurementScreen;