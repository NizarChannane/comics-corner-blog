import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [serverMsg, setServerMsg] = useState(null);

    const signup = async (username, firstname, lastname, email, password) => {
        setIsLoading(true);
        setError(null);
        setServerMsg(null);

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, firstname, lastname, email, password })
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
            setServerMsg(json.msg)
            setError(false);
            setIsLoading(false);
        };
    };

    return { signup, isLoading, serverMsg, error };
};