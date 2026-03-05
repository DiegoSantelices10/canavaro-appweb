import { io } from 'socket.io-client';

const URL = 'http://149.50.131.39:8080';

export const socket = io(URL);