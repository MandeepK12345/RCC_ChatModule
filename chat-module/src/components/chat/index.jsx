import React, { useEffect, useState, useContext } from "react";
import { Row, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import SocketContext from "../../context/socket";
import Header from "../../components/header";
import Images from "../../utils/images";
import Footer from "../footer";
import "./index.css";
import InputComponent from "../input";
import ButtonComponent from "../button";

const UserChat = () => {
	const location = useLocation();
	const socketInstance = useContext(SocketContext);
	const [chatHistory, setChatHistory] = useState([]);
	const [senderChat, setSenderChat] = useState([]);
	const { userId, chatId, receiverId } = location?.state || JSON.parse(localStorage.getItem("chatObject"));
	// const {receiveMessage, setReceiveMessage} = useState([]);

	console.log("_userId, chatId and receiverId are", userId, chatId, receiverId);

	useEffect(() => {

		socketInstance.emit("saveSocketId", {
			userId: userId,

		});

		socketInstance.emit("allSocketEvent", {
			eventType: "createRoom",
			users: [userId , receiverId], 
		});

		socketInstance.emit("allSocketEvent", {
			eventType: "getChatHistory",
			chatId:  chatId,
			userId: userId,
			pageNo: 1,
			limit: 40,
		});

		socketInstance.on("getChatHistory", (response) => {
			console.log("_chatHistoryIs", response);
			if (response?.status) {
				setChatHistory(response?.data?.data);
			}
		});

		socketInstance.on("receiveMessage", (response) => {
			console.log("Inside receieve message response");
			console.log("_receiveMessageResponse", response?.data);
			// if (response?.status) {
			// 	setReceiverChat([...response?.data?.data]);
			// }
		});

	}, [socketInstance]);

	const handleInputChange = (e) => {
		const { value } = e?.target;
		setSenderChat(value);
	};


	const submitHandler = () => {
		socketInstance.emit("allSocketEvent", {
			eventType: "sendMessage",
			chatId: chatId,
			senderId: userId,
			receiverId: receiverId,
			content: {
				messageType: "text",
				content: senderChat,
			},
		});
	};
	
	// socketInstance.on("receiveMessage", (response) => {
	// 	console.log("Inside receieve message response");
	// 	console.log("_receiveMessageResponse", response?.data);
	// 	// if (response?.status) {
	// 	// 	setReceiverChat([...response?.data?.data]);
	// 	// }
	// });

	return (
		<Container fluid className="alignCentre p-0">
			<Header heading="Chat" />
			<Row className="chat-wrapper m-0">
				<Row className="chat-section">
					{chatHistory.map((item) => {

						return item.senderId === userId? ( 
							<div className="sender-chat">
								{" "}
								<img
									src={Images.profileIcon}
									alt="profileImg"
									height="40px"
									width="40px"
								/>
								<div>{item?.content?.content}</div>
							</div>
						) : (
							<div className="receiver-chat">
								<img
									src={Images.profileMaleIcon}
									alt="profileImg"
									height="40px"
									width="40px"
								/>
								<div>{item?.content?.content}</div>
							</div>
						);
					})}
				</Row>
				<Row className="chat-input-wrapper">
					<InputComponent
						type="text"
						name="send"
						placeholder="Please type here..."
						onChange={handleInputChange}
						value={senderChat}
						className="chat-input"
					/>
					<ButtonComponent
						label="Send"
						btnHandler={submitHandler}
						size="medium"
					/>
				</Row>
			</Row>

			<Footer />
		</Container>
	);
};
export default UserChat;
