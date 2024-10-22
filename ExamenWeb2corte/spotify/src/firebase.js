import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Tus credenciales de Firebase
  app: "Spoti_mike",
  apiKey: "AIzaSyDfAwY9v6vpZIUq4cu1tmwfrnxggjeCRZs",
  authDomain: "spotifymike-847b1.firebaseapp.com",
  projectId: "spotifymike-847b1",
  storageBucket: "spotifymike-847b1.appspot.com",
  messagingSenderId: "1035058141004",
  appId: "1:1035058141004:web:cd8ec18a80fa4d06c3a1e9",
  measurementId: "G-2B0V8CF2ZF"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
