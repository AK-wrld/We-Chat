"use client";
import { useRouter } from "next/navigation";
import React, {useState } from "react";

const App = () => {
  const router = useRouter()
  const [authToken,isAuth] = useState(false)
 return <>
 {authToken ? router.push("/dashboard") : router.push("/auth/login")}
 </>
};

export default App;


