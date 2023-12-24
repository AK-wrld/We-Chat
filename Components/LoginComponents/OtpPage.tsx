"use client";
import {easeInOut, motion, useAnimation} from 'framer-motion'
import {StyleButton, StyledSubTitle, StyledTitle } from '../../StyledComponents/Styled'
import Stack from '@mui/material/Stack';
import {FormControl, Input, InputLabel} from '@mui/material';
import Link from 'next/link';
import React,{useEffect, useState } from 'react';
import { title } from 'process';
const OtpPage = () => {
  const controls = useAnimation();
  const [otp,setOtp] = useState("")
  useEffect(() => {
    const flickerAnimation = async () => {
      await controls.start({
        opacity: 1,
        scale: 1.05,
        transition: { duration: 0.25, ease: easeInOut },
      });

      controls.start({
        y: 0,
        scale: 1, 
        transition: { delay:0.4,duration: 1, ease: easeInOut },
      });
    };

    flickerAnimation();
  }, [controls]);
  const VerifyOTP = async(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
    ev.preventDefault()
    try {
      const confirmationResult = window.confirmationResult
      if (!confirmationResult) {
        throw new Error("Cannot verify OTP");
      }
      
      console.log(confirmationResult)
      const data = await confirmationResult.signInWithCredential(otp)
      console.log(data)
    } catch (error) {
      alert(error)
    }
  }
  return (
    <>
      <Stack style={{height:"100vh","alignItems":"center",justifyContent:"center"}} spacing={5}>
      <StyledTitle as={motion.div} initial={{ opacity: 0, y: "50%" }} animate={controls}>
    We Chat
    </StyledTitle>
    <motion.div style={{display:"flex",alignItems:"center",flexDirection:"column",margin:"0"}}
    initial={{opacity:0}}
    animate={{
        opacity: 1,
      }}
      
      transition={{
        delay:1,
        duration:1
      }}>
    <StyledSubTitle>Verify OTP</StyledSubTitle>

      <Stack spacing={5} style={{height:"40vh"}}>
      <form style={{display:"flex",width:"100%",height:"100%",flexDirection: "column",justifyContent: "space-evenly",alignItems:"center",marginTop:"-50px"}}>
        <FormControl>
        <InputLabel htmlFor="otp" style={{color:title}}>Verify OTP</InputLabel>
    
    <Input  type="string" value={otp} onChange={(ev)=>setOtp(ev.target.value)} id='otp' style={{minWidth:"250px"}} required/>
        </FormControl>
      <StyleButton type="submit" onClick={(ev)=>VerifyOTP(ev)}>Verify OTP</StyleButton>
    <p>Didnt get OTP? <Link href={"#"}>Resend</Link></p>
    </form>
      </Stack>
    </motion.div>
    </Stack>
    </>
  )
}

export default OtpPage
