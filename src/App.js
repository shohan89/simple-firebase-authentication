import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import './App.css';
import app from './firebase/firebase.init';
import { useState } from 'react';


const auth = getAuth( app );

function App() {
  const [ user, setUser ] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () =>{
    signInWithPopup( auth, googleProvider )
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

  const handleGithubSignIn = () => {
    signInWithPopup( auth, githubProvider )
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch( error => console.log( "Error", error ) );
  }

  return (
    <div className="App">
      {/* conditional rendering   */}
      { 
      user.uid ? <button onClick={ handleSignOut }>Sign Out</button>
      :
      <>
        <button onClick={ handleGoogleSignIn }>Google Sign In</button>
        <button onClick={ handleGithubSignIn }>Github Sign In</button>
      </>
      }
      {
        user.uid && <div>
        <img src= { user?.photoURL} alt="" />
        <h3>User Name: { user.displayName }</h3>
        <p>Email Address: { user.email }</p>
      </div>
      }
    </div>
  );
}

export default App;
