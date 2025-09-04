import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppointmentContext = createContext();

const APPOINTMENT_STORAGE_KEY = '@appointments';

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const appointmentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'LOAD_APPOINTMENTS':
      return { ...state, appointments: action.payload, loading: false };
    
    case 'ADD_APPOINTMENT':
      return { 
        ...state, 
        appointments: [...state.appointments, action.payload],
        loading: false 
      };
    
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt => 
          apt.id === action.payload.id ? action.payload : apt
        ),
        loading: false
      };
    
    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(apt => apt.id !== action.payload),
        loading: false
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

export const AppointmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  // Load appointments from AsyncStorage on app start
  useEffect(() => {
    loadAppointments();
  }, []);

  // Save appointments to AsyncStorage whenever appointments change
  useEffect(() => {
    if (state.appointments.length > 0) {
      saveAppointments(state.appointments);
    }
  }, [state.appointments]);

  const loadAppointments = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const storedAppointments = await AsyncStorage.getItem(APPOINTMENT_STORAGE_KEY);
      
      if (storedAppointments) {
        const appointments = JSON.parse(storedAppointments);
        dispatch({ type: 'LOAD_APPOINTMENTS', payload: appointments });
      } else {
        dispatch({ type: 'LOAD_APPOINTMENTS', payload: [] });
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load appointments' });
    }
  };

  const saveAppointments = async (appointments) => {
    try {
      await AsyncStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
      console.error('Error saving appointments:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to save appointments' });
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const newAppointment = {
        id: Date.now().toString(), // Simple ID generation
        ...appointmentData,
        createdAt: new Date().toISOString(),
        status: 'scheduled',
      };

      dispatch({ type: 'ADD_APPOINTMENT', payload: newAppointment });
      return newAppointment;
    } catch (error) {
      console.error('Error adding appointment:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to book appointment' });
      throw error;
    }
  };

  const updateAppointment = async (id, updates) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const appointment = state.appointments.find(apt => apt.id === id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      const updatedAppointment = {
        ...appointment,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      dispatch({ type: 'UPDATE_APPOINTMENT', payload: updatedAppointment });
      return updatedAppointment;
    } catch (error) {
      console.error('Error updating appointment:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update appointment' });
      throw error;
    }
  };

  const deleteAppointment = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'DELETE_APPOINTMENT', payload: id });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete appointment' });
      throw error;
    }
  };

  const getAppointmentsByType = (type) => {
    return state.appointments.filter(apt => apt.type === type);
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return state.appointments
      .filter(apt => {
        const appointmentDate = new Date(apt.date + ' ' + apt.time);
        return appointmentDate > now && apt.status === 'scheduled';
      })
      .sort((a, b) => {
        const dateA = new Date(a.date + ' ' + a.time);
        const dateB = new Date(b.date + ' ' + b.time);
        return dateA - dateB;
      });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByType,
    getUpcomingAppointments,
    clearError,
    loadAppointments,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

export default AppointmentContext;
