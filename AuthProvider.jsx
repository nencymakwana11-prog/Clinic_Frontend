import React, { useEffect, useState } from "react";
import { getToken } from "../services/authservices";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();

        if (token) {
            const authData = localStorage.getItem("auth");
            if (authData) {
                setAuth(JSON.parse(authData));
            }
        }

        setLoading(false);
    }, []);

    const LoginAuth = (authData) => {
        setAuth(authData);
    };

    const LogoutAuth = () => {
        setAuth(null);
        localStorage.removeItem("token");
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                LoginAuth,
                LogoutAuth,
                isAuthenticated: !!auth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};