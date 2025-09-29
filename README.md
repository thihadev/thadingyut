# Thadingyut Festival Wishes - Setup Guide

A scalable Myanmar Thadingyut festival website that can handle 2 million users with real-time wish submissions displayed as floating lanterns.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Firebase Setup:**
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Realtime Database
   - Copy your Firebase config and replace in `src/firebase.js`
   - Import `firebase-rules.json` to your Firebase Realtime Database rules

3. **Start Development:**
   ```bash
   npm start
   ```

## 🏗️ Architecture for 2M Users

### Database Optimization
- **Indexed queries** on timestamp for fast retrieval
- **Limited to 50 latest wishes** for UI performance
- **Pagination ready** for future scaling
- **Validation rules** to prevent spam

### Performance Features
- **Redux state management** for efficient updates
- **Real-time listeners** only for latest 50 wishes
- **Optimized animations** with Framer Motion
- **Responsive design** for all devices

### Scaling Considerations
- Use Firebase's automatic scaling
- Implement rate limiting for submissions
- Add CDN for static assets
- Consider database sharding for extreme scale

## 🎨 Features

- **Real-time wish submissions** with Firebase
- **Animated Myanmar lanterns** floating in the sky
- **Latest 50 wishes display** with total count
- **Responsive design** for mobile and desktop
- **Beautiful animations** with Framer Motion
- **ShadCN UI components** for consistent design

## 🔧 Production Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## 📊 Monitoring

- Monitor Firebase usage in console
- Set up alerts for high traffic
- Use Firebase Analytics for user insights
- Monitor performance with Lighthouse

## 🛡️ Security

- Implement proper Firebase security rules
- Add rate limiting for wish submissions
- Validate input data on client and server
- Monitor for spam and abuse
