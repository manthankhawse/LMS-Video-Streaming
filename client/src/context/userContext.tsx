import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        setToken(localStorage.getItem("token") || "");
        setUser(JSON.parse(localStorage.getItem("user")) || null);
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, token, setToken}}>{children}</AuthContext.Provider>
    );
};
