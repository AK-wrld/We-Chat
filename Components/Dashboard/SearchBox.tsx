import React from "react";
import {motion} from 'framer-motion'
import SearchContact from "./SearchContact";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";
type Props = {
  open: boolean;
  value: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchBox = ({ open,value,setOpen }: Props) => {
    const variants = {
        open: { opacity: 1, height: "70vh" },
        closed: { opacity: 0, height: "0vh" }
      };
      
  return (
    <>
      <motion.div
        style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            position:"relative"
          }}
          variants={variants}
          initial="closed"
          animate={open ? "open" : "closed"}
          transition={{ 
            opacity: { delay: open ? 0 : 0.3 },
            height: { duration: 0.3 }
          }}
      >
        <CloseIcon sx={{position:"absolute",right:0,cursor:"pointer"}} onClick={()=>setOpen(false)}/>
        <Box sx={{mt:3,height:"100%"}}>

        {open && <SearchContact value={value}/>}
        </Box>
        
      </motion.div>
    </>
  );
};

export default SearchBox;