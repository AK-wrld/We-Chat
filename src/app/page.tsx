"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

const App = () => {
  const router = useRouter();

// useEffect(() => {
//   if (!getCookie("uid")) {
//     console.log("user not logged in");
//     router.push("/auth/login");
//   }
//   }, [router]);


  return (
    <>
    </>
  );
};

export default App