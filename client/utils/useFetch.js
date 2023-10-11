import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url, params) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(url, { params: (params || {}) })
            .then(res => { 
                setData(res.data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, [url])
    
    return {data, isPending, error};
}

export default useFetch