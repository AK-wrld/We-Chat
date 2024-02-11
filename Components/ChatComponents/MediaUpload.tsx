import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { primary, title } from '../../StyledComponents/Global'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FileUploader } from 'react-drag-drop-files';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { bucket, db } from '../../services/firebase.config';
import { v4 } from 'uuid';
import Image from 'next/image';
import { StyleButton } from '../../StyledComponents/Styled';
import { sendMessage, setToast } from '../../Controllers/Controller';
import { TChatType } from '../../Types/user';
import { socket } from '../../socket';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
type Props = {
    setType:React.Dispatch<React.SetStateAction<string>>;
    docRef:any|null;
    uid:string;
    setMessages:React.Dispatch<React.SetStateAction<TChatType[]|null>>;
    friendId:string;
    setDocRef:React.Dispatch<React.SetStateAction<any|null>>;
}
const fileTypes = ["JPG", "PNG", "GIF"];
const MediaUpload = ({setType,docRef,uid,setMessages,friendId,setDocRef}:Props) => {
    const [file, setFile] = useState<null | File>(null);
    const [url,setUrl] = useState<string>("")
    const [bucketUrl,setBucketUrl] = useState<string>("")
    const [loading,setLoading] = useState(false)
  const handleChange = (file: File) => {
    console.log(file)
    setFile(file);
  };
  useEffect(()=>{
    const upload = async () => {
    if (file) {
        setLoading(true)
        const generateUrl = `Imgs/${v4()}`
        const storageRef = ref(bucket, generateUrl);
        await uploadBytes(storageRef, file).then((data) => {
          console.log(data);
          getDownloadURL(data.ref).then((url) => {
            setUrl(url);
            setBucketUrl(generateUrl)
            setLoading(false)
          });
        });
      }
    }
    
    upload();
  },[file])
  useEffect(()=> {
    console.log({url})
  }
  ,[url])
  const sendImg = async(docRef:any,uid:string,searchValue:string,type:string)=> {
    const send:boolean = await sendMessage(docRef,uid,searchValue,type)
    if(send) {
      // const currDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const message = {
        from:uid,
        content:url,
        type:"media",
        timestamp:Timestamp.fromDate(new Date())
      }
      // console.log(send)
      
      setMessages(prevMessages => prevMessages ? [...prevMessages, message] : [message]);
      if(socket.connected) {
        socket.emit("send_message",{uid:friendId,message})
        socket.emit("notTyping",{uid:friendId})
      }
      setUrl("")
      setType("text")
    }
    else {
      setToast("Something went wrong!","error")
    }
  }
  const setImg = async()=> {
    if(docRef) {
      sendImg(docRef,uid,url,"media")
    }
    else {
      const docRef = doc(db,"conversations",`${uid}_${friendId}`)
      await setDoc(docRef,{user1:uid,user2:friendId},{merge:true}).then(async()=>{
        sendImg(docRef,uid,url,"media")
        setDocRef(docRef)
      })
    }
  } 
  const handleBack = ()=> {
    if(url!=="") {
      const storageRef = ref(bucket,bucketUrl);
      deleteObject(storageRef).then(()=> {
        setUrl("")
        setBucketUrl("")
        setType("text")
      }
    ).catch((error)=> {
        console.log(error)
        })

    }
    else {
      setType("text")
    }
  }
  return (
    <>
    <Box sx={{width:"100%",height: "85vh",backgroundColor:`${primary}`}}>
        <Box sx={{padding:"24px",height:"inherit"}}>

        <ArrowBackIcon onClick={()=>handleBack()} sx={{cursor:"pointer"}}/>
        <Box sx={{display:'flex',height:"90%",alignItems:"center",justifyContent:"center",border:`2px dashed ${title}`,flexDirection:"column",gap:"20px",position:"relative"}}>
        <Image src="/loader.svg" alt="loader" width={100} height={100} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",display:loading?"block":"none"}}/>
        <FileUploader
            
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            // eslint-disable-next-line react/no-children-prop
            children={
                url==='' && !loading?<Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"}}>
                    <Box sx={{fontSize:"24px",fontWeight:"bold",color:`${title}`}}>Drop your media here</Box>
                    <Box sx={{fontSize:"16px",color:`${title}`}}>or</Box>
                    <Box sx={{fontSize:"16px",color:`${title}`}}>Click to upload</Box>
                </Box>:
                url!=='' && !loading?
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"300px",height:"35vh"}}>
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"300px",height:"35vh"}}>
                    <Image src={url} alt="media"  fill={true} />
                 </Box>
                    </Box>:
                    <div></div>
            }
          />
            {url!==""?<StyleButton onClick={setImg}>Send</StyleButton>:null}
        </Box>
        </Box>
    </Box>
    </>
  )
}

export default MediaUpload