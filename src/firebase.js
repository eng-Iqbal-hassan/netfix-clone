// In terminal 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVUoB7SyS6_CytX8p99GnlrjRzb02LRDM",
  authDomain: "netflix-clone-7bea6.firebaseapp.com",
  projectId: "netflix-clone-7bea6",
  storageBucket: "netflix-clone-7bea6.firebasestorage.app",
  messagingSenderId: "745639238992",
  appId: "1:745639238992:web:67583c4cbd650a596ee055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize the firebase authentication
const auth = getAuth(app)
//configure fire-store for database
const db = getFirestore(app);

const signup = async (name,email,password)=>{
  try {
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db, 'user'), {
        uid: user.uid,
        name,
        authProvider:  'local',
        email,
    })
  } catch (error) {
    console.log(error)
    toast(error.code.split('/')[1].split('-').join(' '))
  }
}

const login =  async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error)
    toast(error.code.split('/')[1].split('-').join(' '))
  }
}

const logout =  ()=>{
    signOut(auth)
}

export { auth, db, signup, login, logout }