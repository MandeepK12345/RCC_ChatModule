import { useEffect , useContext} from "react";
import {Container } from "react-bootstrap";
import {useSelector } from "react-redux";
import SocketContext from "../../context/socket";



export default function Dashboard() {

    const socketInstance = useContext(SocketContext);
    const userInfo = useSelector((state) => state.user);

    // console.log('userInfo',userInfo);

    // useEffect(() => {
        
    //     socketInstance.on('saveSocketId', (res) => {
    //        console.log('resooodisnfnd',res)
    //       })
    //   }, []);  
      
      


	socketInstance.on('listUser', (messageData) => {
		const data = JSON.parse(JSON.stringify(messageData));
		console.log('====data',data)
		// if(messageData?.sender == friendId){
		//   fetch(URL.MARK_MESSAGE_SEEN(friendId as string),{
		// 	method: 'PATCH',
		// 	headers: { Authorization: `Bearer ${token}` },
		//   });
		//   data['status'] = 'SEEN';
		// }
		// let previousMessages = JSON.parse(JSON.stringify(messages[messageData?.sender  as string])) || [];
		// previousMessages.unshift(data);
		// dispatch(setMessages({chatMessages: {...messages, [messageData?.sender  as string]: previousMessages}}));    
	  });


	socketInstance.on('receiveMessage', (messageData) => {
		const data = JSON.parse(JSON.stringify(messageData));
		console.log('====data',data)
		// if(messageData?.sender == friendId){
		//   fetch(URL.MARK_MESSAGE_SEEN(friendId as string),{
		// 	method: 'PATCH',
		// 	headers: { Authorization: `Bearer ${token}` },
		//   });
		//   data['status'] = 'SEEN';
		// }
		// let previousMessages = JSON.parse(JSON.stringify(messages[messageData?.sender  as string])) || [];
		// previousMessages.unshift(data);
		// dispatch(setMessages({chatMessages: {...messages, [messageData?.sender  as string]: previousMessages}}));    
	  });

      

   
	return (
		<Container className="alignCentre">
		  <h1>Welcome {userInfo?.email} {userInfo.mobileNo}</h1>
		</Container>
	);
}
