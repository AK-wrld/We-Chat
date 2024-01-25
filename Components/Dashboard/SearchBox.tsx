import React from "react";
import {motion} from 'framer-motion'
import SearchContact from "./SearchContact";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";
import { TAuthUser } from "../../Types/user";
type Props = {
  open: boolean;
  value: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchContactArr: TAuthUser[]
};
const SearchBox = ({ open,value,setOpen,searchContactArr }: Props) => {
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

        {open && searchContactArr.length!==0?
        searchContactArr.map((contact,index)=> {
          return <SearchContact key={contact.uid} contact={contact} value={value}/>
        }):null}
        </Box>
        
      </motion.div>
    </>
  );
};

export default SearchBox;