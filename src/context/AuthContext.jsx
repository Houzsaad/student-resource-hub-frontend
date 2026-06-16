import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("access_token"));

    function login(access, refresh) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        setToken(access);
    }

    function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setToken(null);
    }

    const isLoggedIn = Boolean(token);

    return(
        <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}