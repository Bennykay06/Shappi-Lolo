# Deployment Guide - Shappi-Lolo Mobile Application

## Deployment Overview

This comprehensive guide covers the deployment process for the Shappi-Lolo React Native mobile application across multiple platforms including iOS App Store, Google Play Store, and web deployment options.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Build Preparation](#build-preparation)
4. [iOS Deployment](#ios-deployment)
5. [Android Deployment](#android-deployment)
6. [Web Deployment](#web-deployment)
7. [Over-the-Air Updates](#over-the-air-updates)
8. [Production Monitoring](#production-monitoring)
9. [Rollback Procedures](#rollback-procedures)

## Pre-Deployment Checklist

### Code Quality Verification
- [ ] All unit tests passing (80%+ coverage)
- [ ] Integration tests completed
- [ ] End-to-end tests successful
- [ ] Performance benchmarks met
- [ ] Security audit completed
- [ ] Accessibility compliance verified
- [ ] Code review approved

### Content and Legal Requirements
- [ ] App store descriptions prepared
- [ ] Screenshots and app previews ready
- [ ] Privacy policy updated
- [ ] Terms of service reviewed
- [ ] Age rating assigned
- [ ] Content guidelines compliance
- [ ] Trademark clearance

### Technical Requirements
- [ ] All API endpoints configured for production
- [ ] SSL certificates installed
- [ ] CDN configured for assets
- [ ] Analytics integration tested
- [ ] Crash reporting enabled
- [ ] Performance monitoring active
- [ ] Backup systems verified

## Environment Configuration

### Production Environment Variables
Create production environment configuration:

```bash
# .env.production
API_BASE_URL=https://api.shappi-lolo.com
PAYMENT_GATEWAY_URL=https://payments.shappi-lolo.com
ANALYTICS_KEY=your_analytics_key
SENTRY_DSN=your_sentry_dsn
FABRIC_STORE_URL=https://fabrics.shappi-lolo.com
MEASUREMENT_AI_ENDPOINT=https://ai.shappi-lolo.com/measurements
NOTIFICATION_SERVICE_URL=https://notifications.shappi-lolo.com
```

### App Configuration Updates
Update `app.json` for production:

```json
{
  "expo": {
    "name": "Shappi-Lolo",
    "slug": "shappi-lolo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/production/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/production/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/your-project-id"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.shappilolo.app",
      "buildNumber": "1.0.0",
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "android": {
      "package": "com.shappilolo.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/production/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/production/favicon.png",
      "bundler": "metro"
    },
    "extra": {
      "eas": {
        "projectId": "your-eas-project-id"
      }
    }
  }
}
```

## Build Preparation

### EAS Build Configuration
Create `eas.json` in project root:

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m1-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true,
        "resourceClass": "m1-medium"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m1-medium"
      },
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleRelease"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id"
      },
      "android": {
        "serviceAccountKeyPath": "./service-account-key.json",
        "track": "production"
      }
    }
  }
}
```

### Asset Preparation
Prepare production assets:

```bash
# Optimize images
assets/production/
├── icon.png (1024x1024)
├── adaptive-icon.png (1024x1024)
├── splash.png (1284x2778)
├── favicon.png (48x48)
└── app-store-assets/
    ├── ios/
    │   ├── screenshots/
    │   └── app-preview.mp4
    └── android/
        ├── screenshots/
        └── feature-graphic.png
```

### Code Signing Setup

#### iOS Code Signing
1. **Apple Developer Account Setup**
   ```bash
   # Login to Apple Developer
   npx eas device:create
   ```

2. **Provisioning Profiles**
   ```bash
   # Create distribution certificate
   npx eas credentials:configure-build --platform=ios
   ```

#### Android Code Signing
1. **Generate Keystore**
   ```bash
   # Generate upload keystore
   keytool -genkeypair -v -storetype PKCS12 -keystore upload-keystore.p12 -alias upload -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configure Gradle**
   ```gradle
   // android/app/build.gradle
   android {
       signingConfigs {
           release {
               storeFile file('upload-keystore.p12')
               storePassword System.getenv("UPLOAD_STORE_PASSWORD")
               keyAlias 'upload'
               keyPassword System.getenv("UPLOAD_KEY_PASSWORD")
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
           }
       }
   }
   ```

## iOS Deployment

### Build Process
1. **Build for Production**
   ```bash
   # Install EAS CLI
   npm install -g @expo/eas-cli
   
   # Configure EAS project
   eas build:configure
   
   # Build for iOS
   eas build --platform ios --profile production
   ```

2. **Download and Verify Build**
   ```bash
   # Check build status
   eas build:list
   
   # Download build when ready
   eas build:download [build-id]
   ```

### App Store Connect Submission

1. **Prepare App Store Connect**
   - Create new app record
   - Configure app information
   - Upload screenshots and metadata
   - Set up pricing and availability

2. **App Information Setup**
   ```yaml
   App Name: Shappi-Lolo
   Bundle ID: com.shappilolo.app
   Primary Language: English
   Category: Shopping
   Content Rating: 4+
   
   Description: |
     Shappi-Lolo is your personal tailor in your pocket. 
     Book appointments, take digital measurements, and 
     design custom clothing with our intuitive mobile app.
     
   Keywords: tailor, custom clothing, measurements, fashion, suits
   Support URL: https://shappilolo.com/support
   Privacy Policy: https://shappilolo.com/privacy
   ```

3. **Submit for Review**
   ```bash
   # Submit using EAS
   eas submit --platform ios --profile production
   
   # Or manually through App Store Connect
   ```

### iOS Review Guidelines Compliance
- **Design Guidelines**: Follow iOS Human Interface Guidelines
- **Performance**: App launches within 3 seconds
- **Functionality**: All features work as described
- **Content**: Appropriate for 4+ age rating
- **Privacy**: Implement App Tracking Transparency
- **Payments**: Use App Store payment system for digital goods

## Android Deployment

### Build Process
1. **Build for Production**
   ```bash
   # Build Android App Bundle (recommended)
   eas build --platform android --profile production
   ```

2. **Generate APK for Testing**
   ```bash
   # Build APK for internal testing
   eas build --platform android --profile preview
   ```

### Google Play Console Submission

1. **Prepare Play Console**
   - Create app record
   - Configure store listing
   - Upload screenshots and graphics
   - Set up content rating

2. **Store Listing Configuration**
   ```yaml
   App Name: Shappi-Lolo
   Short Description: Custom tailoring made simple
   Full Description: |
     Transform your wardrobe with Shappi-Lolo, the revolutionary 
     custom tailoring app. Book appointments, take precise 
     measurements using AI, and design clothing that fits 
     perfectly every time.
     
     Features:
     • AI-powered measurement technology
     • Custom clothing designer
     • Appointment scheduling
     • Order tracking
     • Multiple payment options
     
   Category: Shopping
   Content Rating: Everyone
   ```

3. **Submit for Review**
   ```bash
   # Submit using EAS
   eas submit --platform android --profile production
   ```

### Android Review Requirements
- **Target API Level**: Android 13 (API level 33) or higher
- **App Bundle**: Use Android App Bundle format
- **Permissions**: Request only necessary permissions
- **64-bit Support**: Include native libraries for 64-bit devices
- **Content Policy**: Comply with Google Play policies

## Web Deployment

### Build Web Version
```bash
# Build web version
npx expo export --platform web

# Output will be in dist/ directory
```

### Hosting Options

#### Option 1: Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build:web
netlify deploy --prod --dir=dist
```

#### Option 2: Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npx expo export --platform web
cd dist && vercel --prod
```

#### Option 3: Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Build and deploy
npm run build:web
firebase deploy --only hosting
```

### Web Configuration
Create `webpack.config.js` for custom web build:
```javascript
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize config for production
  if (config.mode === 'production') {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
  }
  
  return config;
};
```

## Over-the-Air Updates

### EAS Update Configuration
```bash
# Configure EAS Updates
eas update:configure

# Publish update
eas update --branch production --message "Bug fixes and improvements"
```

### Update Strategy
```javascript
// App.js - Update handling
import * as Updates from 'expo-updates';

export default function App() {
  useEffect(() => {
    async function checkForUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    }
    
    checkForUpdates();
  }, []);

  return (
    // Your app content
  );
}
```

### Update Rollout Strategy
1. **Gradual Rollout**: Release to 5% → 25% → 50% → 100%
2. **Feature Flags**: Control feature visibility
3. **Monitoring**: Track update success rates
4. **Rollback Plan**: Revert to previous version if issues arise

## Production Monitoring

### Analytics Integration
```javascript
// analytics/index.js
import { Analytics } from '@segment/analytics-react-native';
import { Sentry } from '@sentry/react-native';

export const initializeAnalytics = () => {
  // Segment Analytics
  Analytics.setup('your-segment-write-key', {
    trackAppLifecycleEvents: true,
    recordScreenViews: true,
  });
  
  // Sentry Error Tracking
  Sentry.init({
    dsn: 'your-sentry-dsn',
    debug: __DEV__,
    environment: __DEV__ ? 'development' : 'production',
  });
};
```

### Performance Monitoring
```javascript
// monitoring/performance.js
import { Performance } from '@react-native-firebase/perf';

export const trackScreenPerformance = (screenName) => {
  const trace = Performance().newTrace(`screen_${screenName}`);
  trace.start();
  
  return {
    stop: () => trace.stop()
  };
};
```

### Health Checks
```javascript
// monitoring/health.js
export const performHealthCheck = async () => {
  const checks = {
    api: await checkApiHealth(),
    storage: await checkStorageHealth(),
    camera: await checkCameraPermissions(),
    notifications: await checkNotificationPermissions()
  };
  
  return checks;
};
```

## Rollback Procedures

### Emergency Rollback
```bash
# Rollback OTA update
eas update --branch production --message "Rollback to previous version" --republish

# Rollback app store version
# This requires a new app store submission
```

### Gradual Rollback
1. **Stop current rollout** in app store consoles
2. **Identify affected users** through analytics
3. **Deploy hotfix** with over-the-air update
4. **Monitor metrics** for improvement
5. **Resume rollout** when stable

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Performance benchmarks met
- [ ] Security audit completed
- [ ] Privacy policy updated
- [ ] App store assets ready
- [ ] Signing certificates configured

### During Deployment
- [ ] Build completed successfully
- [ ] App store submission successful
- [ ] OTA update published
- [ ] Monitoring systems active
- [ ] Support team notified

### Post-Deployment
- [ ] App store approval received
- [ ] User adoption metrics tracked
- [ ] Error rates monitored
- [ ] Performance metrics analyzed
- [ ] User feedback reviewed
- [ ] Support documentation updated

## Deployment Automation

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy Production
on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Setup EAS CLI
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
          
      - name: Build iOS
        run: eas build --platform ios --profile production --non-interactive
        
      - name: Build Android
        run: eas build --platform android --profile production --non-interactive
        
      - name: Submit to App Stores
        run: |
          eas submit --platform ios --profile production --non-interactive
          eas submit --platform android --profile production --non-interactive
```

### Deployment Scripts
```bash
#!/bin/bash
# deploy.sh

set -e

echo "Starting deployment process..."

# Run tests
npm test

# Build for all platforms
eas build --platform all --profile production

# Wait for builds to complete
echo "Waiting for builds to complete..."
sleep 300  # 5 minutes

# Submit to app stores
eas submit --platform all --profile production

# Publish OTA update
eas update --branch production --message "Version $1 deployment"

echo "Deployment completed successfully!"
```

## Maintenance and Support

### Regular Maintenance Tasks
- **Weekly**: Monitor app performance and error rates
- **Monthly**: Review user feedback and ratings
- **Quarterly**: Security audit and dependency updates
- **Annually**: Privacy policy and legal compliance review

### Support Infrastructure
- **Customer Support**: In-app chat and email support
- **Documentation**: Comprehensive user guides and FAQs
- **Issue Tracking**: Integrated bug reporting system
- **Knowledge Base**: Self-service help articles

This deployment guide provides a comprehensive framework for successfully deploying and maintaining the Shappi-Lolo mobile application across all target platforms while ensuring quality, security, and user satisfaction.