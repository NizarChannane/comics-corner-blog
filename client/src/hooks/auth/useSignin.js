import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [serverMsg, setServerMsg] = useState(null);
    const { dispatch } = useAuthContext();

    const signin = async (email, password) => {
        setIsLoading(true);
        setError(null);
        setServerMsg(null);

        const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();

        if (!response.ok) {
            console.log("not ok");
            setServerMsg(json.msg);
            setError(true);
            setIsLoading(false);
        };

        if (response.ok) {
            console.log("ok");
            dispatch({ type: "SIGNIN", payload: { id: json.userId, username: json.username, role: json.role } });
            setServerMsg(json.msg);
            setError(false);
            setIsLoading(false);
        };
    };

    return { signin, isLoading, serverMsg, error };
};