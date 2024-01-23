import React, { useState } from 'react';
import { Avatar, Box } from "@mui/material";
import { StyledText } from "../../StyledComponents/Styled";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { motion, useAnimation } from 'framer-motion';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
type Props = {
    value: number;
}
const SearchContact = ({value}:Props) => {
  const [add, setAdd] = useState(false);
  const controlsPersonAdd = useAnimation();
  const controlsMarkEmailRead = useAnimation();

  const handleClick = async () => {
    if (add) {
      await controlsMarkEmailRead.start({ scale: 0, transition: { duration: 0.2 }, transitionEnd: { display: 'none' } });
      await controlsPersonAdd.start({ scale: 1, transition: { duration: 0.2, }, transitionEnd: { display: 'block' } });
    } else {
      await controlsPersonAdd.start({ scale: 0, transition: { duration: 0.2 }, transitionEnd: { display: 'none' } });
      await controlsMarkEmailRead.start({ scale: 1, transition: { duration: 0.2 }, transitionEnd: { display: 'block' } });
    }
    setAdd(!add);
  };

  return (
    <Box sx={{width:"100%",height:"10%",display:"flex",my:1,alignItems:"center",gap:"10px",padding:"14px"}}>
      <Avatar src="/logo.png"/>
      <Box sx={{width:"78%",height:"100%",alignItems:"center",display:"flex"}}>
        <StyledText style={{fontSize:"14px",margin:"0px"}}>Test User</StyledText>
      </Box>
      <motion.div animate={controlsPersonAdd} initial={{ scale: 1, display: 'block' }}>
       { value===0? <PersonAddIcon sx={{pr:"10px",cursor:"pointer"}} onClick={handleClick}/>:
       value===1? <GroupAddIcon sx={{pr:"10px",cursor:"pointer"}} onClick={handleClick}/>:
         <AddIcCallIcon sx={{pr:"10px",cursor:"pointer"}} onClick={handleClick}/>}
      </motion.div>
      <motion.div animate={controlsMarkEmailRead} initial={{ scale: 0, display: 'none' }}>
        <MarkEmailReadIcon sx={{pr:"10px",cursor:"pointer"}} onClick={handleClick}/>
      </motion.div>
    </Box>
  )
}

export default SearchContact;