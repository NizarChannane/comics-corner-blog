import { useState } from "react";

export const useResetPwd = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [serverMsg, setServerMsg] = useState(null);


    const resetPwd = async (password, token) => {
        setIsLoading(true);
        setError(null);
        setServerMsg(null);
        setSuccess(null);

        const response = await fetch(`/api/auth/reset-pwd?token=${token}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ password })
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

    return { resetPwd, isLoading, serverMsg, success, error };
};