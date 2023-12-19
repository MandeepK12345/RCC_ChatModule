
import { createContext } from 'react';
import io from 'socket.io-client';


const  SOCKET_BASE_URL='https://nodercc-dev-api.appskeeper.in'

export const socketInstance = io(SOCKET_BASE_URL, {'transports': ['polling']});

const SocketContext = createContext(socketInstance);
export const SocketProvider = SocketContext.Provider;

export default SocketContext;