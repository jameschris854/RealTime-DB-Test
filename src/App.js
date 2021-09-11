import './App.css';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useObject} from 'react-firebase-hooks/database'
import firebase from 'firebase/compat';
import 'firebase/compat/firestore'
import 'firebase/compat/app'
import { getDatabase,ref, set,onValue} from "firebase/database";
import { useEffect, useState } from 'react';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL:process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId:process.env.REACT_APP_appId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();



function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}


function App() {
  const db = getDatabase()
  const [user] = useAuthState(auth)
  const [counter,setCounter] = useState(0)

  const dbcounter = firebase.database().ref('counter/count');
  const [data,bool,error] =  useObject(dbcounter)

  useEffect(() => {
    let val = data ? data.val() : counter
    setCounter(val)
  },[counter,data])
  
  const counterHandler = () => {    
    let val = data ? data.val() : counter
    set(ref(db,'counter/'),{
      count:val+1
    })
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
      <div className='box' onClick={counterHandler} >
          {counter}
      </div>
        { user? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}

function ChatRoom(){
 return(
   <div>
     room
   </div>
 )
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider) 
    writeUserData('1015','james1','jameschris854@gmail.com','www.spoof.com')

  }
  return(
    <button onClick={signInWithGoogle}>Signin with Google</button>
  )
}

export default App;
