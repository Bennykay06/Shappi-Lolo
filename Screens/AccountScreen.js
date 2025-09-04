import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Switch
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // Mock user data - replace with actual user context/state
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: '2023',
    avatar: require('../assets/images/login.jpg') // placeholder
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleOrderHistory = () => {
    navigation.navigate('OrderHistory');
  };

  const handleAddresses = () => {
    navigation.navigate('Addresses');
  };

  const handlePaymentMethods = () => {
    navigation.navigate('PaymentMethods');
  };

  const handleSupport = () => {
    navigation.navigate('Support');
  };

  const handleMeasurementHistory = () => {
    navigation.navigate('MeasurementHistory');
  };

  const handleAppointments = () => {
    navigation.navigate('AppointmentsList');
  };

  const handleBookedItems = () => {
    navigation.navigate('BookedItems');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation.navigate('Login') }
      ]
    );
  };

  const MenuItem = ({ icon, title, onPress, hasSwitch = false, switchValue = false, onSwitchChange }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} disabled={hasSwitch}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={24} color="#666" />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {hasSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#767577', true: '#6200ee' }}
          thumbColor={switchValue ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={20} color="#6200ee" />
        </TouchableOpacity>
      </View>

      {/* Menu Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <MenuItem
          icon="person-outline"
          title="Edit Profile"
          onPress={handleEditProfile}
        />
        <MenuItem
          icon="receipt-outline"
          title="Order History"
          onPress={handleOrderHistory}
        />
        <MenuItem
          icon="location-outline"
          title="Delivery Addresses"
          onPress={handleAddresses}
        />
        <MenuItem
          icon="card-outline"
          title="Payment Methods"
          onPress={handlePaymentMethods}
        />
        <MenuItem
          icon="resize-outline"
          title="Measurement History"
          onPress={handleMeasurementHistory}
        />
        <MenuItem
          icon="calendar-outline"
          title="My Appointments"
          onPress={handleAppointments}
        />
        <MenuItem
          icon="bookmark-outline"
          title="My Bookings"
          onPress={handleBookedItems}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <MenuItem
          icon="notifications-outline"
          title="Push Notifications"
          hasSwitch={true}
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />
        <MenuItem
          icon="mail-outline"
          title="Email Notifications"
          hasSwitch={true}
          switchValue={emailNotifications}
          onSwitchChange={setEmailNotifications}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <MenuItem
          icon="help-circle-outline"
          title="Help & Support"
          onPress={handleSupport}
        />
        <MenuItem
          icon="document-text-outline"
          title="Terms & Conditions"
          onPress={() => Alert.alert('Terms & Conditions', 'Terms and conditions content would be displayed here')}
        />
        <MenuItem
          icon="shield-outline"
          title="Privacy Policy"
          onPress={() => Alert.alert('Privacy Policy', 'Privacy policy content would be displayed here')}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#d32f2f" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Shappi-Lolo v1.0.0</Text>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  editButton: {
    padding: 8,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutText: {
    fontSize: 16,
    color: '#d32f2f',
    marginLeft: 10,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});

export default AccountScreen;