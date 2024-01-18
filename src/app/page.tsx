"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const App = () => {
  const { user,loading } = useAuth();
  const router = useRouter();

useEffect(() => {
  if(loading===false) {

    if (user === null) {
      console.log("user not logged in");
      router.push("/auth/login");
    } else {
      console.log("user logged in");
      router.push("/profile");
    }
  }
  }, [user, router,loading]);


  return (
    <>
    </>
  );
};

export default App