import { useState } from 'react';

export function useLoading() {
    
    const [loading, setLoading] = useState(false);

    function showLoading() {
        setLoading(true);
    }

    function hideLoading() {
        setLoading(false);
    }

    return { loading, showLoading, hideLoading };
}