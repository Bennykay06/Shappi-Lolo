import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { CartProvider, useCart } from './Context/CartContext';
import { AppointmentProvider } from './Context/AppointmentContext';
import { MeasurementProvider } from './Context/MeasurementContext';

// Auth Screens
import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';

// Main Screens
import HomeScreen from './Screens/HomeScreen';
import ShopScreen from './Screens/ShopScreen';
import MeasurementsScreen from './Screens/MeasurementOptionsScreen';
import CameraMeasurementScreen from './Screens/CameraMeasurementScreen';
import ManualMeasurementScreen from './Screens/ManualMeasurementsScreen';
import CartScreen from './Screens/CartScreen';
import AccountScreen from './Screens/AccountScreen';

// Account Screens
import EditProfileScreen from './Screens/EditProfileScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import AddressesScreen from './Screens/AddressesScreen';
import PaymentMethodsScreen from './Screens/PaymentMethodsScreen';
import SupportScreen from './Screens/SupportScreen';

// Category Screens
import CategoryScreen from './Screens/CategoryScreen';
import CategoryItemsScreen from './Screens/CategoryItemsScreen';
import SuitsScreen from './Screens/SuitsScreen';
import SuitDetailScreen from './Screens/SuitDetailScreen';
import ShirtsScreen from './Screens/ShirtsScreen';
import BlazersScreen from './Screens/BlazersScreen';
import ProductDetailScreen from './Screens/ProductDetailScreen';
import ProductDetails from './Screens/ProductDetails';
import FavoritesScreen from './Screens/FavoritesScreen';
import CheckoutScreen from './Screens/CheckOutScreen';
import OrdersScreen from './Screens/OrdersScreen';
import CustomizeSuitScreen from './Screens/CustomizeSuitScreen';
import CustomizeShirtScreen from './Screens/CustomizeShirtScreen';

// Appointment Screens
import AppointmentScreen from './Screens/AppointmentScreen';
import FittingScreen from './Screens/FittingScreen';
import ConsultationScreen from './Screens/ConsultationScreen';
import AppointmentConfirmationScreen from './Screens/AppointmentConfirmationScreen';

// Measurement Screens
import MeasurementProfileScreen from './Screens/MeasurementProfileScreen';
import MeasurementHistoryScreen from './Screens/MeasurementHistoryScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ShopStack = createStackNavigator();
const SuitsStack = createStackNavigator();
const AccountStack = createStackNavigator();
const MeasurementsStack = createStackNavigator();

// Suits Stack Navigator
function SuitsStackNavigator() {
  return (
    <SuitsStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#6200ee',
        headerTitleAlign: 'center',
      }}
    >
      <SuitsStack.Screen 
        name="SuitsMain" 
        component={SuitsScreen} 
        options={{ headerShown: false }}
      />
      <SuitsStack.Screen 
        name="SuitDetail" 
        component={SuitDetailScreen} 
        options={{ headerShown: false }}
      />
      <SuitsStack.Screen 
        name="CustomizeSuitScreen" 
        component={CustomizeSuitScreen} 
        options={{ headerShown: false }}
      />
    </SuitsStack.Navigator>
  );
}

// Measurements Stack Navigator
function MeasurementsStackNavigator() {
  return (
    <MeasurementsStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#6200ee',
        headerTitleAlign: 'center',
      }}
    >
      <MeasurementsStack.Screen 
        name="MeasurementOptions" 
        component={MeasurementsScreen} 
        options={{ headerShown: false }}
      />
      <MeasurementsStack.Screen 
        name="CameraMeasurement" 
        component={CameraMeasurementScreen} 
        options={{ headerShown: false }}
      />
      <MeasurementsStack.Screen 
        name="ManualMeasurement" 
        component={ManualMeasurementScreen} 
        options={{ headerShown: false }}
      />
      <MeasurementsStack.Screen 
        name="MeasurementProfile" 
        component={MeasurementProfileScreen} 
        options={{ headerShown: false }}
      />
      <MeasurementsStack.Screen 
        name="MeasurementHistory" 
        component={MeasurementHistoryScreen} 
        options={{ headerShown: false }}
      />
    </MeasurementsStack.Navigator>
  );
}

// Account Stack Navigator
function AccountStackNavigator() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#6200ee',
        headerTitleAlign: 'center',
      }}
    >
      <AccountStack.Screen 
        name="AccountMain" 
        component={AccountScreen} 
        options={{ headerShown: false }}
      />
      <AccountStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ headerShown: false }}
      />
      <AccountStack.Screen 
        name="OrderHistory" 
        component={OrderHistoryScreen} 
        options={{ headerShown: false }}
      />
      <AccountStack.Screen 
        name="Addresses" 
        component={AddressesScreen} 
        options={{ headerShown: false }}
      />
      <AccountStack.Screen 
        name="PaymentMethods" 
        component={PaymentMethodsScreen} 
        options={{ headerShown: false }}
      />
      <AccountStack.Screen 
        name="Support" 
        component={SupportScreen} 
        options={{ headerShown: false }}
      />
      <AccountStack.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{ title: 'YOUR ORDERS' }}
      />
      <AccountStack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ title: 'YOUR FAVORITES' }}
      />
    </AccountStack.Navigator>
  );
}

// Shop Stack Navigator
function ShopStackNavigator() {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#6200ee',
        headerTitleAlign: 'center',
      }}
    >
      <ShopStack.Screen 
        name="ShopMain" 
        component={ShopScreen} 
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="CategoryItems" 
        component={CategoryItemsScreen}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="Category" 
        component={CategoryScreen}
        options={({ route }) => ({ 
          title: route.params?.categoryName || 'Category',
        })}
      />
      <ShopStack.Screen 
        name="ShirtsScreen" 
        component={ShirtsScreen}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="BlazersScreen" 
        component={BlazersScreen}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="CustomizeSuitScreen" 
        component={CustomizeSuitScreen}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="CustomizeShirtScreen" 
        component={CustomizeShirtScreen}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="ProductDetailScreen" 
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="ProductDetails" 
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <ShopStack.Screen 
        name="Suits" 
        component={SuitsStackNavigator}
        options={{ headerShown: false }}
      />
    </ShopStack.Navigator>
  );
}

// Cart Stack Navigator
function CartStackNavigator() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen 
        name="CartMain" 
        component={CartScreen} 
        options={{ title: 'YOUR CART' }}
      />
      <ShopStack.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ title: 'CHECKOUT' }}
      />
    </ShopStack.Navigator>
  );
}

function MainTabNavigator() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ShopTab') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          } else if (route.name === 'MeasurementsTab') {
            iconName = focused ? 'tape-measure' : 'tape-measure';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'AccountTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          height: Platform.OS === 'ios' ? 80 : 60,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === 'ios' ? 0 : 5,
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ 
          title: 'Home',
          tabBarTestID: 'home-tab',
        }} 
      />
      <Tab.Screen 
        name="ShopTab" 
        component={ShopStackNavigator} 
        options={{ 
          title: 'Shop',
          tabBarTestID: 'shop-tab',
        }} 
      />
      <Tab.Screen 
        name="MeasurementsTab" 
        component={MeasurementsStackNavigator}
        options={{ 
          title: 'Measure',
          tabBarTestID: 'measurements-tab',
        }} 
      />
      <Tab.Screen 
        name="CartTab" 
        component={CartStackNavigator}
        options={{ 
          title: 'Cart',
          tabBarTestID: 'cart-tab',
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
        }} 
      />
      <Tab.Screen 
        name="AccountTab" 
        component={AccountStackNavigator}
        options={{ 
          title: 'Account',
          tabBarTestID: 'account-tab',
        }} 
      />
    </Tab.Navigator>
  );
}

function MainAppStack() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: '#6200ee',
        headerTitleAlign: 'center',
      }}
    >
      <MainStack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        options={{ headerShown: false }}
      />
      <MainStack.Screen 
        name="Appointment" 
        component={AppointmentScreen} 
        options={{ headerShown: false }}
      />
      <MainStack.Screen 
        name="Fitting" 
        component={FittingScreen} 
        options={{ headerShown: false }}
      />
      <MainStack.Screen 
        name="Consultation" 
        component={ConsultationScreen} 
        options={{ headerShown: false }}
      />
      <MainStack.Screen 
        name="CustomizeSuit" 
        component={CustomizeSuitScreen} 
        options={{ headerShown: false }}
      />
      <MainStack.Screen 
        name="AppointmentConfirmation" 
        component={AppointmentConfirmationScreen} 
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <MeasurementProvider>
      <AppointmentProvider>
        <CartProvider>
          <NavigationContainer>
            <AuthStack.Navigator 
              initialRouteName="Splash"
              screenOptions={{ 
                headerShown: false,
                gestureEnabled: false,
              }}
            >
              <AuthStack.Screen 
                name="Splash" 
                component={SplashScreen} 
              />
              <AuthStack.Screen 
                name="Login" 
                component={LoginScreen} 
              />
              <AuthStack.Screen 
                name="SignUp" 
                component={SignUpScreen} 
              />
              <AuthStack.Screen 
                name="App" 
                component={MainAppStack}
                options={{ gestureEnabled: false }}
              />
            </AuthStack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </AppointmentProvider>
    </MeasurementProvider>
  );
}