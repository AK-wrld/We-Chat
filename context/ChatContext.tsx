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
  }

  const ChatContext = createContext<ChatContextType>({
    friendsArr: [],
    setFriends: () => {},
    friendCount: 0,
    setFriendCount:()=>{}
  });

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [friendsArr,setFriends] = useState<string[]>([])
  const [friendCount,setFriendCount] = useState(0)  

  return <ChatContext.Provider value={{friendsArr,setFriends,friendCount,setFriendCount}}>{children}</ChatContext.Provider>;

};
