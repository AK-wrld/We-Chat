"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth, db } from "../services/firebase.config";
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useProfile } from "./ProfileContext";
import dayjs from 'dayjs';

import { useRouter } from "next/navigation";
import { useChat } from "./ChatContext";
import { getCookie, setCookie } from "cookies-next";
import { signOut } from "firebase/auth";
interface AuthContextProps {
  uid:string;
  loading: boolean;
  fcmToken:string,
  setFcmToken: React.Dispatch<React.SetStateAction<string>>;
  signOutUser: ()=> void
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  uid: "",
  loading: true,
  fcmToken:"",
  setFcmToken:()=>{},
  signOutUser: ()=>{}
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
  const {setBlockedUsers,setIsBlockedBy,setGroups} = useChat()
  const signOutUser = ()=> {
    signOut(auth).then(()=>{
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setBio('')
      setDob(dayjs())
      setDp('')
      setLastActive('')
      setGender('')
      setBlockedUsers([])
      setIsBlockedBy([])
      setGroups([])
      router.push("/auth/login");
    })
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(authUser) => {
      setLoading(true);
      if (authUser) {
        console.log(authUser);
       
        const{uid} = authUser;
        setCookie("uid",uid,{maxAge:60*60*24*7})
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
          const {firstName,lastName,email,phone,dob,bio,photoURL,timestamp,gender,groups} = docSnap.data();
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
          setGroups(groups)
          setDoc(docRef, {timestamp: serverTimestamp()}, { merge: true }); 
          if(window.location.pathname === "/" || window.location.pathname === "/auth/login" || window.location.pathname === "/auth/signup")
          router.push('/dashboard')

        } else {

        const { email, displayName, photoURL,phoneNumber} = authUser;
        console.log(uid)
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
          setDoc(docRef, { email,firstName,lastName,photoURL,timestamp: serverTimestamp(),uid,bio:"",phone:phoneNumber,gender:"M",groups:[] }, { merge: true });
          router.push('/profile')
        }
        setLoading(false);
      } else {
        setLoading(false);
        router.push("/auth/login");
      }
    });
    
    return () => unsubscribe();
  }, [setBio, setDob, setDp, setEmail, setFirstName, setLastName, setPhone, setLastActive, setGender]);
      
  return (
    <AuthContext.Provider value={{loading,uid,fcmToken,setFcmToken,signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
