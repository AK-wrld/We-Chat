import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Box, Typography } from "@mui/material";
import Footer from "./Footer";
import EmojiPicker from "emoji-picker-react";
import { useProfile } from "../../context/ProfileContext";
import { db } from "../../services/firebase.config";
import { collection, doc, getDoc, getDocs,orderBy,query,setDoc} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { TChatType } from "../../Types/user";
import { socket } from "../../socket";
import MediaUpload from "./MediaUpload";
import Image from "next/image";

type Props = {
    friendId:string
}
const ChatScreen = ({friendId}:Props) => {
    const {uid} = useAuth()
    const {bgColor,bgImage,bgType,sendercolor,recieverColor} = useProfile();
    const [messages, setMessages] = useState<TChatType[]|null>([])
    const [docRef,setDocRef] = useState<null|any>(null)
    const [openEmoji, setOpenEmoji] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [type,setType] = useState("text")
    useEffect(() => {
      const fetchConversations = async () => {
        console.log("running")
        const docRef1 = doc(db, "conversations", `${uid}_${friendId}`);
        const docRef2 = doc(db, "conversations", `${friendId}_${uid}`);
        const [docs1, docs2] = await Promise.all([getDoc(docRef1), getDoc(docRef2)]);
        if(!docs1.exists() && !docs2.exists()) {
          await setDoc(docRef1,{user1:uid,user2:friendId})
        }
        else {
      const existingDocRef = docs1.exists() ? docRef1 : docRef2;
      setDocRef(existingDocRef);
      const messagesRef = collection(existingDocRef, 'messages');
const orderedMessagesRef = query(messagesRef, orderBy("timestamp", "asc"));
const messageDocs = await getDocs(orderedMessagesRef);
      const messages = messageDocs.docs.map(doc => doc.data() as TChatType);
      console.log(messages)
      setMessages(messages);
          
        }
      };
      if(friendId && uid) fetchConversations();
      
    }, [friendId, uid]);

  const handleEmoji = (emoji: any) => {
    console.log(emoji.emoji);
    setSearchValue((searchValue) => searchValue.concat(emoji.emoji));
  };
  // eslint-disable-next-line no-unused-vars

  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=> {
    console.log(ref.current?.scrollHeight)
    ref.current?.scrollTo(0,ref.current?.scrollHeight)
  },[messages])
  useEffect(()=> {
    console.log(messages)
  },[messages])
  useEffect(()=>{
    socket.on("add_message",(data)=> {
      console.log(data)
      setMessages(prevMessages => prevMessages ? [...prevMessages, data] : [data]);
    })
    return ()=> {
      socket.off("add_message")
    }
  },[])
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
        background:bgType==='Solid'?bgColor:`url(/${bgImage})`,
          backgroundSize: "cover",
            backgroundRepeat: "no-repeat",

        }}
      >
        <Box sx={{ width: "100%", position: "relative" }}>
          <Navbar />
        </Box>
        {type==='text'?<Box ref={ref} sx={{ height: "85vh", overflowY: "scroll",overflowX:"hidden",overflowAnchor:"none" }}>
          {messages && messages.length>0 ? (
            messages.map((message, index) =>
            
              message.from === uid ? (
                
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: "10px",
                    overflowAnchor:"auto"
                  }}
                >
                  <Box
                    sx={{
                      width: "fit-content",
                      padding: "10px",
                      backgroundColor: `${sendercolor}`,
                      borderRadius: "10px",
                      marginRight: "20px",
                      minWidth:"60px"
                    }}
                  >
                    {
                    message.type==="text"?
                    <Typography style={{ fontSize: "14px", color: "black" }}>
                      {message.content}
                    </Typography>:
                    message.type==="media"?<Image src={message.content} alt="media" width={100} height={100}/>:null
                    }
                    <Typography
                      style={{
                        fontSize: "10px",
                        color: "black",
                        textAlign: "right",
                      }}
                    >
                  {message.timestamp.split(" ")[1].split(":")[0]}:{message.timestamp.split(" ")[1].split(":")[1]}
                      {/* {message.timestamp.toDate().toDateString()} */}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Box
                    sx={{
                      width: "fit-content",
                      padding: "10px",
                      backgroundColor: `${recieverColor}`,
                      borderRadius: "10px",
                      minWidth:"60px"
                    }}
                  >
                    {
                    message.type==="text"?
                    <Typography style={{ fontSize: "14px", color: "black" }}>
                      {message.content}
                    </Typography>:
                    message.type==="media"?<Image src={message.content} alt="media" width={100} height={100}/>:null
                    }
                    <Typography
                      style={{
                        fontSize: "10px",
                        color: "white",
                        textAlign: "right",
                      }}
                    >
                      {message.timestamp.split(" ")[1].split(":")[0]}:{message.timestamp.split(" ")[1].split(":")[1]}
                        {/* {message.timestamp.split(" ")[4].split(":")[0]+":"+message.timestamp.split(" ")[4].split(":")[1]} */}
                    </Typography>
                  </Box>
                </Box>
              )
            )
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "10vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography style={{ fontSize: "1.5rem", color: "white" }}>
                Start a conversation
              </Typography>
            </Box>
          )}
          <div style={{height:"1px"}}></div>
        </Box>:<MediaUpload setType={setType} docRef={docRef} uid={uid} setMessages={setMessages} friendId={friendId}/>}
        <Box sx={{ width: "100%", height: "7vh" }}>
          {openEmoji ? (
            <Box style={{ width: "100%", position: "fixed", bottom: "7vh" }}>
              <EmojiPicker onEmojiClick={(emoji) => handleEmoji(emoji)} />
            </Box>
          ) : null}

          <Footer
            openEmoji={openEmoji}
            setOpenEmoji={setOpenEmoji}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            docRef={docRef}
            uid={uid}
            messages={messages}
            friendId={friendId}
            setMessages={setMessages}
            type={type}
            setType={setType}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
