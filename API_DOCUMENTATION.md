# API Documentation - Shappi-Lolo Mobile Application

## Overview

This document outlines the internal API structure, context methods, and data flow patterns used within the Shappi-Lolo React Native application. The app primarily uses React Context API for state management rather than external REST APIs.

## Context APIs

### 1. Authentication Context API (`Context/AuthContext.js`)

The AuthContext manages user authentication and session state throughout the application.

#### State Properties
```javascript
{
  isAuthenticated: boolean,
  user: object | null,
  isLoading: boolean,
  authToken: string | null
}
```

#### Methods

##### `login(credentials)`
**Purpose**: Authenticate user with email/password
**Parameters**: 
- `credentials.email` (string) - User email
- `credentials.password` (string) - User password
**Returns**: Promise<boolean>
**Usage**:
```javascript
const { login } = useAuth();
const success = await login({ email, password });
```

##### `logout()`
**Purpose**: Sign out user and clear authentication state
**Parameters**: None
**Returns**: Promise<void>
**Usage**:
```javascript
const { logout } = useAuth();
await logout();
```

##### `register(userData)`
**Purpose**: Create new user account
**Parameters**:
- `userData.email` (string)
- `userData.password` (string)
- `userData.name` (string)
- `userData.phone` (string)
**Returns**: Promise<boolean>

##### `updateProfile(profileData)`
**Purpose**: Update user profile information
**Parameters**: `profileData` (object) - Updated profile fields
**Returns**: Promise<boolean>

#### Storage Keys
- `@user_auth` - Authentication state
- `@user_data` - User profile data

---

### 2. Cart Context API (`Context/CartContext.js`)

Manages shopping cart functionality and e-commerce operations.

#### State Properties
```javascript
{
  items: array,
  totalItems: number,
  totalPrice: number,
  isLoading: boolean
}
```

#### Methods

##### `addToCart(item)`
**Purpose**: Add product to shopping cart
**Parameters**:
- `item.id` (string) - Product identifier
- `item.name` (string) - Product name
- `item.price` (number) - Product price
- `item.customizations` (object) - Custom options
- `item.quantity` (number) - Quantity to add
**Returns**: void

##### `removeFromCart(itemId)`
**Purpose**: Remove item from cart
**Parameters**: `itemId` (string)
**Returns**: void

##### `updateQuantity(itemId, quantity)`
**Purpose**: Update item quantity in cart
**Parameters**: 
- `itemId` (string)
- `quantity` (number)
**Returns**: void

##### `clearCart()`
**Purpose**: Empty the shopping cart
**Returns**: void

##### `calculateTotal()`
**Purpose**: Recalculate cart totals
**Returns**: number

---

### 3. Appointment Context API (`Context/AppointmentContext.js`)

Handles appointment booking and scheduling functionality.

#### State Properties
```javascript
{
  appointments: array,
  selectedDate: Date | null,
  selectedTime: string | null,
  isBooking: boolean,
  availableSlots: array
}
```

#### Methods

##### `bookAppointment(appointmentData)`
**Purpose**: Schedule new appointment
**Parameters**:
- `appointmentData.date` (Date)
- `appointmentData.time` (string)
- `appointmentData.service` (string)
- `appointmentData.notes` (string)
**Returns**: Promise<boolean>

##### `cancelAppointment(appointmentId)`
**Purpose**: Cancel existing appointment
**Parameters**: `appointmentId` (string)
**Returns**: Promise<boolean>

##### `getAvailableSlots(date)`
**Purpose**: Fetch available time slots for date
**Parameters**: `date` (Date)
**Returns**: Promise<array>

##### `rescheduleAppointment(appointmentId, newDateTime)`
**Purpose**: Change appointment date/time
**Parameters**: 
- `appointmentId` (string)
- `newDateTime` (object) - New date and time
**Returns**: Promise<boolean>

---

### 4. Measurement Context API (`Context/MeasurementContext.js`)

Manages user measurements and measurement history.

#### State Properties
```javascript
{
  measurements: object,
  measurementHistory: array,
  activeMeasurementSet: string | null,
  isProcessing: boolean
}
```

#### Methods

##### `saveMeasurements(measurements, type)`
**Purpose**: Store new measurement set
**Parameters**:
- `measurements` (object) - Measurement values
- `type` ('manual' | 'camera') - Measurement method
**Returns**: Promise<boolean>

##### `getMeasurementHistory()`
**Purpose**: Retrieve all saved measurements
**Returns**: Promise<array>

##### `deleteMeasurementSet(measurementId)`
**Purpose**: Remove measurement set
**Parameters**: `measurementId` (string)
**Returns**: Promise<boolean>

##### `setActiveMeasurements(measurementId)`
**Purpose**: Set default measurement set
**Parameters**: `measurementId` (string)
**Returns**: void

##### `processCameraMeasurements(imageData)`
**Purpose**: Extract measurements from camera image
**Parameters**: `imageData` (object) - Image data from camera
**Returns**: Promise<object>

## Data Models

### User Model
```javascript
{
  id: string,
  email: string,
  name: string,
  phone: string,
  address: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  preferences: {
    notifications: boolean,
    theme: 'light' | 'dark',
    currency: string,
    language: string
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Cart Item Model
```javascript
{
  id: string,
  productId: string,
  name: string,
  category: string,
  price: number,
  quantity: number,
  customizations: {
    fabric: string,
    color: string,
    style: string,
    measurements: object,
    specialInstructions: string
  },
  image: string,
  addedAt: Date
}
```

### Appointment Model
```javascript
{
  id: string,
  userId: string,
  date: Date,
  time: string,
  service: string,
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled',
  notes: string,
  tailor: {
    id: string,
    name: string,
    specialization: array
  },
  location: {
    type: 'in-store' | 'home-visit',
    address: string
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Measurement Model
```javascript
{
  id: string,
  userId: string,
  type: 'manual' | 'camera',
  measurements: {
    // Shirt measurements
    chest: number,
    waist: number,
    shoulders: number,
    armLength: number,
    neckSize: number,
    
    // Pants measurements
    waistCircumference: number,
    hipSize: number,
    inseam: number,
    outseam: number,
    thighCircumference: number,
    
    // Suit measurements
    jacketChest: number,
    jacketLength: number,
    shoulderWidth: number,
    armhole: number
  },
  units: 'inches' | 'cm',
  takenAt: Date,
  isActive: boolean
}
```

### Order Model
```javascript
{
  id: string,
  userId: string,
  items: array,
  totalAmount: number,
  status: 'pending' | 'confirmed' | 'in-production' | 'ready' | 'delivered' | 'cancelled',
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
  paymentMethod: string,
  shippingAddress: object,
  estimatedDelivery: Date,
  actualDelivery: Date | null,
  trackingNumber: string,
  notes: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Navigation API

### Stack Navigation Methods
Used throughout the app for screen navigation:

```javascript
// Navigate to screen
navigation.navigate('ScreenName', { param1: value1 });

// Go back
navigation.goBack();

// Reset navigation stack
navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }]
});

// Replace current screen
navigation.replace('NewScreen');
```

### Common Navigation Patterns

#### Authentication Flow
```javascript
// From LoginScreen to main app
navigation.reset({
  index: 0,
  routes: [{ name: 'MainTabs' }]
});
```

#### Product to Customization Flow
```javascript
// From product screen to customization
navigation.navigate('CustomizeShirt', {
  productId: item.id,
  basePrice: item.price
});
```

#### Cart to Checkout Flow
```javascript
// From cart to checkout
navigation.navigate('Checkout', {
  items: cartItems,
  totalAmount: totalPrice
});
```

## Storage API

### AsyncStorage Usage Patterns

#### Authentication Storage
```javascript
// Save auth data
await AsyncStorage.setItem('@user_auth', JSON.stringify({
  isAuthenticated: true,
  token: authToken
}));

// Retrieve auth data
const authData = await AsyncStorage.getItem('@user_auth');
const parsedAuth = JSON.parse(authData);
```

#### Cart Persistence
```javascript
// Save cart
await AsyncStorage.setItem('@cart_data', JSON.stringify(cartItems));

// Load cart
const cartData = await AsyncStorage.getItem('@cart_data');
const savedCart = cartData ? JSON.parse(cartData) : [];
```

## Error Handling

### Context Error Patterns
```javascript
try {
  const result = await apiOperation();
  return { success: true, data: result };
} catch (error) {
  console.error('Operation failed:', error);
  return { success: false, error: error.message };
}
```

### Navigation Error Handling
```javascript
// Safe navigation with error handling
const navigateToScreen = (screenName, params = {}) => {
  try {
    navigation.navigate(screenName, params);
  } catch (error) {
    console.error('Navigation error:', error);
    // Fallback navigation
    navigation.navigate('Home');
  }
};
```

## Performance Considerations

### Context Optimization
- Use multiple contexts to avoid unnecessary re-renders
- Implement context selectors for specific data
- Memoize context values to prevent recreation

### Storage Optimization
- Implement data compression for large objects
- Use background storage operations
- Implement cache invalidation strategies

## Security Considerations

### Authentication
- Store tokens securely using AsyncStorage
- Implement token refresh mechanisms
- Clear sensitive data on logout

### Data Protection
- Validate all user inputs
- Sanitize data before storage
- Implement proper access controls

## Testing API Methods

### Context Testing Patterns
```javascript
// Test authentication context
const mockAuthContext = {
  login: jest.fn(),
  logout: jest.fn(),
  isAuthenticated: false,
  user: null
};
```

### Navigation Testing
```javascript
// Mock navigation for testing
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn()
};
```

## Future API Enhancements

### Planned Additions
- Real-time notifications API
- Cloud synchronization API
- External payment gateway integration
- Push notification service
- Analytics and tracking API
- Social sharing API

This API documentation provides the foundation for understanding the internal data flow and method signatures used throughout the Shappi-Lolo application. It serves as a reference for developers working on the application and for integration with external services.