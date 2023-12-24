import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { auth } from '../services/firebase.config';
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