"use client";
import React, { useEffect } from "react";
import {db} from '../../services/firebase.config'
const App = () => {
  useEffect(() => {
    console.log(db)
  }
  , [])
  return <div>Hello world</div>;
};
export default App


