import { useMemo, useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
    const socketRef = useRef(null);

    const socket = useMemo(() => {
        if (!socketRef.current) {
            console.log('entro');
            socketRef.current = io.connect(serverPath);
        }
        return socketRef.current;
    }, [serverPath]);
    const [online, setOnline] = useState(false);

    useEffect(() => {
        setOnline(socket.connected);

        socket.on('disconnect', () => {
            setOnline(false);
        })

    }, [socket])

    return {
        socket,
        online
    }
}