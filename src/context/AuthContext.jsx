import { createContext, useState, useEffect,useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        loading,
    };          

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );  
    
    
}

export const useAuth = () => {
    return useContext(AuthContext);
}
