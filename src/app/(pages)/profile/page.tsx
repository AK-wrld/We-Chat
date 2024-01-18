"use client";
import React, { useEffect, useState } from 'react'
import { StyledGrid, StyledSubTitle } from '../../../../StyledComponents/Styled';
import { Grid } from '@mui/material';
import ProfileStepper from '../../../../Components/ProfileComponents/ProfileStepper';
import { useProfile } from '../../../../context/ProfileContext';
import ProfilePreview from '../../../../Components/ProfileComponents/ProfilePreview';
import ChatScreen from '../../../../Components/ChatComponents/ChatScreen';
const steps = ['Lets sort some basic stuff out first','How about a cool profile pic?' ,'Lets work on your screens'];
const Profile = () => {
    const [activeStep, setActiveStep] = useState(0);
    const {firstName} = useProfile();
    useEffect(() => {
        console.log(firstName)
    }
    ,[firstName])
  return (
    
    <>
    <Grid container>
  <Grid item xs={5} >
    <StyledSubTitle style={{textAlign:'center'}}>Build your profile</StyledSubTitle>
    <ProfileStepper activeStep = {activeStep} setActiveStep = {setActiveStep} steps={steps}/>
    
  </Grid>
  <StyledGrid item xs={7} >
    {activeStep===0 || activeStep===1 ? <ProfilePreview/>:<ChatScreen/>}
  </StyledGrid>
</Grid>
    </>
 )
}

export default Profile