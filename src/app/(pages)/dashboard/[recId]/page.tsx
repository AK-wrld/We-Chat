"use client";
import React, { useEffect } from 'react'
import ChatScreen from '../../../../../Components/ChatComponents/ChatScreen';
import { useProfile } from '../../../../../context/ProfileContext';

import {motion} from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import ProfilePreview from '../../../../../Components/ProfileComponents/ProfilePreview';
type ContactPageProps = {
  params: {
    recId: string; // or number, or whatever type recId should be
  };
};
const ContactPage = ({params}:ContactPageProps) => {
  const {recId} = params
  const {openProfile,setOpenProfile} = useProfile()
  const variants = {
    open: {opacity:1,width:"100%"},
    closed: {opacity:0,width:"0%"}
  }
  useEffect(()=> {
    setOpenProfile(false)
  
  },[recId, setOpenProfile])
  return (
    <>
   {
    !openProfile && <ChatScreen friendId={recId}/>
   } 
    
    <motion.div style={{height:"100%",display:"flex",flexDirection:"column"}}
    initial="closed"
    animate={openProfile?"open":"closed"}
    variants={variants}
    transition={{
      opacity:{delay:openProfile?0:0.3},
      width:{duration:0.3}
    }}>
      <Box sx={{padding:"24px",height:"100%",display:openProfile?"flex":"none"}}>

      <CloseIcon sx={{cursor:"pointer"}} onClick={()=>setOpenProfile(false)}></CloseIcon>
      <ProfilePreview/>
      </Box>
    </motion.div>
    

    </>
  )
}

export default ContactPage