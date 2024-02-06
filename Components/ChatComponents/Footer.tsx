import React, { useEffect, useState } from 'react';
import { primary, text, title } from '../../StyledComponents/Global';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { AppBar, Toolbar, TextField, Box, InputAdornment, IconButton} from '@mui/material';
import { sendMessage, setToast } from '../../Controllers/Controller';
import { TChatType } from '../../Types/user';
import { socket } from '../../socket';
import ControlledOpenSpeedDial from './SpeedDial';

type Props = {
    openEmoji: boolean;
    setOpenEmoji: React.Dispatch<React.SetStateAction<boolean>>;
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    docRef:any|null;
    uid:string;
    messages:TChatType[]|null;
    setMessages:React.Dispatch<React.SetStateAction<TChatType[]|null>>;
    friendId:string;
    type:string;
    setType:React.Dispatch<React.SetStateAction<string>>;
}

const Footer = ({openEmoji,setOpenEmoji,searchValue,setSearchValue,docRef,uid,setMessages,friendId,messages,type,setType}:Props) => {
  const [disabled,setDisabled] = useState(false)
  // eslint-disable-next-line no-unused-vars
  
  useEffect(()=> {
    if(location.pathname === '/profile') {
        setDisabled(true)
    }
    
},[disabled])
const handleSendMsg = async()=> {
  const currDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const send:boolean = await sendMessage(docRef,uid,searchValue,type,currDate)
  if(send) {
    const message = {
      from:uid,
      content:searchValue,
      type,
      timestamp:currDate
    }
    // console.log(send)
    
    setMessages(prevMessages => prevMessages ? [...prevMessages, message] : [message]);
    if(socket.connected) {
      socket.emit("send_message",{uid:friendId,message})
      socket.emit("notTyping",{uid:friendId})
    }
    setSearchValue("")
  }
  else {
    setToast("Something went wrong!","error")
  }
}
const setSearch = (value:string) => {
  setSearchValue(value)
  if(socket.connected) {
    if(value.length!==0) {
    socket.emit("isTyping",{uid:friendId})
    }
    else {
      socket.emit("notTyping",{uid:friendId})
    }
  }
}
  return (
    <AppBar sx={{ top: 'auto', bottom: 0,position:"inherit",backgroundColor:primary}}>
      <Toolbar sx={{paddingLeft:"5px !important"}}>
        {

            openEmoji? <CloseIcon sx={{color:text,padding:"10px",cursor:"pointer"}} onClick={()=>setOpenEmoji(false)}/>:<EmojiEmotionsIcon sx={{color:title,padding:"10px",cursor:"pointer"}} onClick={()=>setOpenEmoji(true)}/>
        }
        <TextField
        disabled={disabled}
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          sx={{ mr: 5 }}
          value={searchValue}
          onChange={(e)=>setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSendMsg} disabled={searchValue.length===0}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ position: 'absolute', bottom: 5, right: 5 }}>
          <ControlledOpenSpeedDial setType={setType}/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
