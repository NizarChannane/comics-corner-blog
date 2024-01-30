import { useState } from "react";

export const useSendResetEmail = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [serverMsg, setServerMsg] = useState(null);


    const sendResetEmail = async (email) => {
        setIsLoading(true);
        setError(null);
        setServerMsg(null);
        setSuccess(null);

        const response = await fetch("/api/auth/send-reset-email", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email })
        });
        const json = await response.json();

        if (!response.ok) {
            console.log("not ok");
            setServerMsg(json.msg);
            setError(true);
            setSuccess(false);
            setIsLoading(false);
        };

        if (response.ok) {
            console.log("ok");
            setServerMsg(json.msg);
            setError(false);
            setSuccess(true);
            setIsLoading(false);
        };
    };

    return { sendResetEmail, isLoading, serverMsg, success, error };
};