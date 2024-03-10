"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect} from 'react';
import { socket } from '../socket';
import { useAuth } from './AuthContext';
import Peer from "simple-peer";


interface CallProviderProps {
  children: ReactNode;
}
interface CallContextType {
    incomingCall: boolean;
    setIncomingCall: React.Dispatch<React.SetStateAction<boolean>>;
    caller:string;
    setCaller:React.Dispatch<React.SetStateAction<string>>;
    callerName:string,
    setCallerName:React.Dispatch<React.SetStateAction<string>>;
    callerDp:string,
    setCallerDp:React.Dispatch<React.SetStateAction<string>>;
    myStream:MediaStream | null;
    setMyStream:React.Dispatch<React.SetStateAction<MediaStream | null>>;
    callAccepted:boolean;
    setCallAccepted:React.Dispatch<React.SetStateAction<boolean>>;
    callerSignal:any;
    setCallerSignal:React.Dispatch<React.SetStateAction<any>>;
    recStream:MediaStream | null;
    setRecStream:React.Dispatch<React.SetStateAction<MediaStream | null>>;
    recPeer:Peer.Instance | null;
    setRecPeer:React.Dispatch<React.SetStateAction<Peer.Instance | null>>;
    myPeer:Peer.Instance | null;
    setMyPeer:React.Dispatch<React.SetStateAction<Peer.Instance | null>>;
}

  const CallContext = createContext<CallContextType>({
    incomingCall: false,
    setIncomingCall: () => {},
    caller:"",
    setCaller:()=>{},
    callerName:"",
    setCallerName:()=>{},
    callerDp:"",
    setCallerDp:()=>{},
    myStream:null,
    setMyStream:()=>{},
    callAccepted:false,
    setCallAccepted:()=>{},
    callerSignal:null,
    setCallerSignal:()=>{},
    recStream:null,
    setRecStream:()=>{},
    recPeer:null,
    setRecPeer:()=>{},
    myPeer:null,
    setMyPeer:()=>{}
  });

export const useCall = () => {
  return useContext(CallContext);
};

export const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
    const [incomingCall,setIncomingCall] = useState(false)
    const [caller,setCaller] = useState<string>("")
    const [callerName,setCallerName] = useState("")
    const [callerDp,setCallerDp] = useState("")
    const [callAccepted,setCallAccepted] = useState(false)
    const [myStream,setMyStream] = useState<MediaStream | null>(null)
    const [callerSignal,setCallerSignal] = useState<any>(null)
    const [recStream,setRecStream] = useState<MediaStream | null>(null)
    const [myPeer,setMyPeer] = useState<Peer.Instance | null>(null)
    const [recPeer,setRecPeer] = useState<Peer.Instance | null>(null)
    const {uid} = useAuth()
    useEffect(()=> {
      console.log("use effect called")
     
      if(socket.connected) {
        socket.on("incoming_call",(data)=> {
          // console.log(data)
          if(!incomingCall) {
            console.log("incoming call")
            setIncomingCall(true)
            setCaller(data.from)
            setCallerName(data.profileData.name)
            setCallerDp(data.profileData.dp)
            setCallerSignal(data.signalData)
          }
          else {
            if(uid) {
              socket.emit("busyCall",{caller:data.from,me:uid})

            }
          }
        })
      }
      else {
        socket.connect()
      }
      return()=> {
        socket.off("incoming_call")
        socket.off("busyCall")
      }
    },[socket,uid])
  return <CallContext.Provider value={{incomingCall,setIncomingCall,caller,setCaller,callerDp,callerName,setCallerDp,setCallerName,myStream,setMyStream,callAccepted,setCallAccepted,callerSignal,setCallerSignal,recStream,setRecStream,recPeer,setRecPeer,myPeer,setMyPeer}}>{children}</CallContext.Provider>;

};
