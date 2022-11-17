import { defineStore } from "pinia";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    return {};
  },
  actions: {
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
  },
});
