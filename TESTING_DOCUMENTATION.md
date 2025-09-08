# Testing Documentation - Shappi-Lolo Mobile Application

## Testing Overview

This document outlines the comprehensive testing strategy, methodologies, and procedures for the Shappi-Lolo mobile application. The testing approach ensures application reliability, performance, and user experience across multiple platforms and devices.

## Testing Strategy

### Testing Pyramid
1. **Unit Tests** (Base layer) - Individual component testing
2. **Integration Tests** (Middle layer) - Component interaction testing  
3. **End-to-End Tests** (Top layer) - Complete user workflow testing
4. **Manual Testing** - User experience and edge case validation

### Testing Types
- **Functional Testing**: Feature verification
- **Performance Testing**: Speed and responsiveness
- **Usability Testing**: User experience validation
- **Compatibility Testing**: Cross-platform functionality
- **Security Testing**: Data protection and privacy
- **Accessibility Testing**: Inclusive design compliance

## Testing Environment Setup

### Development Testing Environment
```json
{
  "testFramework": "Jest",
  "testRenderer": "react-test-renderer",
  "mockingLibrary": "jest-mock",
  "testUtilities": "@testing-library/react-native",
  "coverageThreshold": "80%"
}
```

### Testing Dependencies
```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "react-test-renderer": "19.0.0",
    "@testing-library/react-native": "^11.0.0",
    "@testing-library/jest-native": "^5.0.0",
    "jest-expo": "^50.0.0",
    "detox": "^20.0.0"
  }
}
```

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: [
    'Context/**/*.js',
    'Screens/**/*.js',
    'components/**/*.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## Unit Testing

### Context Testing

#### AuthContext Testing (`__tests__/Context/AuthContext.test.js`)
```javascript
import React from 'react';
import { render, act } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../../Context/AuthContext';

describe('AuthContext', () => {
  test('should provide default auth state', () => {
    const TestComponent = () => {
      const { isAuthenticated, user } = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(isAuthenticated).toBe(false);
    expect(user).toBe(null);
  });

  test('should handle login successfully', async () => {
    const TestComponent = () => {
      const { login } = useAuth();
      
      React.useEffect(() => {
        login({ email: 'test@test.com', password: 'password123' });
      }, []);

      return null;
    };

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
  });
});
```

#### CartContext Testing (`__tests__/Context/CartContext.test.js`)
```javascript
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart } from '../../Context/CartContext';

describe('CartContext', () => {
  test('should add item to cart', () => {
    const wrapper = ({ children }) => (
      <CartProvider>{children}</CartProvider>
    );
    
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Custom Suit',
        price: 299.99,
        quantity: 1
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(299.99);
  });

  test('should remove item from cart', () => {
    const wrapper = ({ children }) => (
      <CartProvider>{children}</CartProvider>
    );
    
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Custom Suit',
        price: 299.99,
        quantity: 1
      });
    });

    act(() => {
      result.current.removeFromCart('1');
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });
});
```

### Screen Component Testing

#### HomeScreen Testing (`__tests__/Screens/HomeScreen.test.js`)
```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../Screens/HomeScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
};

describe('HomeScreen', () => {
  test('renders main services correctly', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    expect(getByText('Book Appointment')).toBeTruthy();
    expect(getByText('Track Your Order')).toBeTruthy();
    expect(getByText('Bulk Orders')).toBeTruthy();
    expect(getByText('Custom Clothing')).toBeTruthy();
  });

  test('navigates to appointment booking when service is pressed', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen navigation={mockNavigation} />
      </NavigationContainer>
    );

    fireEvent.press(getByText('Book Appointment'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('AppointmentBooking');
  });
});
```

#### LoginScreen Testing (`__tests__/Screens/LoginScreen.test.js`)
```javascript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../../Screens/LoginScreen';
import { AuthProvider } from '../../Context/AuthContext';

describe('LoginScreen', () => {
  test('renders login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  test('validates email format', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    );

    const emailInput = getByPlaceholderText('Email');
    const loginButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
    });
  });
});
```

## Integration Testing

### Navigation Integration Testing
```javascript
// __tests__/integration/NavigationFlow.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../App';

describe('Navigation Integration', () => {
  test('complete authentication to home flow', async () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    // Test login flow
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    // Wait for navigation to home
    await waitFor(() => {
      expect(getByText('Book Appointment')).toBeTruthy();
    });
  });

  test('shopping flow integration', async () => {
    const { getByText } = render(<App />);
    
    // Navigate through shopping flow
    fireEvent.press(getByText('Shop'));
    
    await waitFor(() => {
      expect(getByText('Suits')).toBeTruthy();
    });
    
    fireEvent.press(getByText('Suits'));
    // Continue testing the flow...
  });
});
```

### Context Integration Testing
```javascript
// __tests__/integration/ContextIntegration.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { CartProvider } from '../../Context/CartContext';
import { AuthProvider } from '../../Context/AuthContext';
import CartScreen from '../../Screens/CartScreen';

describe('Context Integration', () => {
  test('cart and auth contexts work together', async () => {
    const { getByText } = render(
      <AuthProvider>
        <CartProvider>
          <CartScreen />
        </CartProvider>
      </AuthProvider>
    );

    // Test authenticated cart functionality
    await waitFor(() => {
      expect(getByText('Your Cart')).toBeTruthy();
    });
  });
});
```

## End-to-End Testing

### Detox E2E Testing Setup
```javascript
// detox.config.js
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/jest.config.js',
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/ShappiLolo.app',
      build: 'xcodebuild -workspace ios/ShappiLolo.xcworkspace -scheme ShappiLolo -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build'
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug'
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: { type: 'iPhone 14' }
    },
    emulator: {
      type: 'android.emulator',
      device: { avdName: 'Pixel_4_API_30' }
    }
  }
};
```

### E2E Test Examples
```javascript
// e2e/authFlow.e2e.js
describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should complete full login flow', async () => {
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    await waitFor(element(by.text('Book Appointment')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should handle invalid login', async () => {
    await element(by.id('email-input')).typeText('invalid@example.com');
    await element(by.id('password-input')).typeText('wrongpassword');
    await element(by.id('login-button')).tap();
    
    await waitFor(element(by.text('Invalid credentials')))
      .toBeVisible()
      .withTimeout(3000);
  });
});

// e2e/shoppingFlow.e2e.js
describe('Shopping Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
    // Login first
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
  });

  it('should complete purchase flow', async () => {
    await element(by.text('Shop')).tap();
    await element(by.text('Suits')).tap();
    await element(by.id('suit-item-1')).tap();
    await element(by.text('Add to Cart')).tap();
    await element(by.text('Cart')).tap();
    await element(by.text('Checkout')).tap();
    
    await waitFor(element(by.text('Order Confirmation')))
      .toBeVisible()
      .withTimeout(10000);
  });
});
```

## Performance Testing

### Performance Metrics
```javascript
// __tests__/performance/PerformanceTests.js
import { performance } from 'perf_hooks';

describe('Performance Tests', () => {
  test('screen rendering performance', async () => {
    const startTime = performance.now();
    
    const { getByText } = render(<HomeScreen />);
    
    await waitFor(() => {
      expect(getByText('Book Appointment')).toBeTruthy();
    });
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    expect(renderTime).toBeLessThan(1000); // Should render within 1 second
  });

  test('context state updates performance', () => {
    const wrapper = ({ children }) => (
      <CartProvider>{children}</CartProvider>
    );
    
    const { result } = renderHook(() => useCart(), { wrapper });

    const startTime = performance.now();
    
    act(() => {
      // Add 100 items to test performance
      for (let i = 0; i < 100; i++) {
        result.current.addToCart({
          id: `item-${i}`,
          name: `Item ${i}`,
          price: 10 + i,
          quantity: 1
        });
      }
    });

    const endTime = performance.now();
    const updateTime = endTime - startTime;
    
    expect(updateTime).toBeLessThan(500); // Should complete within 500ms
  });
});
```

### Memory Testing
```javascript
// __tests__/performance/MemoryTests.js
describe('Memory Usage Tests', () => {
  test('should not have memory leaks in navigation', async () => {
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Simulate navigation through multiple screens
    for (let i = 0; i < 10; i++) {
      const { unmount } = render(<HomeScreen />);
      unmount();
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB increase
  });
});
```

## Accessibility Testing

### Accessibility Test Suite
```javascript
// __tests__/accessibility/AccessibilityTests.js
import { render } from '@testing-library/react-native';
import { axe, toHaveNoViolations } from '@testing-library/jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  test('HomeScreen should be accessible', async () => {
    const { container } = render(<HomeScreen />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('buttons should have proper accessibility labels', () => {
    const { getByLabelText } = render(<HomeScreen />);
    
    expect(getByLabelText('Book appointment with tailor')).toBeTruthy();
    expect(getByLabelText('Track your order status')).toBeTruthy();
    expect(getByLabelText('View bulk order options')).toBeTruthy();
  });

  test('form inputs should be properly labeled', () => {
    const { getByLabelText } = render(<LoginScreen />);
    
    expect(getByLabelText('Email address')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
  });
});
```

## Security Testing

### Security Test Cases
```javascript
// __tests__/security/SecurityTests.js
describe('Security Tests', () => {
  test('should not store sensitive data in plain text', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123'
      });
    });

    // Check that password is not stored
    const authData = await AsyncStorage.getItem('@user_auth');
    const parsedData = JSON.parse(authData);
    
    expect(parsedData.password).toBeUndefined();
    expect(parsedData.token).toBeDefined();
  });

  test('should validate input sanitization', () => {
    const maliciousInput = '<script>alert("xss")</script>';
    const { getByPlaceholderText } = render(<LoginScreen />);
    
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, maliciousInput);
    
    // Should not contain script tags
    expect(emailInput.props.value).not.toContain('<script>');
  });
});
```

## Device Testing Matrix

### Target Devices
| Platform | Device | OS Version | Screen Size | Test Priority |
|----------|---------|------------|-------------|---------------|
| iOS | iPhone 14 | iOS 16+ | 6.1" | High |
| iOS | iPhone 13 mini | iOS 15+ | 5.4" | High |
| iOS | iPad Air | iPadOS 15+ | 10.9" | Medium |
| Android | Samsung Galaxy S23 | Android 13 | 6.1" | High |
| Android | Google Pixel 7 | Android 13 | 6.3" | High |
| Android | Samsung Galaxy Tab S8 | Android 12 | 11" | Medium |

### Testing Checklist per Device
- [ ] App launches successfully
- [ ] Authentication flow works
- [ ] Navigation is responsive
- [ ] Camera functionality works
- [ ] Forms are usable
- [ ] Performance is acceptable
- [ ] No crashes or freezes
- [ ] UI elements fit properly
- [ ] Touch targets are appropriate

## Test Data Management

### Test Data Sets
```javascript
// testData/users.js
export const testUsers = {
  validUser: {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    phone: '+1234567890'
  },
  invalidUser: {
    email: 'invalid-email',
    password: '123',
    name: '',
    phone: 'invalid-phone'
  }
};

// testData/products.js
export const testProducts = {
  suit: {
    id: 'suit-1',
    name: 'Classic Business Suit',
    price: 299.99,
    category: 'suits',
    fabric: 'wool'
  },
  shirt: {
    id: 'shirt-1',
    name: 'Cotton Dress Shirt',
    price: 79.99,
    category: 'shirts',
    fabric: 'cotton'
  }
};
```

## Continuous Integration Testing

### CI Pipeline Configuration
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run test:coverage
      - run: npm run test:e2e
      
  accessibility-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:a11y
      
  performance-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:performance
```

## Test Reporting

### Coverage Reports
- **Line Coverage**: Minimum 80%
- **Branch Coverage**: Minimum 75%
- **Function Coverage**: Minimum 85%
- **Statement Coverage**: Minimum 80%

### Test Reports Generation
```bash
# Generate test coverage report
npm run test:coverage

# Generate HTML coverage report
npm run test:coverage:html

# Generate performance report
npm run test:performance:report

# Generate accessibility report
npm run test:a11y:report
```

## Manual Testing Guidelines

### User Acceptance Testing (UAT)
1. **Authentication Testing**
   - User registration flow
   - Login/logout functionality
   - Password reset process
   - Profile management

2. **Core Feature Testing**
   - Appointment booking process
   - Measurement taking (both methods)
   - Custom clothing design
   - Shopping cart functionality
   - Order tracking

3. **Edge Case Testing**
   - Network connectivity issues
   - Low battery scenarios
   - Memory constraints
   - Invalid input handling

### Usability Testing
1. **First-time User Experience**
   - Onboarding flow
   - Feature discovery
   - Help documentation
   - Error recovery

2. **Regular User Experience**
   - Navigation efficiency
   - Task completion time
   - Feature accessibility
   - Satisfaction metrics

## Bug Tracking and Resolution

### Bug Report Template
```
Title: [Clear, descriptive title]
Priority: [High/Medium/Low]
Environment: [iOS/Android/Web] [Version]
Device: [Device model and OS version]
Steps to Reproduce:
1. [First step]
2. [Second step]
3. [Result]

Expected Result: [What should happen]
Actual Result: [What actually happens]
Screenshots: [If applicable]
Additional Notes: [Any other relevant information]
```

### Bug Classification
- **Critical**: App crashes, data loss, security issues
- **High**: Core features not working, major UI issues
- **Medium**: Minor feature issues, cosmetic problems
- **Low**: Enhancement requests, minor UI tweaks

## Testing Best Practices

### Code Quality
- Write tests before implementing features (TDD)
- Maintain high test coverage (80%+)
- Use descriptive test names
- Test edge cases and error conditions
- Keep tests simple and focused

### Test Maintenance
- Regular test suite updates
- Remove obsolete tests
- Refactor tests with code changes
- Update test data as needed
- Monitor test execution time

### Team Collaboration
- Code reviews for test changes
- Shared testing standards
- Regular testing discussions
- Test documentation updates
- Knowledge sharing sessions

This comprehensive testing documentation ensures the Shappi-Lolo application maintains high quality standards across all platforms and use cases, providing users with a reliable and enjoyable experience.