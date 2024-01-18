import { Avatar, Box, Grid } from '@mui/material'
import React from 'react'
import { useProfile } from '../../context/ProfileContext'
import { StyledLabel,StyledText } from '../../StyledComponents/Styled';
import dayjs from 'dayjs';
import { primary } from '../../StyledComponents/Global';
import InfoIcon from '@mui/icons-material/Info';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import Image from 'next/image';
const ProfilePreview = () => {
    const {dp,firstName,lastName,bio,dob,phone,email,gender} = useProfile();
    
  return (
    <>
    <Box sx={{width:'50%',height:'70%',backgroundColor:'white',margin:"auto auto",borderRadius: "39px 39px 5px 5px",position:"relative"}}>
        <Box sx={{clipPath: "polygon(0% 63%, 33% 88%, 100% 51%, 100% 0, 0 0);",width:"100%",backgroundColor: "rgb(63,150,234)",background: "linear-gradient(90deg, rgba(63,150,234,1) 0%, rgba(44,189,229,1) 44%, rgba(19,220,223,1) 100%)",height:"200px",borderRadius:"39px",border:"5px inset #00ffd4",position:"relative"}}>

        <Grid item sx={{width:"100%",padding:"20px",mt:1}}>
                <StyledLabel style={{textAlign:'center',fontSize:"20px",fontWeight:"bolder",width:'fit-content',color:primary}}>{firstName} {lastName}</StyledLabel>
                <StyledLabel style={{textAlign:'center',fontSize:"16px",width:'fit-content',color:primary}}>{email}</StyledLabel>
            </Grid>
        </Box>
        <Avatar src={dp} sx={{position:'absolute',transform: "translate(-50%, -50%)",left: '65%',top: "25%",width:120,height:120,borderRadius: '50%', border: "4px solid #FFFFFF",boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",backdropFilter: "blur( 6px )"}}/>
        <Grid container spacing={2} sx={{mt:"20px", padding:"20px",pt:0}}>
            
            <Grid item xs={12} sx={{display:'flex',gap:2}}>
                <Avatar><InfoIcon sx={{width:'fit-content'}}/></Avatar>
                <Box>

                <StyledLabel sx={{fontSize:"14px !important"}}>About me</StyledLabel>
                <StyledText style={{fontSize:"16px",margin:0}}>{bio}</StyledText>
                </Box>
            </Grid>
            <Grid container item xs={12}>
                <Grid item xs={6} sx={{display:'flex',gap:2}}>
                <Avatar><CakeIcon sx={{width:'fit-content'}}/></Avatar>
                <Box>

                <StyledLabel sx={{fontSize:"14px !important"}}>Wish me on</StyledLabel>
                <StyledText style={{fontSize:"16px",margin:0}}>{dayjs(dob).format('DD MMMM')}</StyledText>
                </Box>
                </Grid>
                <Grid item xs={6} sx={{display:'flex',gap:2}}>
                <Avatar><PhoneIcon sx={{width:'fit-content'}}/></Avatar>
                <Box>

                <StyledLabel sx={{fontSize:"14px !important"}}>Phone</StyledLabel>
                <StyledText style={{fontSize:"16px",margin:0}}>{phone}</StyledText>
                </Box>
                </Grid>
            </Grid>
           {
            gender && <Grid item xs={12} sx={{display:"flex",alignItems:"center",mt:2}}>
            <StyledLabel sx={{fontSize:"14px !important"}}>Gender</StyledLabel>
                <Image src={`/${gender}.png`} width={150} height={150} alt='gender'/>
            </Grid>
           } 
        </Grid>
    </Box>
    </>
  )
}

export default ProfilePreview