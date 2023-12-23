"use client";
import React from 'react'
import { StyledGrid } from '../../../../../StyledComponents/Styled'
import { Grid } from '@mui/material'
import ImgCarousel from '../../../../../Components/LoginComponents/ImgCarousel'
import LoginPage from '../../../../../Components/LoginComponents/LoginPage';

const Login = () => {
  return (
    <>
     <Grid container>
  <Grid item xs={6} >
    <LoginPage/>
  </Grid>
  <StyledGrid item xs={6}>
    <ImgCarousel/>
  </StyledGrid>
</Grid>
    </>
  )
}

export default Login
