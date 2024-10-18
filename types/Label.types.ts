 export interface LabelProps {
   id?:string
    color:string 
    name:string
    user_id?:string
 } 


 export interface StoreDataProps {
   id?:string;
    label_id?:string
    label_name?:string
    contact_info:string
    title:string 
    user_id?:string
    website:string
    password:string
 }

 export interface UserCredentials {
    name: string;
    email: string;
    password: string;
}


export interface updatedFields { 
   label_id:string,
    password:string, 
    title:string, 
    website:string, 
    contact_info:string
 
 }

 export interface viewdetailsProps {
   title: string
   website: string
   Label?: string
   emailorphone: string
   password: string
 }


 