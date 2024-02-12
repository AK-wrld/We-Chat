import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { Box, Typography } from "@mui/material";
import Footer from "./Footer";
import EmojiPicker from "emoji-picker-react";
import { useProfile } from "../../context/ProfileContext";
import { db } from "../../services/firebase.config";
import { Timestamp, collection, doc, getDoc, getDocs,limit,orderBy,query,setDoc} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { TChatType } from "../../Types/user";
import { socket } from "../../socket";
import MediaUpload from "./MediaUpload";
import CameraUpload from "./CameraUpload";
import Linkify from "linkify-react";
import CustomImage from "./CustomImage";
import ContactsSearch from "./ContactsSearch";
import ContactBox from "./ContactBox";
import AudioShare from "./AudioShare";
import AudioBox from "./AudioBox";
import { v4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreChats } from "../../Controllers/Controller";

type Props = {
    friendId:string
}
const ChatScreen = ({friendId}:Props) => {
    const {uid} = useAuth()
    const [hasMore,setHasMore] = useState(true)
    const [lastFetchedChat,setLastFetchedChat] = useState<TChatType|null>(null)
    const {bgColor,bgImage,bgType,sendercolor,recieverColor} = useProfile();
    const [messages, setMessages] = useState<TChatType[]|null>([])
    const [docRef,setDocRef] = useState<null|any>(null)
    const [openEmoji, setOpenEmoji] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [type,setType] = useState("text")
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const fetchConversations = async () => {
        console.log("Ran for the first time")
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
const orderedMessagesRef = query(messagesRef, orderBy("timestamp", "desc"),limit(12));
const messageDocs = await getDocs(orderedMessagesRef);
      const messages = messageDocs.docs.map(doc => doc.data() as TChatType);
      console.log(messages)
      setMessages(messages);
      setLastFetchedChat(messages[messages.length-1])
        }
      };
      if(friendId && uid) fetchConversations();
      
    }, [friendId, uid]);

    const fetchNext = async()=> {
      const data = await fetchMoreChats(docRef,lastFetchedChat,4).then((data)=> {
        setMessages(prevMessages => prevMessages && data? [...prevMessages, ...data] : [...data]);
        if(data.length<4) {
          setHasMore(false)
        }
        else {
          setLastFetchedChat(data[data.length-1])
        }
      })
    }
  const handleEmoji = (emoji: any) => {
    console.log(emoji.emoji);
    setSearchValue((searchValue) => searchValue.concat(emoji.emoji));
  };
  // eslint-disable-next-line no-unused-vars


  // useEffect(()=> {
  //   console.log(ref.current?.scrollHeight)
  //   ref.current?.scrollTo(0,ref.current?.scrollHeight)
  // },[messages])

  // useEffect(()=> {
  //   console.log(messages)
  // },[messages])

  useEffect(()=>{
    socket.on("add_message",(data)=> {
      console.log(data)
      if (!(data.timestamp instanceof Timestamp)) {
        console.log("not instance of timestamp")
        data.timestamp = Timestamp.fromDate(new Date())
      }
      console.log(data)
      setMessages(prevMessages => prevMessages ? [data,...prevMessages] : [data]);
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
        {type==='text'?
        <Box ref={ref} id={'scrollableDiv'} sx={{ height: "750px", overflowY: "scroll",overflowX:"hidden",display:"flex",flexDirection: 'column-reverse' }}>
          <InfiniteScroll
    dataLength={messages?.length || 0}
    next={()=>fetchNext()}
    style={{ display: 'flex', flexDirection: 'column-reverse' ,overflowY:"auto",overflowX:"hidden"}} 
    inverse={true} 
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    scrollableTarget="scrollableDiv"
  >
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
                    <Linkify color="black" as="span" size={14} style={{ fontSize: "14px", color: "black" }}>
                      {message.content}
                    </Linkify>:
                    message.type==="media" || message.type==="camera"?<CustomImage src={message.content}/>:
                    message.type==="contact"? <ContactBox contact={message.contact} from={"sender"}/>:
                    message.type==="audio"? <AudioBox audioUrl={message.content} id={`id${v4()}`}/>:null
                    }
                    <Typography
                      style={{
                        fontSize: "10px",
                        color: "black",
                        textAlign: "right",
                      }}
                    >
                      {message.timestamp.toDate().getHours()}:{message.timestamp.toDate().getMinutes()}
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
                    <Linkify color="black" as={"span"} size={14} style={{ fontSize: "14px", color: "white" }}>
                      {message.content}
                    </Linkify>:
                    message.type==="media" || message.type==="camera"?<CustomImage src={message.content}/>:
                    message.type==="contact"? <ContactBox contact={message.contact} from={"reciever"}/>:
                    message.type==="audio"? <AudioBox audioUrl={message.content} id={`id${v4()}`}/>:null
                    }
                    <Typography
                      style={{
                        fontSize: "10px",
                        color: "white",
                        textAlign: "right",
                      }}
                    >
                      {message.timestamp.toDate().getHours()}:{message.timestamp.toDate().getMinutes()}
                    </Typography>
                  </Box>
                </Box>
              )
            )
          ) 
          : (
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
          </InfiniteScroll>
        </Box>:
        type==='media'?<MediaUpload setType={setType} docRef={docRef} uid={uid} setMessages={setMessages} setDocRef={setDocRef} friendId={friendId} refer={ref}/>
        :
        type==='camera'?<CameraUpload setType={setType} docRef={docRef} uid={uid} setMessages={setMessages} setDocRef={setDocRef} friendId={friendId} refer={ref}/>:
        type==='contacts'?<ContactsSearch setMessages={setMessages} setDocRef={setDocRef} setType={setType} docRef={docRef} uid={uid} friendId={friendId} refer={ref}/>
        :type==='audio'?<AudioShare setType={setType} docRef={docRef} uid={uid} setMessages={setMessages} setDocRef={setDocRef} friendId={friendId} refer={ref}/>:null}
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
            setDocRef={setDocRef}
            refer={ref}
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
