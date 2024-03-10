import { Box, Fab } from '@mui/material'
import React from 'react'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import Peer from "simple-peer";
import { socket } from '../../socket';

type Props = {
    muteMic:boolean,
    setMuteMic:React.Dispatch<React.SetStateAction<boolean>>,
    muteVid:boolean,
    setMuteVid:React.Dispatch<React.SetStateAction<boolean>>,
    myPeer:Peer.Instance | null,
    setMyPeer:React.Dispatch<React.SetStateAction<Peer.Instance | null>>,
    friendId:string,
    setIncomingCall:React.Dispatch<React.SetStateAction<boolean>>,
    recPeer:Peer.Instance | null,
    setRecStream:React.Dispatch<React.SetStateAction<MediaStream | null>>,
    setMyStream:React.Dispatch<React.SetStateAction<MediaStream | null>>,
    setRecPeer:React.Dispatch<React.SetStateAction<Peer.Instance | null>>,
    setCallerSignal:React.Dispatch<React.SetStateAction<any>>,
    myStream:MediaStream | null,
    recStream:MediaStream | null,
    myStreamRef:React.MutableRefObject<HTMLVideoElement|null>,
    recStreamRef:React.MutableRefObject<HTMLVideoElement|null>
    
}
const StreamButtons = ({muteMic,setMuteMic,muteVid,setMuteVid,myPeer,setMyPeer,friendId,setIncomingCall,recPeer,setRecStream,setMyStream,setRecPeer,setCallerSignal,myStream,recStream,myStreamRef,recStreamRef}:Props) => {

  const handleCallEnd = ()=> {
    myStream?.getTracks().forEach(track => {
      track.stop();
  });
  
    recStream?.getTracks().forEach(track => {
      track.stop();
  });
  
    myPeer?.destroy()
    recPeer?.destroy()
    if (recStreamRef.current) {
      recStreamRef.current.srcObject = null;
    }
  if(myStreamRef.current) {
      myStreamRef.current.srcObject = null;
  }
    setMyPeer(null)
    setRecPeer(null)
    setIncomingCall(false)
    setRecStream(null)
    setMyStream(null)
    setCallerSignal(null)
    if(socket.connected) {
      console.log("emitting end call")
      socket.emit("endCall",friendId)
    }
    window.location.href = '/dashboard'
  }
  return (
    <>
    <Box sx={{display:"flex",justifyContent:"space-evenly",maxWidth:"50%",width:"50%"}}>
    <Fab sx={{color:!muteMic?"lightgray":"red"}} aria-label="add" onClick={()=>setMuteMic(!muteMic)}>
        {
            !muteMic?
            <MicIcon sx={{color:"gray"}}/>
            :
            <MicOffIcon sx={{color:"FFFFFF"}}/>
        }
   
    </Fab>
    <Fab sx={{color:!muteVid?"lightgray":"red"}} aria-label="add" onClick={()=>setMuteVid(!muteVid)}>
    {
            !muteVid?
            <VideocamIcon sx={{color:"gray"}}/>
            :
            <VideocamOffIcon sx={{color:"FFFFFF"}}/>
        }
    </Fab>
    <Fab sx={{backgroundColor:"red"}} aria-label="add" onClick={handleCallEnd}>
    <CallEndIcon sx={{color:"white",":hover":{color:"red"}}}/>
    </Fab>
    </Box>
    </>
  )
}

export default StreamButtons