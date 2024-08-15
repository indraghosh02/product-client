
import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null)


const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();

    const [ user, setUser ] = useState(null)
    console.log(user);

    //createuser

    const createUser = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
            // .then((userCredential) => {
            //     // Call logout after user is created
            //     //logout();
            //     return userCredential;
            // })
            // .catch((error) => {
            //     // Handle errors if any
            //     console.error("Error creating user:", error);
            // });
    };

    //signin 

    const signInUser = (email, password) =>{
        // setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);

    };

     //google
     const googleLogin = ()=>{
        // setLoading(true)
       return signInWithPopup(auth, googleProvider)

    }

    //logout
    const logout = () =>{
        setUser(null)
        // setLoading(false)
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                // setLoading(false)
            }
            else {
                setUser(null); // Set user to null if no user is authenticated
            }
            //setLoading(false);
             
          });
          return () => unsubscribe(); 

    }, [])

    const allValues = { 
        createUser,
        signInUser,
        googleLogin,
        logout,
        user
        
    }
    return (
        <AuthContext.Provider 
        value={allValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;