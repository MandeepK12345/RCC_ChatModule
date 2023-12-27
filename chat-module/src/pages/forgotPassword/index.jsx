import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import { emailPattern } from "../../utils/common";
import TextMsg from "../../constants/textMessages";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {postApiCall} from "../../api/methods";
import endPoint from "../../api/endPoint";
import { routesPath } from "../../router/routes";
import "./index.css";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [errors, setErrors] = React.useState({});
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { value } = e?.target;
		setEmail(value);
		setErrors({});
	};
	const submitHandler = (event) => {
		event.preventDefault();
		const errors = {};
		if (!email) {
			errors.email = TextMsg.ForogtPassword.emailRequired;
		} else if (!email.match(emailPattern)) {
			errors.email = TextMsg.ForogtPassword.validEmail;
		}
		setErrors({ ...errors });
		if (!Object.keys(errors).length) {
			postApiCall(
				endPoint.forgotPassword,
				{ email },
				(response) => {
					if (response?.data.httpCode === 200) {
						toast.success(response.data.message);
						navigate(routesPath.VERIFY, {state:{
							forgotPasswordEmail: email,
						}});
					}
				},
				(error) => {
					const {
						response: {
							data: { message },
						},
					} = error;
					toast.error(message);
				}
			);
		}
	};

	return (
		<Container className="login-wrapper mt-4">
			<Form>
				<Row className="forgotPassword-wrapper__label mb-4">
					Forgot Password ?
				</Row>
				<Row>
					<InputComponent
						type="text"
						label="Email"
						placeholder="Enter your Email"
						name="email"
						onChange={handleInputChange}
						value={email}
						error={errors.email}
					/>
				</Row>
				<Row className="mt5">
					<ButtonComponent label="Send OTP" btnHandler={submitHandler} />
				</Row>
			</Form>
		</Container>
	);
}

export default ForgotPassword;
