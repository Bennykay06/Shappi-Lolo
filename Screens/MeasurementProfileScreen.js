import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native';
import { useMeasurements } from '../Context/MeasurementContext';

const { width } = Dimensions.get('window');

export default function MeasurementProfileScreen({ navigation }) {
  const { 
    currentMeasurements, 
    measurementHistory,
    getMeasurementSummary,
    hasValidMeasurements,
    clearMeasurements,
    lastUpdated
  } = useMeasurements();

  const summary = getMeasurementSummary();

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

  const handleClearMeasurements = () => {
    Alert.alert(
      'Clear Measurements',
      'Are you sure you want to clear all your saved measurements? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearMeasurements();
              Alert.alert('Success', 'All measurements have been cleared.');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear measurements.');
            }
          }
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Measurements</Text>
        {lastUpdated && (
          <Text style={styles.lastUpdated}>Last updated: {formatDate(lastUpdated)}</Text>
        )}
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Profile Completion</Text>
        <View style={styles.summaryStats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{summary.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{summary.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{Math.round(summary.completionPercentage)}%</Text>
            <Text style={styles.statLabel}>Complete</Text>
          </View>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${summary.completionPercentage}%` }
            ]} 
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ManualMeasurement')}
        >
          <Text style={styles.primaryButtonText}>
            {hasValidMeasurements() ? '✏️ Edit Measurements' : '📏 Add Measurements'}
          </Text>
        </TouchableOpacity>
        
        {measurementHistory.length > 0 && (
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate('MeasurementHistory')}
          >
            <Text style={styles.historyButtonText}>📊 View Full History</Text>
          </TouchableOpacity>
        )}
        
        {hasValidMeasurements() && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleClearMeasurements}
          >
            <Text style={styles.secondaryButtonText}>🗑️ Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Current Measurements */}
      {hasValidMeasurements() && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Measurements</Text>
          {Object.entries(currentMeasurements).map(([key, value]) => (
            value ? (
              <View key={key} style={styles.measurementItem}>
                <Text style={styles.measurementLabel}>{measurementLabels[key]}</Text>
                <Text style={styles.measurementValue}>{value}"</Text>
              </View>
            ) : null
          ))}
        </View>
      )}

      {/* Measurement History */}
      {measurementHistory.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent History</Text>
          {measurementHistory.slice(0, 5).map((entry, index) => (
            <View key={entry.id} style={styles.historyItem}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyDate}>{formatDate(entry.date)}</Text>
                <Text style={styles.historyNotes}>{entry.notes}</Text>
              </View>
              <Text style={styles.historyCount}>
                {Object.values(entry.measurements).filter(v => v && parseFloat(v) > 0).length} measurements
              </Text>
            </View>
          ))}
          
          {measurementHistory.length > 5 && (
            <TouchableOpacity 
              style={styles.viewMoreButton}
              onPress={() => navigation.navigate('MeasurementHistory')}
            >
              <Text style={styles.viewMoreText}>View All History ({measurementHistory.length} entries)</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Empty State */}
      {!hasValidMeasurements() && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>No Measurements Yet</Text>
          <Text style={styles.emptyStateText}>
            Start by adding your measurements to get perfectly fitted garments.
          </Text>
          <TouchableOpacity
            style={styles.emptyStateButton}
            onPress={() => navigation.navigate('ManualMeasurement')}
          >
            <Text style={styles.emptyStateButtonText}>📏 Add Your First Measurements</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

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
  },
  lastUpdated: {
    fontSize: 14,
    color: '#ecf0f1',
    textAlign: 'center',
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2c3e50',
    borderRadius: 4,
  },
  actionSection: {
    padding: 15,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2c3e50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e74c3c',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  measurementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  measurementLabel: {
    fontSize: 16,
    color: '#333',
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  historyItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  historyNotes: {
    fontSize: 12,
    color: '#666',
  },
  historyCount: {
    fontSize: 12,
    color: '#666',
  },
  viewMoreButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  viewMoreText: {
    color: '#2c3e50',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyStateButton: {
    backgroundColor: '#2c3e50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});