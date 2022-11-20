import { defineStore } from "pinia";
import { User } from "../components/models";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNotesStore } from "./notesStore";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: {} as User,
    };
  },
  actions: {
    init() {
      const notesStore = useNotesStore();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.uid = user.uid;
          this.user.email = user.email;
          notesStore.init();
        } else {
          this.user = {} as User;
          notesStore.clearNotes();
        }
      });
    },
    registerUser(credentials: { email: string; password: string }) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user: ", user);
        })
        .catch((error) => {
          console.log("error message: ", error.message);
        });
    },
    loginUser(credentials: { email: string; password: string }) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log("error message: ", error.message);
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          console.log("user signed out");
        })
        .catch((error) => {
          console.log("error message: ", error.message);
        });
    },
  },
});
