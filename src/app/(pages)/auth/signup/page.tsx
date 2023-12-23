"use client";
import React from 'react'
import { StyledGrid } from '../../../../../StyledComponents/Styled'
import { Grid } from '@mui/material'
import ImgCarousel from '../../../../../Components/LoginComponents/ImgCarousel'
import SignupPage from '../../../../../Components/LoginComponents/SignupPage';

const Signup = () => {
  return (
    <>
     <Grid container>
  <Grid item xs={6} >
    <SignupPage/>
  </Grid>
  <StyledGrid item xs={6}>
    <ImgCarousel/>
  </StyledGrid>
</Grid>
    </>
  )
}

export default Signup
