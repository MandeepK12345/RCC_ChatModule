
import { createContext } from 'react';
import io from 'socket.io-client';


// will move in constant file late or env variable, hardcoded for now, remove it

const  SOCKET_BASE_URL='https://nodercc-dev-api.appskeeper.in'

export const socketInstance = io.connect(SOCKET_BASE_URL, {'transports': ['polling']});

const SocketContext = createContext(socketInstance);
export const SocketProvider = SocketContext.Provider;

export default SocketContext;