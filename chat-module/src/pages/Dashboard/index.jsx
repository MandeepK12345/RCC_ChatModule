import { useEffect } from "react";
import {Container } from "react-bootstrap";
import socketIo from "socket.io-client";

// import SocketContext from "../../context/socket";


let socket;
const ENDPOINT = "https://nodercc-dev-api.appskeeper.in";
export default function Dashboard() {

	// const socketInstance = useContext(SocketContext);

	useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            // setid(socket.id);

        })

		socket.on('listUser', (res) => {
            alert('res');
			console.log('listUser',res);
            // setid(socket.id);

        })
        console.log(socket);
        // socket.emit('joined', { user })
// 
        // socket.on('welcome', (data) => {
        //     setMessages([...messages, data]);
        //     console.log(data.user, data.message);
        // })

        // socket.on('userJoined', (data) => {
        //     setMessages([...messages, data]);
        //     console.log(data.user, data.message);
        // })

        // socket.on('leave', (data) => {
        //     setMessages([...messages, data]);
        //     console.log(data.user, data.message)
        // })

        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    }, [])


	// socketInstance.on('listUser', (messageData) => {
	// 	const data = JSON.parse(JSON.stringify(messageData));
	// 	console.log('====data',data)
	// 	// if(messageData?.sender == friendId){
	// 	//   fetch(URL.MARK_MESSAGE_SEEN(friendId as string),{
	// 	// 	method: 'PATCH',
	// 	// 	headers: { Authorization: `Bearer ${token}` },
	// 	//   });
	// 	//   data['status'] = 'SEEN';
	// 	// }
	// 	// let previousMessages = JSON.parse(JSON.stringify(messages[messageData?.sender  as string])) || [];
	// 	// previousMessages.unshift(data);
	// 	// dispatch(setMessages({chatMessages: {...messages, [messageData?.sender  as string]: previousMessages}}));    
	//   });

   
	return (
		<Container className="alignCentre">
		  <h1> User DashBoard</h1>
		</Container>
	);
}
