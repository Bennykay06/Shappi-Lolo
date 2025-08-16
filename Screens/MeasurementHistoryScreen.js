import React, { useState } from 'react';
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

export default function MeasurementHistoryScreen({ navigation }) {
  const { 
    measurementHistory,
    currentMeasurements,
    saveMeasurements,
    compareMeasurements,
    loading
  } = useMeasurements();

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [expandedEntry, setExpandedEntry] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMeasurementCount = (measurements) => {
    return Object.values(measurements).filter(value => value && parseFloat(value) > 0).length;
  };

  const handleRestoreEntry = (entry) => {
    Alert.alert(
      'Restore Measurements',
      `Are you sure you want to restore measurements from ${formatDate(entry.date)}? This will replace your current measurements.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          onPress: async () => {
            try {
              await saveMeasurements(entry.measurements, true);
              Alert.alert('Success', 'Measurements restored successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to restore measurements.');
            }
          }
        }
      ]
    );
  };

  const handleCompareWithCurrent = (entry) => {
    if (!currentMeasurements) {
      Alert.alert('No Current Measurements', 'You need to have current measurements to compare.');
      return;
    }

    const changes = compareMeasurements(entry.measurements, currentMeasurements);
    
    if (Object.keys(changes).length === 0) {
      Alert.alert('No Changes', 'These measurements are identical to your current ones.');
      return;
    }

    let comparisonText = 'Changes since this entry:\n\n';
    Object.entries(changes).forEach(([key, change]) => {
      const direction = change.difference > 0 ? '↗️' : '↘️';
      comparisonText += `${key}: ${change.old}" → ${change.new}" (${direction} ${Math.abs(change.difference)}")\n`;
    });

    Alert.alert('Measurement Comparison', comparisonText);
  };

  const renderMeasurementEntry = (entry, index) => {
    const isExpanded = expandedEntry === entry.id;
    const measurementCount = getMeasurementCount(entry.measurements);
    
    return (
      <View key={entry.id} style={styles.historyCard}>
        <TouchableOpacity
          style={styles.historyHeader}
          onPress={() => setExpandedEntry(isExpanded ? null : entry.id)}
        >
          <View style={styles.historyInfo}>
            <Text style={styles.historyDate}>{formatDate(entry.date)}</Text>
            <Text style={styles.historyNotes}>{entry.notes || 'No notes'}</Text>
            <Text style={styles.historyCount}>{measurementCount} measurements</Text>
          </View>
          <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.historyDetails}>
            {/* Measurements Grid */}
            <View style={styles.measurementsGrid}>
              {Object.entries(entry.measurements).map(([key, value]) => (
                value && parseFloat(value) > 0 ? (
                  <View key={key} style={styles.measurementItem}>
                    <Text style={styles.measurementLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Text>
                    <Text style={styles.measurementValue}>{value}"</Text>
                  </View>
                ) : null
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.restoreButton}
                onPress={() => handleRestoreEntry(entry)}
              >
                <Text style={styles.restoreButtonText}>🔄 Restore</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.compareButton}
                onPress={() => handleCompareWithCurrent(entry)}
              >
                <Text style={styles.compareButtonText}>📊 Compare</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Measurement History</Text>
        <Text style={styles.subtitle}>Track your measurement changes over time</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{measurementHistory.length}</Text>
          <Text style={styles.statLabel}>Total Entries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {measurementHistory.length > 0 ? formatDate(measurementHistory[0].date).split(',')[0] : 'None'}
          </Text>
          <Text style={styles.statLabel}>Latest Entry</Text>
        </View>
      </View>

      {/* History List */}
      <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
        {measurementHistory.length > 0 ? (
          measurementHistory.map((entry, index) => renderMeasurementEntry(entry, index))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No History Yet</Text>
            <Text style={styles.emptyStateText}>
              Your measurement history will appear here when you save measurements using "Save to History".
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => navigation.navigate('ManualMeasurement')}
            >
              <Text style={styles.emptyStateButtonText}>📏 Add Measurements</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      {measurementHistory.length > 0 && (
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('ManualMeasurement')}
          >
            <Text style={styles.quickActionText}>📏 Add New Measurements</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  historyList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  historyNotes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyCount: {
    fontSize: 12,
    color: '#2c3e50',
    fontWeight: '600',
  },
  expandIcon: {
    fontSize: 16,
    color: '#666',
    marginLeft: 15,
  },
  historyDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 20,
    paddingTop: 15,
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  measurementItem: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  measurementLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  measurementValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  restoreButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  restoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  compareButton: {
    flex: 1,
    backgroundColor: '#f39c12',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  compareButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
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
  quickActions: {
    padding: 15,
    paddingBottom: 25,
  },
  quickActionButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});