import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [serverMsg, setServerMsg] = useState(null);
    const { dispatch } = useAuthContext();

    const signout = async () => {
        setIsLoading(true);
        setError(null);
        setServerMsg(null);

        const response = await fetch("/api/auth/signout", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        const json = await response.json();
        console.log(json);

        if (!response.ok) {
            setError(json.error);
            setServerMsg(json.msg);
            setIsLoading(false);
        };

        if (response.ok) {
            dispatch({ type: "SIGNOUT" });
            setServerMsg(json.msg);
            setIsLoading(false);
        };
    };

    return { signout, isLoading, serverMsg, error };
};