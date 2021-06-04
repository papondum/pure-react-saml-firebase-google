import logo from './logo.svg';
import './App.css';
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from './slice/login'

async function check() {
  // const auth = await firebase.auth()
  // const getId = await auth.currentUser
  // console.log(auth);
  // auth.currentUser.getIdToken(true).then(function(idToken) {
  //   // Send token to your backend via HTTPS
  //   // ...
  // }).catch(function(error) {
  //   // Handle error
  // });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("USER::",user); // It shows the Firebase user
        console.log("FIREBASE_AUTH::", firebase.auth()); // It is still undefined
        user.getIdToken().then(function(idToken) {  // <------ Check this line
           console.log("IDTOKEN:",idToken); // It shows the Firebase token now
        })
    }
  })
}

function App() {
  const token = useSelector(state => state.login.token)
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  if (!firebase.apps.length) {
    var config = {
      apiKey: "AIzaSyAukyuqQcWa3C-UsrXmNSIRSHb6XthpqDE",
      authDomain: "saml-provider-test.firebaseapp.com",
    };
    firebase.initializeApp(config);
  }else {
     firebase.app(); // if already initialized, use that one
  }
  const provider = new firebase.auth.SAMLAuthProvider('saml.saml-test');
  check()

  function loginHandler() {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const newObj = {
        credential: {...result.credential},
        user: {email: result.user.email, refresh: result.user.refreshToken, token: result.user.za}
      }
      localStorage.setItem("token", result.user.za);
      dispatch(setUser(newObj))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function logoutHandler() {
    dispatch(setUser({user: {email: "", refresh: "", token: ""}}))
    firebase.auth().signOut()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      })
    localStorage.removeItem('token')
  }
  if(token) {
    console.log(user.user.email);
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route path="/">
                <div>{user.user.email}</div>
                <button onClick={logoutHandler}>logout</button>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <button onClick={loginHandler.bind(this)}>Login</button>
            </header>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}



export default App;
