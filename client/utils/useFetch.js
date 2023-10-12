import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url, params) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const [refreshTick, setRefreshTick] = useState(0);

    const refresh = () => setRefreshTick(refreshTick+1);

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
    }, [url, refreshTick])
    
    return {data, isPending, error, refresh};
}

export default useFetch