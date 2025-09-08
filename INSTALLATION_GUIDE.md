# Installation & Setup Guide - Shappi-Lolo

## System Requirements

### Development Environment
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (or Yarn 1.22.0+)
- **Git**: Latest version
- **Expo CLI**: Latest version globally installed

### Platform-Specific Requirements

#### For iOS Development
- **macOS**: 10.15 (Catalina) or higher
- **Xcode**: 13.0 or higher
- **iOS Simulator**: Available through Xcode
- **Apple Developer Account**: For device testing and App Store deployment

#### For Android Development
- **Android Studio**: Latest version
- **Android SDK**: API Level 31 or higher
- **Java Development Kit (JDK)**: Version 11 or higher
- **Android Virtual Device (AVD)**: For emulator testing

#### For Web Development
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge
- **Web Server**: For production deployment

## Pre-Installation Setup

### 1. Install Node.js
Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Expo CLI
```bash
npm install -g @expo/cli
```

Verify Expo CLI installation:
```bash
expo --version
```

### 3. Install Development Tools

#### For iOS (macOS only)
1. Install Xcode from Mac App Store
2. Install Xcode Command Line Tools:
```bash
xcode-select --install
```

#### For Android
1. Download and install Android Studio
2. Install Android SDK and build tools
3. Set up Android environment variables:

**Windows:**
```cmd
set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\emulator;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin;%ANDROID_HOME%\platform-tools
```

**macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/Shappi-Lolo.git
cd Shappi-Lolo
```

### 2. Install Dependencies
```bash
npm install
```

Or using Yarn:
```bash
yarn install
```

### 3. Verify Installation
Check that all dependencies are properly installed:
```bash
npm ls
```

## Configuration

### 1. Expo Configuration
The app is pre-configured with `app.json`. Key configurations include:

```json
{
  "expo": {
    "name": "my-expo-app",
    "slug": "my-expo-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true
  }
}
```

### 2. Environment Setup
Create a `.env` file in the root directory (if needed for API keys):
```env
API_BASE_URL=https://your-api-endpoint.com
PAYMENT_GATEWAY_KEY=your_payment_key
ANALYTICS_KEY=your_analytics_key
```

### 3. Asset Verification
Ensure all required assets are in place:
```
assets/
├── icon.png
├── splash-icon.png
├── adaptive-icon.png
├── favicon.png
└── images/
    ├── sewing.png
    ├── track-order-icon.png
    ├── bulk-orders-icon.png
    └── custom-clothing-icon.png
```

## Running the Application

### 1. Start Development Server
```bash
npm start
```
Or:
```bash
expo start
```

This will open the Expo Developer Tools in your browser.

### 2. Run on iOS Simulator
```bash
npm run ios
```
Or:
```bash
expo start --ios
```

### 3. Run on Android Emulator
```bash
npm run android
```
Or:
```bash
expo start --android
```

### 4. Run on Web
```bash
npm run web
```
Or:
```bash
expo start --web
```

### 5. Run on Physical Device
1. Install Expo Go app on your device:
   - **iOS**: Download from App Store
   - **Android**: Download from Google Play Store

2. Scan QR code displayed in terminal or browser
3. App will load on your device

## Development Workflow

### 1. File Structure Overview
```
Shappi-Lolo/
├── App.js              # Main app component
├── index.js           # Entry point
├── package.json       # Dependencies
├── app.json          # Expo configuration
├── Context/          # React contexts
├── Screens/          # All app screens
├── assets/           # Images and icons
├── styles/           # Stylesheets
└── data/            # Static data
```

### 2. Adding New Dependencies
```bash
npm install package-name
```

For React Native specific packages:
```bash
expo install package-name
```

### 3. Code Organization
- **Screens**: Individual screen components
- **Context**: Global state management
- **Assets**: Images, fonts, and other static files
- **Styles**: Shared styling definitions

## Testing Setup

### 1. Install Testing Dependencies
```bash
npm install --save-dev jest react-test-renderer
```

### 2. Run Tests
```bash
npm test
```

### 3. Device Testing Checklist
- [ ] Authentication flow
- [ ] Navigation between screens  
- [ ] Cart functionality
- [ ] Camera permissions and functionality
- [ ] Form submissions
- [ ] Offline behavior
- [ ] Performance on low-end devices

## Building for Production

### 1. Expo Build Service (EAS Build)
Install EAS CLI:
```bash
npm install -g @expo/eas-cli
```

Configure EAS:
```bash
eas build:configure
```

Build for production:
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Both platforms
eas build --platform all
```

### 2. Local Builds

#### iOS (macOS only)
```bash
expo run:ios --configuration Release
```

#### Android
```bash
expo run:android --variant release
```

### 3. Web Build
```bash
expo export:web
```

## Deployment

### 1. App Store Deployment (iOS)
1. Build production iOS app using EAS Build
2. Download .ipa file
3. Use Xcode or Application Loader to upload to App Store Connect
4. Submit for review

### 2. Google Play Store Deployment (Android)
1. Build production Android app using EAS Build
2. Download .aab or .apk file
3. Upload to Google Play Console
4. Submit for review

### 3. Web Deployment
Deploy the web build to hosting services:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect GitHub repository
- **Firebase Hosting**: Use Firebase CLI

## Troubleshooting

### Common Issues

#### 1. Metro Bundler Issues
```bash
# Clear Metro cache
expo start --clear

# or
npx react-native start --reset-cache
```

#### 2. iOS Simulator Issues
```bash
# Reset iOS simulator
xcrun simctl erase all
```

#### 3. Android Emulator Issues
```bash
# List available AVDs
emulator -list-avds

# Start specific AVD
emulator -avd YourAVDName
```

#### 4. Dependency Conflicts
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### 5. Expo Version Issues
```bash
# Update Expo CLI
npm install -g @expo/cli@latest

# Check for outdated packages
expo doctor
```

### Error Solutions

#### "Unable to resolve module" errors
1. Check if the module is properly installed
2. Verify import paths are correct
3. Clear Metro cache
4. Restart development server

#### Camera permission issues
1. Ensure camera permissions are properly configured
2. Test on physical device (camera doesn't work in simulator)
3. Check app.json for camera permissions

#### Build failures
1. Check all assets exist in specified paths
2. Verify app.json configuration
3. Ensure all dependencies are compatible
4. Check for TypeScript errors

## Performance Optimization

### Development
- Use React Native Debugger for debugging
- Enable Fast Refresh for quicker development
- Use Flipper for advanced debugging

### Production
- Enable Hermes JavaScript engine
- Optimize images and assets
- Implement code splitting
- Use production builds for testing

## Security Considerations

### Development
- Never commit sensitive keys to version control
- Use environment variables for configuration
- Test on multiple devices and OS versions

### Production
- Enable code obfuscation
- Implement certificate pinning
- Use secure storage for sensitive data
- Regular security audits

## Support and Resources

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)

### Community
- [Expo Discord](https://discord.gg/expo)
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Tools
- [Expo Snack](https://snack.expo.dev/) - Online playground
- [React Native Elements](https://react-native-elements.github.io/react-native-elements/)
- [React Native Vector Icons](https://oblador.github.io/react-native-vector-icons/)

## Next Steps

After successful installation:
1. Familiarize yourself with the codebase structure
2. Review the API documentation
3. Test all major features on target platforms
4. Set up continuous integration (if needed)
5. Configure analytics and crash reporting
6. Plan deployment strategy

This installation guide provides a comprehensive setup process for the Shappi-Lolo mobile application. Follow each step carefully to ensure a smooth development experience.