import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Box, Typography } from "@mui/material";
import Footer from "./Footer";
import EmojiPicker from "emoji-picker-react";
import { useProfile } from "../../context/ProfileContext";
const ChatScreen = () => {
    const {bgColor,bgImage,bgType,sendercolor,recieverColor} = useProfile();
    useEffect(()=> {
      console.log({bgColor,bgImage,bgType,sendercolor,recieverColor})
    },[bgColor,bgImage,bgType,sendercolor,recieverColor])
  const [openEmoji, setOpenEmoji] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleEmoji = (emoji: any) => {
    console.log(emoji.emoji);
    setSearchValue((searchValue) => searchValue.concat(emoji.emoji));
  };
  const messages = [
    {
      sender: "me",
      message: "Hello",
      timestamp: "Jan 18, 2024 at 6:56:05pm UTC+05:30",
    },
    {
      sender: "other",
      message: "Hi",
      timestamp: "Jan 18, 2024 at 6:56:35pm UTC+05:30",
    },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
        //   add backgroundColor if bgType is solid else add background with url as bgImage
        background:bgType==='Solid'?bgColor:`url(/${bgImage})`,
          backgroundSize: "cover",
            backgroundRepeat: "no-repeat",

        }}
      >
        <Box sx={{ width: "100%", position: "relative" }}>
          <Navbar />
        </Box>
        <Box sx={{ height: "85vh", overflowY: "scroll",overflowX:"hidden" }}>
          {messages ? (
            messages.map((message, index) =>
              message.sender === "me" ? (
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: "10px",
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
                    <Typography style={{ fontSize: "14px", color: "black" }}>
                      {message.message}
                    </Typography>
                    {/* add timestamp value at the bottom right  */}
                    <Typography
                      style={{
                        fontSize: "10px",
                        color: "black",
                        textAlign: "right",
                      }}
                    >
                        {message.timestamp.split(" ")[4].split(":")[0]+":"+message.timestamp.split(" ")[4].split(":")[1]}
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
                    <Typography style={{ fontSize: "14px", color: "white" }}>
                      {message.message}
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "10px",
                        color: "white",
                        textAlign: "right",
                      }}
                    >
                        {message.timestamp.split(" ")[4].split(":")[0]+":"+message.timestamp.split(" ")[4].split(":")[1]}
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
              <Typography style={{ fontSize: "1.5rem", color: "gray" }}>
                Start a conversation
              </Typography>
            </Box>
          )}
        </Box>
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
          />
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
