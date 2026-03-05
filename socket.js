import { io } from 'socket.io-client';

const URL = 'http://149.50.131.39:4000';

export const socket = io(URL);