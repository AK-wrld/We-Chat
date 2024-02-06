"use client";
import React from 'react'
import ChatScreen from '../../../../../Components/ChatComponents/ChatScreen';
type ContactPageProps = {
  params: {
    recId: string; // or number, or whatever type recId should be
  };
};
const ContactPage = ({params}:ContactPageProps) => {
  const {recId} = params

  return (
    <>
    <ChatScreen friendId={recId}/>


    </>
  )
}

export default ContactPage