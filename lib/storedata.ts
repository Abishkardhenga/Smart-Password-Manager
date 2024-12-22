import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, getCurrentUser } from "./firebase";
import uuid from 'react-native-uuid';
import { StoredData } from "@/types/PasswordManager.types";

export const addStoredData = async (label_id:string, password:string, title:string, website:string, contact_info:string, label_name:string) => {
    try {
      const user = getCurrentUser();
      if(!user){
        console.log("nO user available ")
        return ;
      }
  
      const storedDataRef = await addDoc(collection(db, "Stored_data"), {
        id: uuid.v4(),          
        label_id: label_id,      
        password: password,      
        title: title,            
        user_id: user!.uid,      
        website: website,       
        contact_info: contact_info ,
        label_name:label_name
      });
  
      console.log("Stored data added with ID: ", storedDataRef.id);
  
    } catch (e) {
      console.error("Error adding stored data: ", e);
    }
  };
  
  export const getStoredData = async () => {
    try {
      const user = getCurrentUser();
      if(!user){
        console.log("nO user available ")
        return ;
      }
  
      const q = query(collection(db, "Stored_data"), where("user_id", "==", user.uid));
  
      const querySnapshot = await getDocs(q);
      const storedDataList:any = [];
  
      querySnapshot.forEach((doc) => {
        storedDataList.push({ id: doc.id, ...doc.data() });
      });
  
      return storedDataList;
    } catch (e) {
      console.error("Error getting stored data: ", e);
      return [];
    }
  };
  export const getStoreDatabyId = async (id: string) => {
    const user = getCurrentUser();
    
    // Check if user is authenticated
    if (!user) {
      console.error("Unauthorized: You are not allowed to retrieve this data");
      return false;
    }
  
    try {
      console.log("Fetching stored data by id:", id);
  
      const q = query(collection(db, "Stored_data"), where("id", "==", id)); 
      const querySnapshot = await getDocs(q); 
  
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]; // Get the first result
        return docData; 
      } else {
        console.log("No matching document found!");
        return null; 
      }
    } catch (e) {
      console.error("Error fetching document:", e);
      return null;
    }
  };
  
  
  export const getStoredDataByLabel = async (id: string) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        console.log("No user available");
        return;
      }
  
      const q = query(
        collection(db, "Stored_data"),
       
        where("label_id", "==", id) 
      );
  
      const querySnapshot = await getDocs(q);
      const storedDataList: any[] = [];
  
      querySnapshot.forEach((doc) => {
        storedDataList.push({ id: doc.id, ...doc.data() });
      });
  
      return storedDataList;
    } catch (e) {
      console.error("Error getting stored data by label: ", e);
      return [];
    }
  };
  
  
  
  
  
  export const editStoredDataa = async (id: string, updatedFields: Partial<StoredData>) => {
    const user = getCurrentUser();
    
    if (!user) {
      console.error("Unauthorized: You are not allowed to retrieve this data");
      return false;
    }
  
    try {
      const q = query(collection(db, "Stored_data"),  where("id", "==", id));
  
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log("No document found with the provided ID: ", id);
        return { success: false, message: "No document found with the provided ID" };
      }
      const docToUpdate = querySnapshot.docs[0]; 
      const docRef = doc(db, "Stored_data", docToUpdate.id); 
  
  
      await updateDoc(docRef, updatedFields);
      console.log("Document successfully updated!");
      return { success: true, message: "Stored data updated successfully" };

  
    } catch (error) {
      console.error("Error updating document: ", error);
      return false;
    }
  };
  
  
  
  
  
  export const deleteStoredData = async (id: string) => {
    const user = getCurrentUser();
  
    if (!user) {
      console.error("Unauthorized: You are not allowed to retrieve this data");
      return false;
    }
  
    try {
      // Query to get the document matching the ID
      const q = query(collection(db, "Stored_data"), where("id", "==", id)); 
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.error("No document found with the given ID");
        return false;
      }
  
      // Get the document reference from the query snapshot
      const docRef = querySnapshot.docs[0].ref;  // Get the first document reference
  
      // Delete the document
      await deleteDoc(docRef);
  
      console.log("Stored data deleted successfully");
      return true;
    } catch (e) {
      console.error("Error deleting stored data: ", e);
      return false;
    }
  };
  