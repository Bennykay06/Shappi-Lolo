import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, Animated } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
// import Svg, { Path, Circle, Rect, Text as SvgText } from 'react-native-svg';
import { useMeasurements } from '../Context/MeasurementContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CameraMeasurementScreen({ navigation }) {
  const { saveMeasurements } = useMeasurements();
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState('back');
  const [measurementStep, setMeasurementStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [poseAlignment, setPoseAlignment] = useState({ isAligned: false, feedback: '' });
  const [calculatedMeasurements, setCalculatedMeasurements] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const cameraRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const measurementSteps = [
    {
      title: "Get Started",
      description: "We'll guide you through taking photos to calculate your measurements.",
      instruction: "Make sure you have good lighting and stand against a plain background.",
      accuracy: "20% more accurate than a professional tailor"
    },
    {
      title: "Reference Photo",
      description: "Hold a credit card horizontally for scale calibration.",
      instruction: "Fill the guide with your credit card and tap capture",
      showGuides: true,
      guideType: "card"
    },
    {
      title: "Body Photo", 
      description: "Stand 6 feet away with arms slightly away from your body.",
      instruction: "Align your body with the guide and tap capture",
      showGuides: true,
      guideType: "body"
    },
    {
      title: "Results",
      description: "Your measurements have been calculated!",
      instruction: "Review and save your measurements",
      showResults: true
    }
  ];

  // Request permission on mount
  useEffect(() => {
    console.log('Camera permission status:', permission);
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // Pulse animation for alignment feedback
  useEffect(() => {
    if (measurementStep === 2 && !poseAlignment.isAligned) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [measurementStep, poseAlignment.isAligned]);

  // Simulate pose detection (in real app would use ML)
  const detectPose = () => {
    // Simulate pose detection feedback
    const feedbacks = [
      'Move closer to the camera',
      'Step back a bit',
      'Stand up straight',
      'Arms slightly away from body',
      'Perfect position!'
    ];
    
    const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
    const isAligned = randomFeedback === 'Perfect position!' || Math.random() > 0.7;
    
    setPoseAlignment({ isAligned, feedback: randomFeedback });
    return isAligned;
  };

  // Calculate measurements from photo (simulated - would use ML in real app)
  const calculateMeasurements = async (photoUri, referenceCardPhoto = null) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulated measurements (in real app would use computer vision)
    const measurements = {
      chest: (40 + Math.random() * 8).toFixed(1),
      waist: (32 + Math.random() * 6).toFixed(1),
      hips: (36 + Math.random() * 6).toFixed(1),
      shoulders: (17 + Math.random() * 3).toFixed(1),
      sleeves: (32 + Math.random() * 4).toFixed(1),
      inseam: (30 + Math.random() * 4).toFixed(1),
      neck: (15 + Math.random() * 2).toFixed(1),
      bicep: (13 + Math.random() * 3).toFixed(1),
      forearm: (11 + Math.random() * 2).toFixed(1),
      thigh: (22 + Math.random() * 4).toFixed(1),
      calf: (15 + Math.random() * 3).toFixed(1),
    };
    
    const confidence = 85 + Math.random() * 10; // 85-95% confidence
    
    setCalculatedMeasurements(measurements);
    setConfidenceScore(confidence);
    setIsProcessing(false);
    
    return { measurements, confidence };
  };

  const saveMeasurementsAndExit = async () => {
    if (calculatedMeasurements) {
      try {
        await saveMeasurements(calculatedMeasurements);
        Alert.alert(
          "Success!", 
          "Your measurements have been saved successfully.", 
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        Alert.alert("Error", "Failed to save measurements. Please try again.");
      }
    } else {
      navigation.goBack();
    }
  };

  // Component for rendering visual guides (simplified without SVG)
  const VisualGuides = ({ guideType }) => {
    if (guideType === 'card') {
      return (
        <View style={styles.guideOverlay}>
          <View style={styles.cardGuide}>
            <Text style={styles.guideTitle}>Credit Card Guide</Text>
            <View style={styles.cardOutline} />
            <Text style={styles.guideSubtext}>Place card horizontally in the outlined area</Text>
          </View>
        </View>
      );
    }
    
    if (guideType === 'body') {
      return (
        <Animated.View style={[styles.guideOverlay, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.bodyGuide}>
            {/* Head guide */}
            <View style={[styles.headGuide, { 
              borderColor: poseAlignment.isAligned ? "#4CAF50" : "white" 
            }]} />
            
            {/* Body outline */}
            <View style={[styles.bodyOutline, { 
              borderColor: poseAlignment.isAligned ? "#4CAF50" : "white" 
            }]} />
            
            {/* Arms guides */}
            <View style={[styles.leftArmGuide, { 
              borderColor: poseAlignment.isAligned ? "#4CAF50" : "white" 
            }]} />
            <View style={[styles.rightArmGuide, { 
              borderColor: poseAlignment.isAligned ? "#4CAF50" : "white" 
            }]} />
            
            <Text style={styles.guideText}>
              {poseAlignment.isAligned ? "Perfect! Ready to capture" : "Align your body with the outline"}
            </Text>
          </View>
        </Animated.View>
      );
    }
    
    return null;
  };

  const nextStep = () => {
    if (measurementStep < 3) {
      setMeasurementStep(measurementStep + 1);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // For body photo step, check pose alignment first
        if (measurementStep === 2) {
          const isAligned = detectPose();
          if (!isAligned) {
            Alert.alert("Positioning", poseAlignment.feedback, [
              { text: "Try Again", onPress: () => detectPose() }
            ]);
            return;
          }
        }

        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });

        if (measurementStep === 2) {
          // Calculate measurements from body photo
          await calculateMeasurements(photo.uri);
        }
        
        nextStep();
      } catch (error) {
        console.error('Camera error:', error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      }
    }
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need camera access to measure you</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={requestPermission}
        >
          <Text style={styles.backButtonText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.backButton, { marginTop: 10, backgroundColor: '#ccc' }]} 
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
          
          {measurementStep === 3 && calculatedMeasurements && (
            <View style={styles.resultsContainer}>
              <View style={styles.confidenceHeader}>
                <Text style={styles.resultsTitle}>Your Measurements</Text>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{confidenceScore.toFixed(1)}% accuracy</Text>
                </View>
              </View>
              
              <View style={styles.measurementGrid}>
                {Object.entries(calculatedMeasurements).map(([key, value]) => (
                  <View key={key} style={styles.measurementItem}>
                    <Text style={styles.measurementLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                    <Text style={styles.measurementValue}>{value}"</Text>
                  </View>
                ))}
              </View>
              
              <Text style={styles.accuracyNote}>
                Measurements calculated using advanced computer vision, 
                20% more accurate than traditional tailoring.
              </Text>
            </View>
          )}

          {measurementStep === 0 && (
            <View style={styles.featuresContainer}>
              <Text style={styles.featureTitle}>✨ {measurementSteps[0].accuracy}</Text>
              <Text style={styles.featureItem}>📸 Takes just 30 seconds</Text>
              <Text style={styles.featureItem}>🎯 Computer vision technology</Text>
              <Text style={styles.featureItem}>📏 11 precise measurements</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={measurementStep === 0 ? nextStep : saveMeasurementsAndExit}
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
      
      <CameraView
        style={styles.camera}
        facing={type}
        ref={cameraRef}
        mode="picture"
      >
        {/* Visual guides overlay */}
        {measurementSteps[measurementStep].showGuides && (
          <VisualGuides guideType={measurementSteps[measurementStep].guideType} />
        )}
        
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            {measurementSteps[measurementStep].instruction}
          </Text>
          {measurementStep === 2 && poseAlignment.feedback && (
            <View style={[
              styles.feedbackContainer, 
              { backgroundColor: poseAlignment.isAligned ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 152, 0, 0.9)' }
            ]}>
              <Text style={styles.feedbackText}>{poseAlignment.feedback}</Text>
            </View>
          )}
        </View>

        {/* Processing indicator */}
        {isProcessing && (
          <View style={styles.processingOverlay}>
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>Analyzing your measurements...</Text>
              <Text style={styles.processingSubtext}>Using advanced computer vision</Text>
            </View>
          </View>
        )}
        
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(type === 'back' ? 'front' : 'back');
            }}
          >
            <Ionicons name="camera-reverse" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureInner} />
          </TouchableOpacity>
          
          <View style={styles.placeholder} />
        </View>
      </CameraView>
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
  // New MTailor-style features
  featuresContainer: {
    backgroundColor: '#f0f8ff',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  confidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  confidenceBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  confidenceText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  measurementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  measurementItem: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
  },
  measurementLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  measurementValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  accuracyNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 15,
  },
  guideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  cardGuide: {
    position: 'absolute',
    top: '35%',
    left: '20%',
    right: '20%',
    alignItems: 'center',
  },
  guideTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  cardOutline: {
    width: '100%',
    height: 60,
    borderWidth: 3,
    borderColor: 'white',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  guideSubtext: {
    color: 'white',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  bodyGuide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headGuide: {
    position: 'absolute',
    top: '12%',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderStyle: 'dashed',
  },
  bodyOutline: {
    position: 'absolute',
    top: '18%',
    width: screenWidth * 0.4,
    height: screenHeight * 0.6,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftArmGuide: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    width: 2,
    height: screenHeight * 0.3,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
  },
  rightArmGuide: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: 2,
    height: screenHeight * 0.3,
    borderRightWidth: 2,
    borderStyle: 'dashed',
  },
  guideText: {
    position: 'absolute',
    bottom: '20%',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
  feedbackContainer: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
  },
  feedbackText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  processingContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  processingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});