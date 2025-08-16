import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Auth Screens
import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignUpScreen';

// Main Screens
import HomeScreen from './Screens/HomeScreen';
import ShopScreen from './Screens/ShopScreen';
import MeasurementsScreen from './Screens/CameraMeasurementScreen';
import CartScreen from './Screens/CartScreen';
import AccountScreen from './Screens/AccountScreen';

// Category Screens
import CategoryScreen from './Screens/CategoryScreen';
import SuitsScreen from './Screens/SuitsScreen';
import SuitDetailScreen from './Screens/SuitDetailScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import CheckoutScreen from './Screens/CheckOutScreen';
import OrdersScreen from './Screens/OrdersScreen';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ShopStack = createStackNavigator();
const SuitsStack = createStackNavigator();
const AccountStack = createStackNavigator();

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
        options={{ title: 'PREMIUM SUITS' }}
      />
      <SuitsStack.Screen 
        name="SuitDetail" 
        component={SuitDetailScreen} 
        options={{ title: 'SUIT DETAILS' }}
      />
    </SuitsStack.Navigator>
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
        name="Category" 
        component={CategoryScreen}
        options={({ route }) => ({ 
          title: route.params?.categoryName || 'Category',
        })}
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
        component={MeasurementsScreen}
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
          tabBarBadge: 3, // Example badge count
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
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator 
        initialRouteName="Login"
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: false,
        }}
      >
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
  );
}