"use client";
import React from 'react'
import {motion} from 'framer-motion'
import { useProfile } from '../../../../context/ProfileContext';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import ProfilePreview from '../../../../Components/ProfileComponents/ProfilePreview';
import IncomingCall from '../../../../Components/CallComponents/IncomingCall';
import { useCall } from '../../../../context/CallContext';

const Dashboard = () => {
  const {openProfile,setOpenProfile} = useProfile()
  const {incomingCall} = useCall()
const variants = {
  open: {opacity:1,width:"100%"},
  closed: {opacity:0,width:"0%"}
}
  return (
    <>
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
    {incomingCall && <IncomingCall/>}
    </>
  )
}

export default Dashboard
