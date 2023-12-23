import React, { useEffect } from 'react'
import {easeInOut, motion, useAnimation} from 'framer-motion'
import { ErrorSpan, StyleButton, StyledSubTitle, StyledText, StyledTitle } from '../../StyledComponents/Styled'
import Stack from '@mui/material/Stack';
import { useForm, SubmitHandler } from "react-hook-form"
import { Avatar, FormControl, Input, InputLabel } from '@mui/material';
import { text, title } from '../../StyledComponents/Global';
import Link from 'next/link';
import GoogleIcon from '@mui/icons-material/Google';
type Inputs = {
  phoneNumber: string
  password: string

}
const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
      const controls = useAnimation();

      useEffect(() => {
        const flickerAnimation = async () => {
        //   await controls.start({
        //     opacity: 0,
        //     scale: 0.95,
        //     transition: { duration: 0.25, ease: easeInOut },
        //   });
        //   await controls.start({
        //     opacity: 1,
        //     scale: 1.05,
        //     transition: { duration: 0.25, ease: easeInOut },
        //   });
        //   await controls.start({
        //     opacity: 0.2,
        //     scale: 0.95,
        //     transition: { duration: 0.25, ease: easeInOut },
        //   });
        //   await controls.start({
        //     opacity: 1,
        //     scale: 1.05,
        //     transition: { duration: 0.25, ease: easeInOut },
        //   });
        //   await controls.start({
        //     opacity: 0.3,
        //     scale: 0.95,
        //     transition: { duration: 0.25, ease: easeInOut },
        //   });
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
     
  return (
    <Stack style={{height:"100vh","alignItems":"center",justifyContent:"center"}} spacing={5}>
      <StyledTitle as={motion.div} 
      initial={{ opacity: 0, y: "50%" }} animate={controls}>
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
    <StyledSubTitle>Login</StyledSubTitle>
      <StyledText>Login using Google</StyledText>
      <Avatar sx={{ bgcolor: text,cursor:"pointer",marginBottom:"20px" }}><GoogleIcon/></Avatar>
     <p >OR</p>
      <Stack spacing={5} style={{height:"40vh"}}>
      <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex",width:"100%",height:"100%",flexDirection: "column",justifyContent: "space-evenly",alignItems:"center",marginTop:"-50px"}}>
        <FormControl>
      <InputLabel htmlFor="phoneNumber" style={{color:title}}>Phone Number</InputLabel>
      <Input id='phoneNumber' {...register("phoneNumber")} style={{minWidth:"250px"}}/>

        </FormControl>

      {/* include validation with required or other standard HTML validation rules */}
      <FormControl>
      <InputLabel htmlFor="password" style={{color:title}}>Password</InputLabel>
      <Input {...register("password", { required: true })} type="password" style={{minWidth:"250px"}}/>

      </FormControl>
      {/* errors will return when field validation fails  */}
      {errors.password && <ErrorSpan>This field is required</ErrorSpan>}
      

      <StyleButton type="submit">Login</StyleButton>
    <p>Dont have an Account? <Link href={"/auth/signup"}>Register</Link></p>
    </form>
      </Stack>
    </motion.div>
      
    </Stack>
  )
}

export default LoginPage
