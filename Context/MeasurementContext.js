import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MeasurementContext = createContext();

const MEASUREMENT_STORAGE_KEY = '@user_measurements';
const MEASUREMENT_HISTORY_KEY = '@measurement_history';

const initialState = {
  currentMeasurements: {
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
    calf: '',
  },
  measurementHistory: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const measurementReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'LOAD_MEASUREMENTS':
      return { 
        ...state, 
        currentMeasurements: action.payload.current || initialState.currentMeasurements,
        measurementHistory: action.payload.history || [],
        lastUpdated: action.payload.lastUpdated,
        loading: false 
      };
    
    case 'UPDATE_MEASUREMENTS':
      return { 
        ...state, 
        currentMeasurements: action.payload.measurements,
        lastUpdated: action.payload.timestamp,
        loading: false 
      };
    
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        measurementHistory: [action.payload, ...state.measurementHistory].slice(0, 20), // Keep last 20 entries
        loading: false
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

export const MeasurementProvider = ({ children }) => {
  const [state, dispatch] = useReducer(measurementReducer, initialState);

  // Load measurements from AsyncStorage on app start
  useEffect(() => {
    loadMeasurements();
  }, []);

  const loadMeasurements = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const [storedMeasurements, storedHistory] = await Promise.all([
        AsyncStorage.getItem(MEASUREMENT_STORAGE_KEY),
        AsyncStorage.getItem(MEASUREMENT_HISTORY_KEY)
      ]);
      
      const current = storedMeasurements ? JSON.parse(storedMeasurements) : null;
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      
      dispatch({ 
        type: 'LOAD_MEASUREMENTS', 
        payload: { 
          current: current?.measurements, 
          history,
          lastUpdated: current?.lastUpdated 
        } 
      });
    } catch (error) {
      console.error('Error loading measurements:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load measurements' });
    }
  };

  const saveMeasurements = async (measurements, addToHistory = true) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const timestamp = new Date().toISOString();
      const measurementData = {
        measurements,
        lastUpdated: timestamp,
      };

      // Save current measurements
      await AsyncStorage.setItem(MEASUREMENT_STORAGE_KEY, JSON.stringify(measurementData));
      
      // Add to history if requested
      if (addToHistory) {
        const historyEntry = {
          id: timestamp,
          measurements,
          date: timestamp,
          notes: 'Manual entry',
        };
        
        const currentHistory = state.measurementHistory;
        const newHistory = [historyEntry, ...currentHistory].slice(0, 20);
        
        await AsyncStorage.setItem(MEASUREMENT_HISTORY_KEY, JSON.stringify(newHistory));
        dispatch({ type: 'ADD_TO_HISTORY', payload: historyEntry });
      }

      dispatch({ 
        type: 'UPDATE_MEASUREMENTS', 
        payload: { measurements, timestamp } 
      });

      return measurementData;
    } catch (error) {
      console.error('Error saving measurements:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save measurements' });
      throw error;
    }
  };

  const updateSingleMeasurement = async (field, value) => {
    try {
      const updatedMeasurements = {
        ...state.currentMeasurements,
        [field]: value,
      };
      
      await saveMeasurements(updatedMeasurements, false); // Don't add to history for single field updates
    } catch (error) {
      console.error('Error updating measurement:', error);
      throw error;
    }
  };

  const getMeasurementHistory = () => {
    return state.measurementHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const compareMeasurements = (oldMeasurements, newMeasurements) => {
    const changes = {};
    
    Object.keys(newMeasurements).forEach(key => {
      const oldValue = parseFloat(oldMeasurements[key]) || 0;
      const newValue = parseFloat(newMeasurements[key]) || 0;
      
      if (oldValue !== newValue) {
        changes[key] = {
          old: oldValue,
          new: newValue,
          difference: newValue - oldValue,
        };
      }
    });
    
    return changes;
  };

  const hasValidMeasurements = () => {
    const measurements = state.currentMeasurements;
    return Object.values(measurements).some(value => value && parseFloat(value) > 0);
  };

  const getMeasurementSummary = () => {
    const measurements = state.currentMeasurements;
    const validMeasurements = Object.entries(measurements)
      .filter(([key, value]) => value && parseFloat(value) > 0)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    
    return {
      total: Object.keys(measurements).length,
      completed: Object.keys(validMeasurements).length,
      measurements: validMeasurements,
      completionPercentage: (Object.keys(validMeasurements).length / Object.keys(measurements).length) * 100,
    };
  };

  const clearMeasurements = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      await AsyncStorage.removeItem(MEASUREMENT_STORAGE_KEY);
      
      dispatch({ 
        type: 'UPDATE_MEASUREMENTS', 
        payload: { 
          measurements: initialState.currentMeasurements, 
          timestamp: null 
        } 
      });
    } catch (error) {
      console.error('Error clearing measurements:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear measurements' });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    saveMeasurements,
    updateSingleMeasurement,
    getMeasurementHistory,
    compareMeasurements,
    hasValidMeasurements,
    getMeasurementSummary,
    clearMeasurements,
    clearError,
    loadMeasurements,
  };

  return (
    <MeasurementContext.Provider value={value}>
      {children}
    </MeasurementContext.Provider>
  );
};

export const useMeasurements = () => {
  const context = useContext(MeasurementContext);
  if (!context) {
    throw new Error('useMeasurements must be used within a MeasurementProvider');
  }
  return context;
};

export default MeasurementContext;