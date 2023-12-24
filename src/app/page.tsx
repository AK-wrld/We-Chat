"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { auth } from "../../services/firebase.config";
import { setCookie } from 'cookies-next';

const App = () => {
  const router = useRouter()

  onAuthStateChanged(auth,(user)=> {
    console.log(user)
    if(user===null) {
      console.log("user not logged in")
      router.push("/auth/login")
    }
   else {
    const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
          console.log(user.uid)
          if(user.email) setCookie("email",user.email,{expires:oneWeekFromNow})
          if(user.displayName) setCookie("name",user.displayName,{expires:oneWeekFromNow})
          if(user.photoURL) setCookie("photo",user.photoURL,{expires:oneWeekFromNow})
          if(user.uid) setCookie("uid",user.uid,{expires:oneWeekFromNow})
    router.push("/dashboard")
   }
  })
 return <>
 </>
};

export default App;


