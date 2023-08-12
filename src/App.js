import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './App.css';
import app from './firebase/firebase.init';


const auth = getAuth( app );

function App() {
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = () =>{
    signInWithPopup( auth, provider )
      .then( result => {
        const user = result.user;
        console.log('User', user);
      } )
      .catch ( error => console.error("Error", error)  );
  }
  return (
    <div className="App">
      <button onClick={ handleGoogleSignIn }>Google Sign In</button>
    </div>
  );
}

export default App;
