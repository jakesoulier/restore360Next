import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWaR0XfE5V-hKdCJmOZrcmXXjQ4TqI5PE",
  authDomain: "test-8b83c.firebaseapp.com",
  projectId: "test-8b83c",
  storageBucket: "test-8b83c.appspot.com",
  messagingSenderId: "714849456035",
  appId: "1:714849456035:web:2438358d5ff235c5cf5416",
  measurementId: "G-YV255G5C82"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// export default db;