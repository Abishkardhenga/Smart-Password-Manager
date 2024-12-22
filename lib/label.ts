import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, getCurrentUser } from "./Firebase.config";
import uuid from 'react-native-uuid';

export const addLabel = async (name:string, color:string) => {
    try {
       const user = getCurrentUser()
      if(!user){
        return Response.json({ message:"Unauthorized access  || Something is wrong ", status:404})
      }
  
      const labelRef = await addDoc(collection(db, "Label"), {
        name: name,
        color: color,
        user_id: user!.uid,
        id: uuid.v4(), 
      });
      console.log("Label successfully added with ID: ", labelRef.id);
      return true ; 
  
    } catch (e) {
      
      console.error("Error adding label: ", e);
      return e;
    }
  };
  
  export const getLabelsByUser = async () => {
    try {
      const user = getCurrentUser();
      if(!user){
        console.log("nO user available ")
        return ;
      }
  
      const q = query(collection(db, "Label"), where("user_id", "==", user.uid));
  
      const querySnapshot = await getDocs(q);
      const labels:any = [];
  
      querySnapshot.forEach((doc) => {
        labels.push({ id: doc.id, ...doc.data() });
      });
  
      return labels;
    } catch (e) {
      console.error("Error getting labels: ", e);
      return [];
    }
  };
  
  
  export const editLabel = async (id: string, name?: string, color?: string) => {
    try {
      const user = getCurrentUser(); // Ensure this returns a user object
      if (!user) {
        return { success: false, message: "Unauthorized access" };
      }
  
      console.log("Editing label with ID: ", id);
  
      const q = query(collection(db, "Label"),  where("id", "==", id));
  
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log("No document found with the provided ID: ", id);
        return { success: false, message: "No document found with the provided ID" };
      }
  
      // Since the query only returns one document, grab it
      const docToUpdate = querySnapshot.docs[0]; 
      const docRef = doc(db, "Label", docToUpdate.id); 
  
      // Proceed with updating the document
      await updateDoc(docRef, {
        name: name,
        color: color,
      });
  
      console.log("Label updated successfully");
      return { success: true, message: "Label updated successfully" };
      
    } catch (e) {
      console.error("Error updating label: ", e);
      return { success: false, message: "Error updating label" };
    }
  };;
  
  
  
  export const deleteLabel = async (id: string) => {
    const user = getCurrentUser();
    
    if (!user) {
      console.error("Unauthorized: You are not allowed to delete this data");
      return false;
    }
  
    try {
      console.log("Fetching stored label by id:", id);
    
      const q = query(collection(db, "Label"), where("id", "==", id)); 
      const querySnapshot = await getDocs(q); 
    
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;  // Get the first document reference
        
        // Delete the document
        await deleteDoc(docRef);
        console.log("Label deleted successfully.");
        return true; // Return success
      } else {
        console.log("No matching document found!");
        return false; // No document found
      }
    } catch (e) {
      console.error("Error deleting document:", e);
      return false;
    }
  };