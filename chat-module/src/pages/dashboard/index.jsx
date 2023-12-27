import { useEffect, useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SocketContext from "../../context/socket";
import Header from "../../components/header";
import Footer from "../../components/footer";
import UserCard from "../../components/card";
import "./index.css";

export default function Dashboard() {
	const socketInstance = useContext(SocketContext);
	const userInfo = useSelector((state) => state.user);
	const { id } = userInfo||{};
	const [friendList, setFriendList] = useState([]);

	console.log("_user", userInfo);

	useEffect(()=>{
		localStorage.removeItem("chatObject");
	},[])

	useEffect(() => {
		socketInstance.emit("saveSocketId", {
			userId: id ,
		});

		socketInstance.emit("allSocketEvent", {
			eventType: "listUser",
			userId: id,
			pageNo: 1,
			limit: 100,
		});

		socketInstance.on("listUser", (response) => {
			console.log("listUSer", response?.data);
			if (response?.status) {
				setFriendList([...response?.data?.data]);
			}
		});
	}, [socketInstance]);

	

	return (
		<Container fluid className="alignCentre p-0">
			<Header heading="Friend List" />
			<Row className="friendList-wrapper m-0">
				<Row className="m-0 user-welcomeMsg">
					Welcome {userInfo?.email} {userInfo?.mobileNo}
				</Row>
				<Row className="m-0">
					{friendList.map((friendData) => (
						<UserCard friendData={friendData} />
					))}
				</Row>
			</Row>
			<Footer />
		</Container>
	);
}
