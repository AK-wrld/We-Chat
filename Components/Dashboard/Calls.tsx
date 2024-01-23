import { Avatar, Box } from '@mui/material'
import React from 'react'
import { StyledText } from '../../StyledComponents/Styled'
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { primary } from '../../StyledComponents/Global';
const Calls = () => {
  return (
    <Box sx={{width:"100%",height:"60px",display:"flex",my:1,alignItems:"center",gap:"10px",cursor:"pointer",borderRadius:"10px",'&:hover': { backgroundColor: `${primary}`,transition:"all 0.2s" }}}>
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"15%",height:"100%"}}>

  <Avatar src="/logo.png"/>
    </Box>
  <Box sx={{width:"75%",height:"100%",alignItems:"center",display:"flex",cursor:"pointer"}}>
    <StyledText style={{fontSize:"14px",margin:"0px"}}>Test User</StyledText>
  </Box>
  <Box sx={{width:"10px",height:"100%",display:"flex",alignItems:"center",cursor:"pointer"}}>
    <AddIcCallIcon/>
  </Box>
</Box>
  )
}

export default Calls