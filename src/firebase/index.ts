import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXHnzuHq4VxAqcIjl-cMsLRM53ZdAHBiE",
  authDomain: "owlie-todolist-63038.firebaseapp.com",
  projectId: "owlie-todolist-63038",
  storageBucket: "owlie-todolist-63038.appspot.com",
  messagingSenderId: "184755530796",
  appId: "1:184755530796:web:699a64f3be0046f5893589",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
