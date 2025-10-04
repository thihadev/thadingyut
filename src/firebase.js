import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Testing config keys (Do not delete, might need to revert back in future)

// const firebaseConfig = {
//   apiKey: "AIzaSyC-w-vSsbUBKiBV0g5zZqRmQ0oZm6iniMQ",
//   authDomain: "makewish-ebffe.firebaseapp.com",
//   databaseURL: "https://makewish-ebffe-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "makewish-ebffe",
//   storageBucket: "makewish-ebffe.firebasestorage.app",
//   messagingSenderId: "680237247290",
//   appId: "1:680237247290:web:a33f76a2e03f3970443e03",
//   measurementId: "G-HK13737165"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB0v2Fjp3nkKsRBzY_feZS9eHmfpVHvCLw",
  authDomain: "thadingyut-36147.firebaseapp.com",
  databaseURL: "https://thadingyut-36147-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thadingyut-36147",
  storageBucket: "thadingyut-36147.firebasestorage.app",
  messagingSenderId: "318201983309",
  appId: "1:318201983309:web:ca2d3b239bc39ca7420704",
  measurementId: "G-1TVWXDYPMN"
};


const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
