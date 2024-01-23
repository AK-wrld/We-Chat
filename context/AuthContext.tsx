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
  const {setFirstName,setLastName,setEmail,setPhone,setDob,setBio,setDp,setLastActive,setGender,setSenderColor,setRecieverColor,setBgType,setBgImage,setBgColor} = useProfile();
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
          const bgRef = doc(db,"backgrounds",uid)
          const bgSnap = await getDoc(bgRef);
          if(bgSnap.exists()){
            const {sendercolor,recieverColor,bgType,bgColor,bgImage} = bgSnap.data();
            console.log({sendercolor,recieverColor,bgType,bgColor,bgImage})
            setSenderColor(sendercolor)
            setRecieverColor(recieverColor)
            setBgType(bgType)
            if(bgType==='Aesthetic'){
              setBgImage(bgImage)
            }
            else {
              setBgColor(bgColor)
            }
          }

        } else {

        const { email, displayName, photoURL,phoneNumber} = authUser;
        let firstName = "";
        let lastName = "";
        if (displayName) {
          firstName = displayName?.split(" ")[0];
          lastName = displayName?.split(" ")[1];
        }
          setDoc(docRef, { email,firstName,lastName,photoURL,timestamp: serverTimestamp(),uid,bio:"",phone:phoneNumber,gender:"M" }, { merge: true });
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setBio, setDob, setDp, setEmail, setFirstName, setLastName, setPhone, setLastActive, setGender]);
    
  return (
    <AuthContext.Provider value={{loading,uid }}>
      {children}
    </AuthContext.Provider>
  );
};
