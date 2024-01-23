"use client";
import React, { useEffect } from 'react'

import ChatScreen from '../../../../../Components/ChatComponents/ChatScreen';
type ContactPageProps = {
  params: {
    recId: string; // or number, or whatever type recId should be
  };
};
const ContactPage = ({params}:ContactPageProps) => {
useEffect(()=> {
  console.log(params.recId)
},[params.recId])
  return (
    <>
    <ChatScreen/>


    </>
  )
}

export default ContactPage