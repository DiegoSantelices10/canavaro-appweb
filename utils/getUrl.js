const { useRouter } = require("next/router");
const { useEffect, useState } = require("react");



export const getUrl = () => {
    const router = useRouter();
    const [fullUrl, setFullUrl] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Solo se ejecutará en el cliente
            console.log(window.location);
            const url = window.location.href;
            setFullUrl(url);
        }
    }, [router]);

    return fullUrl;
}
