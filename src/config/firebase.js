import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClW-rf6bD81ytSSU6DMgz3HZNcKncvnVE",
  authDomain: "chanda-app-15b29.firebaseapp.com",
  projectId: "chanda-app-15b29",
  storageBucket: "chanda-app-15b29.firebasestorage.app",
  messagingSenderId: "349759037686",
  appId: "1:349759037686:android:5eb760a9c78d868b670cd7"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage persistence
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
