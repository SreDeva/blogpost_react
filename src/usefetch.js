import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData]= useState(null);
    const [isPendinng, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal})
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('Abort');
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });
        });

        return () => abortCont.abort();
    }, [url]);


    return { data, isPendinng, error}
}

export default useFetch;