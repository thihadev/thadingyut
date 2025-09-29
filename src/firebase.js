import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC-w-vSsbUBKiBV0g5zZqRmQ0oZm6iniMQ",
  authDomain: "makewish-ebffe.firebaseapp.com",
  databaseURL: "https://makewish-ebffe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "makewish-ebffe",
  storageBucket: "makewish-ebffe.firebasestorage.app",
  messagingSenderId: "680237247290",
  appId: "1:680237247290:web:a33f76a2e03f3970443e03",
  measurementId: "G-HK13737165"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
