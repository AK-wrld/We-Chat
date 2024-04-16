"use client";
import React, { createContext, useState, useContext, ReactNode} from 'react';


interface ChatProviderProps {
  children: ReactNode;
}
interface ChatContextType {
    friendsArr: string[];
    setFriends: React.Dispatch<React.SetStateAction<string[]>>;
    friendCount: number;
    setFriendCount: React.Dispatch<React.SetStateAction<number>>;
    blockedUsers: string[];
    setBlockedUsers: React.Dispatch<React.SetStateAction<string[]>>;
    isBlockedByArr: string[];
    setIsBlockedBy: React.Dispatch<React.SetStateAction<string[]>>;
    groups: string[];
    setGroups: React.Dispatch<React.SetStateAction<string[]>>;
    createGroup:boolean;
    setCreateGroup:React.Dispatch<React.SetStateAction<boolean>>;
  }

  const ChatContext = createContext<ChatContextType>({
    friendsArr: [],
    setFriends: () => {},
    friendCount: 0,
    setFriendCount:()=>{},
    blockedUsers:[],
    setBlockedUsers:()=>{},
    isBlockedByArr:[],
    setIsBlockedBy:()=>{},
    groups:[],
    setGroups:()=>{},
    createGroup:false,
    setCreateGroup:()=>{}
  });

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [friendsArr,setFriends] = useState<string[]>([])
  const [groups,setGroups] = useState<string[]>([])
  const [createGroup,setCreateGroup] = useState<boolean>(false)
  const [friendCount,setFriendCount] = useState(0)  
  const [blockedUsers,setBlockedUsers] = useState<string[]>([]) // blocked by me
  const [isBlockedByArr,setIsBlockedBy] = useState<string[]>([])
  return <ChatContext.Provider value={{friendsArr,setFriends,friendCount,setFriendCount,blockedUsers,setBlockedUsers,isBlockedByArr,setIsBlockedBy,groups,setGroups,createGroup,setCreateGroup}}>{children}</ChatContext.Provider>;

};
