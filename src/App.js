import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import './App.css';
import app from './firebase/firebase.init';
import { useState } from 'react';


const auth = getAuth( app );

function App() {
  const [ user, setUser ] = useState({});

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () =>{
    signInWithPopup( auth, provider )
      .then( result => {
        const user = result.user;
        setUser( user );
        console.log('User', user);
      } )
      .catch ( error => console.error("Error", error)  );
  }

  const handleSignOut = () => {
    signOut( auth )
      .then( ()=>{
        setUser({});
      })
      .catch( ()=>{
        setUser({});
      } )
  }

  return (
    <div className="App">
      {/* conditional rendering   */}
      { 
      user.email ? <button onClick={ handleSignOut }>Sign Out</button>
      :
      <>
        <button onClick={ handleGoogleSignIn }>Google Sign In</button>
        <button>Github Sign In</button>
      </>
      }
      {
        user.email && <div>
        <img src= { user?.photoURL} alt="" />
        <h3>User Name: { user.displayName }</h3>
        <p>Email Address: { user.email }</p>
      </div>
      }
    </div>
  );
}

export default App;
