import { Avatar, Box } from '@mui/material'
import React from 'react'
import { StyledText } from '../../StyledComponents/Styled'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { label, primary } from '../../StyledComponents/Global';
import Link from 'next/link';
const Groups = () => {
  return (
    <Box sx={{width:"100%",height:"max-content",display:"flex",my:1,alignItems:"center",flexDirection:"column",gap:"10px",}}>
      <Box component={Link} href={`/dashboard/${910}`} passHref sx={{color:`${label}`,textDecoration:"none",width:"100%",display:"flex",alignItems:"center",height:"8vh",cursor:"pointer",borderRadius:"10px",'&:hover': { backgroundColor: `${primary}`,transition:"all 0.2s" }}}>

      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"15%",height:"100%"}}>

    <Avatar src="/logo.png"/>
      </Box>
    <Box sx={{width:"75%",height:"100%",alignItems:"center",display:"flex",cursor:"pointer"}}>
      <StyledText style={{fontSize:"14px",margin:"0px"}}>Test User</StyledText>
    </Box>
    <Box sx={{width:"10px",height:"100%",display:"flex",alignItems:"center",cursor:"pointer"}}>
      <KeyboardDoubleArrowRightIcon/>
    </Box>
      </Box>
      <Box component={Link} href={`/dashboard/${578}`} passHref sx={{color:`${label}`,textDecoration:"none",width:"100%",display:"flex",alignItems:"center",height:"8vh",cursor:"pointer",borderRadius:"10px",'&:hover': { backgroundColor: `${primary}`,transition:"all 0.2s" }}}>

      <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"15%",height:"100%"}}>

    <Avatar src="/logo.png"/>
      </Box>
    <Box sx={{width:"75%",height:"100%",alignItems:"center",display:"flex",cursor:"pointer"}}>
      <StyledText style={{fontSize:"14px",margin:"0px"}}>Test User</StyledText>
    </Box>
    <Box sx={{width:"10px",height:"100%",display:"flex",alignItems:"center",cursor:"pointer"}}>
      <KeyboardDoubleArrowRightIcon/>
    </Box>
      </Box>
     
  </Box>
  )
}

export default Groups