// TODO: create auth context, switch it later with zustand
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { createUserDocument } from "../firebase-config/firebase-helpers";
import { UsersCollectionType } from "../types/userCollectionType";
import { firebaseAuthErrorMap } from "../helpers";

interface AuthContextType {
  currentUser: User | null;
  LogInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  LogOut: () => Promise<void>;
  loading: boolean;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUserRef = localStorage.getItem("user");
    const storedUser =
      storedUserRef !== null ? JSON.parse(storedUserRef) : null;
    return storedUser;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // navigate instance
  const navigate = useNavigate();

  // update local storage when user changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const updateDisplayName = (name: string) => {
    if (!auth.currentUser) return;

    try {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/courses");
    }
  }, [currentUser]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      // when the auth state change changes, return the value accordingly
      setCurrentUser(user);
    });

    return () => unsub();
  }, []);

  // register new user
  const signUpWithEmail = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // add user to the users collection and update the user object
      updateDisplayName(username);
      // create new user document when the user signs up and add the user object to state
      const userRef = await createUserDocument(userCred.user);

      setCurrentUser({ ...userCred.user, displayName: username });
    } catch (error: any) {
      toast(firebaseAuthErrorMap[error.code]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const LogInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCred.user);
      setLoading(false);
      navigate("/courses");
    } catch (err: any) {
      setError(firebaseAuthErrorMap[err.code]);
      toast.error(firebaseAuthErrorMap[err.code]);
    } finally {
      setError("");
      setLoading(false);
    }
  };

  const LogOut = async () => {
    try {
      const response = await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err: any) {
      setError(firebaseAuthErrorMap[err.code]);
    } finally {
      navigate("/");
      setError("");
    }
  };

  const resetPassword = async (email: string) => {
    return await sendPasswordResetEmail(auth, email, {
      url: "https://ful-quiz.firebaseapp.com/courses",
      handleCodeInApp: false,
    });
  };

  const contextValues = {
    currentUser,
    LogInWithEmail,
    signUpWithEmail,
    LogOut,
    loading,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("User auth context must be used within a context provider");
  }
  return context;
};

export default AuthProvider;
