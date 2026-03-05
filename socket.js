import { io } from 'socket.io-client';

const URL = 'https://pizza-canavaro.site';

export const socket = io(URL);