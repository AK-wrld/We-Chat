export type TAuthData = {
    accessToken: string;
    displayName: string,
    photoUrl: string,
    email: string,
    phone?: string
}
export type TAuthUser = {
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    photoURL: string | null;
    uid: string | null;
    phone: string | null;
    dob:string | null;
    
  };