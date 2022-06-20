//We will create a React Context in this file that will house all authentication info (currentUser, login, logout). React contexts allow us to store information and transport that info to the components that use it. We could store this info in the App component and just pass props to send the user information to other components but this isn't ideal for larger applications. Instead, we create the context and a component that will communicate this context to its children. This of this much like Session storage in a .NET application.
import React, { useContext, useState, useEffect } from 'react'
import {auth} from '../base'//gives access to the auth object, which initializes authentication
import {GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';//These are firebase functions we need to use in our logic below (in the component portion of the code)

//Below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext();

//Below we create a function that will allow us to use the context in components. We will import this function anytime we want the currentUser, login, or logout functionality
export function useAuth(){
    return useContext(AuthContext);
}

//This component will provide the AuthContext info to the children components nested inside of it. See App.js where we call to an instance of this component and nest all other components inside of it.
export default function AuthProvider({children}) {
    //Create hooks for currentUser and another custom hook to determine if the context has info to share with child components before rendering the child components to the screen.
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //Login functionality
    //Instantiate a GithubAuthProvider object
    const githubAuthProvider = new GithubAuthProvider()

    async function login(){

        return(signInWithPopup(auth, githubAuthProvider).then(authData =>{
            console.log(authData)
            setCurrentUser(authData.user);
            //This is where I might add some functionality to save the user to a db. Also maybe decide what user role they are in.
        }))
    }

    //Logout functionality
    async function logout(){
        signOut(auth).then(setCurrentUser(null));
    }

    //The object below will hold currentUser info, and login/logout functions, so we can use them in the child components. We will pass this as a prop in the return below.
    const value = {currentUser, login, logout};

    useEffect(() => {
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange;
    }, []);

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
