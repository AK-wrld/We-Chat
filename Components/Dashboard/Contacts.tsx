"use client";
import {Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useChat } from '../../context/ChatContext';
import Contact from './Contact';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config';
import { StyledText } from '../../StyledComponents/Styled';

const Contacts = () => {
  const {friendsArr,setFriendCount,setFriends} = useChat()
  const {uid} = useAuth()

  useEffect(() => {
    const fetchData = async () => {
        if(uid) {
         console.log("test")

       const friendRef = doc(db, "friends", uid);
       console.log(friendRef)
       const friendSnap = await getDoc(friendRef);
       if(friendSnap.exists()) {
         const {friendsArr, count} = friendSnap.data();
         console.log(friendsArr);
         setFriends(friendsArr);
         setFriendCount(count);
     }
        }
        // else {
        //     return <p>Loading....</p>
        // }
      }
 
  
    fetchData();
  }, [setFriendCount, setFriends, uid]);
  // useEffect(()=> {
  //   console.log(uid)
  
  // },[uid])

  return (
    <>
   
    {friendsArr.length!==0?
      <Box sx={{width:"100%",height:"max-content",display:"flex",my:1,alignItems:"center",flexDirection:"column",gap:"10px",}}>
      {friendsArr && friendsArr.map((friend:string,index:number)=>
      
      <Contact key={friend} friendId={friend}/>
      )}
      
     
  </Box>
 :
  <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",maxHeight:"70vh",height:"65vh"}}>
     <StyledText style={{textAlign:"center",color:"gray"}}>Your friend list seems a bit lonely. Time to search for new connections! 🌟</StyledText>
   </Box> }
 
    </>
  )
}

export default Contacts