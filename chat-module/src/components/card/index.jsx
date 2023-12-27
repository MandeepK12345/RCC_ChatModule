import React from "react";
import { useNavigate } from "react-router-dom";
import { routesPath } from "../../router/routes";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import "./index.css";

const UserCard = ({ friendData }) => {
	console.log("_friendData", friendData);

	const userInfo = useSelector((state) => state.user);
	const { id } = userInfo;
	const navigate = useNavigate();
	
	const useCardHandler = () => {
		const receiverId= friendData.userId;
		const {chatId} = friendData;
		const userId = id;
		localStorage.setItem("chatObject", JSON.stringify({chatId,receiverId, userId}) );

		navigate(routesPath.CHAT, {
			state: { userId, chatId , receiverId},
		});
	};

	return (
		<div className="cardContainer" key={friendData.userId}>
			<Card onClick={useCardHandler}>
				<Card.Body className="cardBox">
					<Card.Img
						variant="top"
						src="https://picsum.photos/seed/picsum/100/100"
					/>
					<div className="textStyle">
						<Card.Title>{friendData.fullName}</Card.Title>

						<Card.Text>{friendData.lastMessageContent?.content}</Card.Text>
					</div>
				</Card.Body>
			</Card>
		</div>
	);
};

export default UserCard;
