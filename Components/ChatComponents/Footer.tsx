import React from 'react';
import { primary, text, title } from '../../StyledComponents/Global';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { AppBar, Toolbar, TextField, Box, InputAdornment, IconButton, SpeedDialIcon, SpeedDial } from '@mui/material';

type Props = {
    openEmoji: boolean;
    setOpenEmoji: React.Dispatch<React.SetStateAction<boolean>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const Footer = ({openEmoji,setOpenEmoji,searchValue,setSearchValue}:Props) => {
  return (
    <AppBar sx={{ top: 'auto', bottom: 0,position:"inherit",backgroundColor:primary}}>
      <Toolbar sx={{paddingLeft:"5px !important"}}>
        {
            openEmoji? <CloseIcon sx={{color:text,padding:"10px",cursor:"pointer"}} onClick={()=>setOpenEmoji(false)}/>:<EmojiEmotionsIcon sx={{color:title,padding:"10px",cursor:"pointer"}} onClick={()=>setOpenEmoji(true)}/>
        }
        <TextField
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          sx={{ mr: 5 }}
          value={searchValue}
          onChange={(e)=>setSearchValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => console.log(searchValue)}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 5, right: 5 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon />}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;