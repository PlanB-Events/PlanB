import React, { useState, useEffect } from "react";
import authService from "../services/auth";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  }  
    
  const authenticateUser = () => { 
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers

      authService.verify(storedToken)
      .then((response) => {
        // If the server verifies that JWT token is valid  ✅
        const user = response;
       // Update state variables        
        setIsLoggedIn(true);
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        // If the server sends an error response (invalid token) ❌
        // Update state variables        
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser({});
      });

    } else {
      // If the token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser({});
    }
  }

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }    
  
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  }

  const logInUser = (creds) =>{
    authService.login(creds).then(data=>{
      storeToken(data.authToken)
      authenticateUser()
    })
  }

  const signUpUser = (creds) =>{
    authService.signup(creds).then(data=>{
      storeToken(data.authToken)
      authenticateUser()
    })
  }


  useEffect(() => {
    // Run the function after the initial render,
    // after the components in the App render for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, signUpUser, logInUser, logOutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };