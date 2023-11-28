import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../Config/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic()
    const [payment, setPayment] = useState("basic");
    const updatePayment = (newAmount) => {
      setPayment(newAmount)
    }
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
      };
      const logIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
      };
    
      const googleProvider = new GoogleAuthProvider();
    
      const socialLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
      };
    
      const logOut = () => {
        setLoading(true);
        return signOut(auth);
      };
    
      const updateUserProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: image,
        });
      };

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setLoading(true)
            setUser(currentUser);
            if(currentUser){
              const userInfo = {email: currentUser.email}
              axiosPublic.post('/jwt', userInfo)
              .then(res => {
                if(res.data.token){
                  localStorage.setItem('token', res.data.token)
                  setLoading(false)
                }
              })
            }
            else{
              localStorage.removeItem('token')
              setLoading(false)
            }

            
        });
        return () =>  unsubscribe();
      }, [axiosPublic])
      const myRef = {
        user,
        loading,
        setLoading,
        createUser,
        logIn,
        socialLogIn,
        logOut,
        updateUserProfile,
        payment, 
        updatePayment
      };
    return (
        <div>
            <AuthContext.Provider value={myRef}>{children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;