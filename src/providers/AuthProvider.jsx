import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import PropTypes from 'prop-types';
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)

    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)

    }

    const logOut = async () => {
        setLoading(true);
        return signOut(auth)

    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                try {
                    const res = await axiosPublic.post('/jwt', userInfo);
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                } catch (error) {
                    // console.log("Error in /jwt request:", error);
                }
            } else {
                // remove token from local storages
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });

        return () => {
            // console.log("Cleanup");
            setLoading(false);
            return  unsubscribe();
        };
    }, [axiosPublic]);



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