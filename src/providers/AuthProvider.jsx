import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import PropTypes from 'prop-types';


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)

    }

    const googleSignIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)

    }

    const logOut = async () => {
        setLoading(true);
        return signOut(auth)
            
    }

    const updateUserProfile = (name, photo)=>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                // https://firebase.google.com/docs/reference/js/auth.user
            } else {
                // User is signed out
            }
        });
        return () => {
            setLoading(false);
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        loading,
        setLoading,
        user,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile,

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
  };
export default AuthProvider;