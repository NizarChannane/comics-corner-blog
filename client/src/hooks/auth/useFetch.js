import { useState, useEffect } from "react";

export const useFetch = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [serverMsg, setServerMsg] = useState(null);
    const [data, setData] = useState(null);

    const customFetch = async (method, url, data, options) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        setServerMsg(null);
        setData(null);

        const response = await fetch(`/api/${url}`, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: data && JSON.stringify(data)
        });
        const json = await response.json();

        if (!response.ok) {
            console.log("not ok");
            console.log(json);
            if (json.errors) {
                console.log("errors");
                setServerMsg(json.errors[0].msg);
            } else {
                setServerMsg(json.msg);
            }
            setError(true);
            setSuccess(false);
            setIsLoading(false);
            return;
        };

        if(json.data) {
            setData(json.data);
        };
        console.log(json);
        setServerMsg(json.msg);
        setError(false);
        setSuccess(true);
        setIsLoading(false);

    };

    return { customFetch, isLoading, serverMsg, data, success, error };
};