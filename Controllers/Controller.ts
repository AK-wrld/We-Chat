import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { auth, db } from '../services/firebase.config';
import { toast } from 'react-toastify';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { TAuthUser } from '../Types/user';
const phoneUtil = PhoneNumberUtil.getInstance();
export const isPhoneValid = (phone: string) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

 export const sendOtp = async(muiPhone:string)=>{

    if(!isPhoneValid(muiPhone)) {
      return {success:false,error:"Phone number invalid"}
    }
    try {

      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha', {});
      const confirmation = await signInWithPhoneNumber(auth,muiPhone,appVerifier)
      console.log(confirmation)
      window.confirmationResult = confirmation;
      return {success:true,error:null}
    }
    catch(err) {
      console.log(err)
      return {success:false,error:"Something went wrong"}
    }
  }
export const setToast = (message:string,type:string) => {
  console.log(message)
  switch (type) {
    case "error":
      toast.error(message,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
      });
      break;
    case "success":
      toast.success(message,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
      })
      break
    default:
      toast(message,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
          })
      break;
  }
  
}
export function capitalizeFirstLetter(str:string) {
  str = str.toLowerCase()
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const getUser = async(uid:string)=> {
  const userRef = doc(db,"user",uid)
  return getDoc(userRef).then((doc)=> {
    if(doc.exists()) {
      return doc.data() as TAuthUser
    }
    else {
      return null
    }
  })
}
export const unblockUser = async(mUid:string,uid:string)=> {
  const mBlockRef = doc(db,"blockedUsers",mUid)
  const mBlockSnap = await getDoc(mBlockRef)
  if(mBlockSnap.exists()) {
    const {ids} = mBlockSnap.data()
    const newIds = ids.filter((id:string)=> id !== uid)
    await setDoc(mBlockRef,{ids:newIds},{merge:true})
  }
  const blockRef = doc(db,"blockedUsers",uid)
  const blockSnap = await getDoc(blockRef)
  if(blockSnap.exists()) {
    const {isBlockedBy} = blockSnap.data()
    const newIds = isBlockedBy.filter((id:string)=> id !== mUid)
    await setDoc(blockRef,{isBlockedBy:newIds},{merge:true})
  }
}