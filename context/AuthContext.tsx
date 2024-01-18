"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth, db } from "../services/firebase.config";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useProfile } from "./ProfileContext";

import dayjs from 'dayjs';
interface AuthContextProps {
  uid:string;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  uid: "",
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState("");
  const {setFirstName,setLastName,setEmail,setPhone,setDob,setBio,setDp,setLastActive,setGender} = useProfile();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(authUser) => {
      setLoading(true);
      if (authUser) {
        console.log(authUser);

        const{uid} = authUser;
        setUid(uid);
        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const {firstName,lastName,email,phone,dob,bio,photoURL,timestamp,gender} = docSnap.data();
          console.log(firstName,lastName,email,phone,dob,bio,photoURL)
          setFirstName(firstName);
          setLastName(lastName);
          setEmail(email);
          setPhone(phone);
          setDob(dayjs(dob));
          setBio(bio);
          setDp(photoURL);
          setLastActive(timestamp)
          setGender(gender)
          setDoc(docRef, {timestamp: serverTimestamp()}, { merge: true }); 
        } else {

        const { email, displayName, photoURL} = authUser;
        let firstName = "";
        let lastName = "";
        if (displayName) {
          firstName = displayName?.split(" ")[0];
          lastName = displayName?.split(" ")[1];
        }
          setDoc(docRef, { email,firstName,lastName,photoURL,timestamp: serverTimestamp(),uid,bio:"" }, { merge: true });
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setBio, setDob, setDp, setEmail, setFirstName, setLastName, setPhone,setLastActive]);
    
  return (
    <AuthContext.Provider value={{loading,uid }}>
      {children}
    </AuthContext.Provider>
  );
};
