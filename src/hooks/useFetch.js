import { useState, useEffect } from "react";

export function useFetch(fetchFn, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        console.log("fetching...is:", fetchFn);

        const result = fetchFn();
        console.log("result is:", result);

        result
            .then(data => {
                console.log("got data:", data);
                setData(data);
            })
            
            .catch(err => {
                console.log("error happen:", err);
                console.log("error message:", err.message);
            })
            
            .finally(() => setLoading(false));

    }, deps);

    return{ data, loading, error };
}