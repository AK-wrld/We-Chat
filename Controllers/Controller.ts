import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { auth } from '../services/firebase.config';
import { toast } from 'react-toastify';
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
