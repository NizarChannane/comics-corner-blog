import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGNIN":
            return { user: action.payload, authStatus: "authorized" };
        case "SIGNOUT":
            return { user: null, authStatus: "unauthorized" };
        case "USER_LOADING":
            return { user: null, authStatus: "pending" };
        case "UNAUTHORIZED":
            return { user: null, authStatus: "unauthorized" };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authStatus: null
    });

    useEffect(() => {
        const getAuthStatus = async () => {
            dispatch({ type: "USER_LOADING" });

            const response = await fetch("/api/auth/get-auth-status", {
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            const json = await response.json();
            
            if (!json.userId) {
                dispatch({ type: "UNAUTHORIZED" });
                console.log(json.errors[0].msg);
            };

            if (json.userId) {
                dispatch({ type: "SIGNIN", payload: { id: json.userId, username: json.username, role: json.role } });
            };
        };

        if (state.user === null) {
            getAuthStatus();
        };
    }, [])

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
};