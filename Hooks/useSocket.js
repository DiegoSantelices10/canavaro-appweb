import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
    const [isServer, setIsServer] = useState(false);


    if (!isServer) {
        const res = useMemo(() => io.connect(serverPath), [serverPath]);
        setIsServer(res)
    }

    useEffect(() => {
        if (!isServer) {
            const res = useMemo(() => io.connect(serverPath), [serverPath]);
            setIsServer(res)
        }

    }, [])



    return {
        socket: isServer,
        setIsServer
    }
}