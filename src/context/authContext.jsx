import {createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

function AuthContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user) {
            setUser(JSON.parse(user))
        }
        setIsLoading(false)
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, isLoading}}>
            {children}  
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;