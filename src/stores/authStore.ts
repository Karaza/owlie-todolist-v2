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
import { useMainStore } from "./mainStore";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {
      user: {} as User,
      error: "",
    };
  },
  actions: {
    init() {
      const notesStore = useNotesStore();
      const mainStore = useMainStore();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.uid = user.uid;
          this.user.email = user.email;
          notesStore.init();
          mainStore.leftDrawerOpen = false;
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
          this.error = "";
        })
        .catch((error) => {
          this.error = "";
          switch (error.code) {
            case "auth/email-already-in-use":
              this.error = "Adresse email déjà utilisée";
              break;
            case "auth/invalid-email":
              this.error = "Adresse email invalide";
              break;
            case "auth/operation-not-allowed":
              this.error = "Operation non autorisée";
              break;
            case "auth/weak-password":
              this.error =
                "Le mot de passe doit contenir au moins 6 caractères.";
              break;
            default:
              this.error = "Erreur, réessayez ultérieurement";
          }
        });
    },
    loginUser(credentials: { email: string; password: string }) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          this.error = "";
          switch (error.code) {
            case "auth/user-not-found":
              this.error = "Utilisateur non trouvé";
              break;
            case "auth/wrong-password":
              this.error = "Mauvais mot de passe";
              break;
            default:
              this.error = "Erreur, réessayez ultérieurement";
          }
        });
    },
    logoutUser() {
      signOut(auth)
        .then(() => {
          this.error = "";
        })
        .catch((error) => {
          //
        });
    },
  },
});
