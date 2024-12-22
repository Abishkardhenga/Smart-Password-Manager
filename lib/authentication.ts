import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User,sendEmailVerification as sendVerificationEmail  } from "firebase/auth";
import { auth, db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

export const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        await sendEmailVerificationn(user);
  
        throw new Error("Email is not verified, Sending Email Verifaction on your email")
      }
  
      console.log("User logged in successfully:", user);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  
  
  export const signup = async (email: string, password: string, name: string) => {
    try {
      console.log("email  password name ", email , password , name)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user credentials", userCredential)
      const user = userCredential.user;
  
      console.log("user", user)
  
  
      const userDocRef = await addDoc(collection(db, "user"), {
        id: user.uid,
        email: user.email,
        name: name,
        password: password
      });
  
      console.log("Signup successful, email verification sent. User data saved with ID: ", userDocRef.id);
      return user;
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };
  
  
  export const logout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  };
  
  export const sendEmailVerificationn = async (user: User) => {
  
    try {
      await sendVerificationEmail(user); 
      console.log("Verification email sent.");
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email."); 
    }
  };
  
  export const sendPasswordResetEmailFn = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log(`Password reset email sent to: ${email}`);
    } catch (error) {
      console.error(`Failed to send password reset email to: ${email}`, error);
      throw error;  
    }
  };
  