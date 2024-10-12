import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebase.js"

export const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("successful user created: " + user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  }
