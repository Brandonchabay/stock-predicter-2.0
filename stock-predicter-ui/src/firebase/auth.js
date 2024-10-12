import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase.js";

export const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("successful user created: " + user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("successful user logged in: " + user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { currentUser, loading };
};
