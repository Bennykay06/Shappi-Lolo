import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraMeasurementScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [measurementStep, setMeasurementStep] = useState(0);
  const cameraRef = useRef(null);

  const measurementSteps = [
    {
      title: "Get Started",
      description: "We'll guide you through taking photos to calculate your measurements.",
      instruction: "Make sure you have good lighting and stand against a plain background."
    },
    {
      title: "Reference Photo",
      description: "Hold a credit card horizontally for scale calibration.",
      instruction: "Fill the guide with your credit card and tap capture"
    },
    {
      title: "Body Photo", 
      description: "Stand 6 feet away with arms slightly away from your body.",
      instruction: "Align your body with the guide and tap capture"
    },
    {
      title: "Results",
      description: "Your measurements have been calculated!",
      instruction: "Tap Save to store your measurements"
    }
  ];

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const nextStep = () => {
    if (measurementStep < 3) {
      setMeasurementStep(measurementStep + 1);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        Alert.alert("Photo Captured", "Moving to next step...", [
          { text: "OK", onPress: nextStep }
        ]);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access denied</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Instructions screen (step 0) or Results screen (step 3)
  if (measurementStep === 0 || measurementStep === 3) {
    const currentStep = measurementSteps[measurementStep];
    return (
      <View style={styles.instructionContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{currentStep.title}</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.stepTitle}>{currentStep.description}</Text>
          <Text style={styles.stepDescription}>{currentStep.instruction}</Text>
          
          {measurementStep === 3 && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Your Measurements:</Text>
              <Text style={styles.measurement}>Chest: 42.5"</Text>
              <Text style={styles.measurement}>Waist: 34.0"</Text>
              <Text style={styles.measurement}>Hips: 38.5"</Text>
              <Text style={styles.measurement}>Shoulders: 18.2"</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={measurementStep === 0 ? nextStep : () => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>
            {measurementStep === 0 ? 'Start Measurement' : 'Save & Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Camera screen for steps 1 and 2
  return (
    <View style={styles.container}>
      <View style={styles.cameraHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.cameraTitle}>{measurementSteps[measurementStep].title}</Text>
        <Text style={styles.stepCounter}>{measurementStep}/2</Text>
      </View>
      
      <Camera
        style={styles.camera}
        facing={type}
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            {measurementSteps[measurementStep].instruction}
          </Text>
        </View>
        
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}
          >
            <Ionicons name="camera-reverse" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
          
          <View style={styles.placeholder} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  instructionContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerBackButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  resultsContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  measurement: {
    fontSize: 16,
    paddingVertical: 5,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#6200ee',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  cameraHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  cameraTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  stepCounter: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 8,
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  flipButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 12,
    borderRadius: 25,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ee',
  },
  placeholder: {
    width: 50,
  },
});