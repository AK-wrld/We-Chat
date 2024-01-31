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

import { useRouter } from "next/navigation";
import { useChat } from "./ChatContext";
interface AuthContextProps {
  uid:string;
  loading: boolean;
  fcmToken:string,
  setFcmToken: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  uid: "",
  loading: true,
  fcmToken:"",
  setFcmToken:()=>{}
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router=useRouter()
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState("");
  const [fcmToken, setFcmToken] = useState('');
  const {setFirstName,setLastName,setEmail,setPhone,setDob,setBio,setDp,setLastActive,setGender} = useProfile();
  const {setBlockedUsers,setIsBlockedBy} = useChat()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(authUser) => {
      setLoading(true);
      if (authUser) {
        console.log(authUser);

        const{uid} = authUser;
        setUid(uid);
        const blockedRef = doc(db,"blockedUsers",uid)
        const blockedSnap = await getDoc(blockedRef)
        if(blockedSnap.exists()) {
          const {ids,isBlockedBy} = blockedSnap.data()
          setBlockedUsers(ids)
          setIsBlockedBy(isBlockedBy)
        }
        else {
          setDoc(blockedRef,{ids:[],isBlockedBy:[],user:uid},{merge:true})
        }
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

        const { email, displayName, photoURL,phoneNumber} = authUser;
        let firstName = "";
        let lastName = "";
        if (displayName) {
          firstName = displayName?.split(" ")[0];
          lastName = displayName?.split(" ")[1];
        }
        setFirstName(firstName);
          setLastName(lastName);
          if(email) setEmail(email);
          if(photoURL) setDp(photoURL)
          if(phoneNumber) setPhone(phoneNumber)
          setDoc(docRef, { email,firstName,lastName,photoURL,timestamp: serverTimestamp(),uid,bio:"",phone:phoneNumber,gender:"M" }, { merge: true });
          router.push('/profile')
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setBio, setDob, setDp, setEmail, setFirstName, setLastName, setPhone, setLastActive, setGender]);
      useEffect(()=> {
    console.log(uid)
  },[uid])
  return (
    <AuthContext.Provider value={{loading,uid,fcmToken,setFcmToken }}>
      {children}
    </AuthContext.Provider>
  );
};
