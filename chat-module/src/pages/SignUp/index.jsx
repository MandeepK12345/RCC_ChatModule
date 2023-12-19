import React, { useEffect } from "react";
import InputComponent from "../../components/Input";
import Images from "../../utils/images";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Form, Row, Container, InputGroup } from "react-bootstrap";
import ButtonComponent from "../../components/Button";
import { useNavigate } from "react-router-dom";
import TextMsg from "../../constants/textMessages";
import postApiCall from "../../api/methods";
import endPoint from "../../api/endPoint";
import { routesPath } from "../../Router/routes";
import { emailPattern, passwordPattern, numRegex } from "../../utils/common";
import "./index.css";

export default function Signup() {
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const [dataLogin, setDataLogin] = React.useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = React.useState({});
	const [disableSubmitButton, setDisableSubmitButton] = React.useState(false);
	const [phonePrefix, setPhonePrefix] = React.useState(false);
	const [showPhoneField, setShowPhoneField] = React.useState(false);
	const [phoneDropDown, setPhoneDropDown] = React.useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (dataLogin?.email?.match(numRegex)) {
			setPhonePrefix(true);
		} else {
			setPhonePrefix(false);
		}
	}, [dataLogin.email]);

	const handleInputChange = (e) => {
		const { value, name } = e?.target;
		setDataLogin({ ...dataLogin, [name]: value });
		setErrors({});
	};

	const submitHandler = (event) => {
		event.preventDefault();
		const phonePattern = new RegExp("^[0-9]+$");
		const { email, password, confirmPassword } = dataLogin;
		const errors = {};
		if (phonePrefix) {
			if (!email.match(phonePattern)) {
				errors.phone = TextMsg.Login.validMobile;
			}
		} else {
			if (!email) {
				errors.email = TextMsg.Login.emailOrPhoneRequired;
			} else if (!dataLogin?.email?.match(emailPattern)) {
				errors.email = TextMsg.Login.validEmail;
			}
		}

		if (!password) {
			errors.password = TextMsg.Login.passwordUndefined;
		} else if (!password.match(passwordPattern)) {
			errors.password = TextMsg.Login.validPassword;
		}

		if (!confirmPassword) {
			errors.confirmPassword = TextMsg.Login.passwordUndefined;
		} else if (!confirmPassword.match(passwordPattern)) {
			errors.confirmPassword = TextMsg.Login.validPassword;
		}
		setErrors({ ...errors });
		if (!Object.keys(errors).length) {
			//login api call
			const payload = {
				email,
				password,
				confirmPassword,
			};
			postApiCall(
				endPoint.userSignup,
				payload,
				(response) => {
					if (response.data.httpCode === 200) {
						const { email } = response?.data?.data;
						if (email) {
							const payloadGenerateOtp = { email };
							localStorage.setItem("email", email);
							postApiCall(
								endPoint.generateOTP,
								payloadGenerateOtp,
								(response) => {
									console.log("res", response);
									if (response.data.httpCode === 200) {
										console.log("res", response);
										navigate(routesPath.VERIFY);
									}
								},
								(error) => {
									console.log("error", error);
								}
							);
						}
					}
				},
				(error) => {
					console.log("error", error);
				}
			);
		}
	};

	useEffect(() => {
		if (!Object.keys(errors).length) {
			setDisableSubmitButton(true);
		}
	}, [errors]);

	const showPhoneFieldHandler = () => {
		setShowPhoneField(true);
		setPhoneDropDown(dataLogin.email);
	};

	const inbuiltPhoneHandler = (event) => {
		console.info("event", event);
	};
	return (
		<Container className="login-wrapper mt-4">
			<Form>
				<Row className="login-wrapper__label mb-4">Register Form</Row>
				<Row>
					{showPhoneField ? (
						<PhoneInput
							className="phoneInput"
							country="in"
							enableSearch={true}
							value={phoneDropDown}
							onChange={inbuiltPhoneHandler}
						/>
					) : (
						<>
							{phonePrefix ? (
								<InputGroup className="mb-3">
									<InputGroup.Text
										id="basic-addon1"
										onClick={showPhoneFieldHandler}
									>
										+91
									</InputGroup.Text>
									<Form.Control
										type="text"
										label="Email/Phone no."
										placeholder="Enter your Email or Phone No."
										name="email"
										onChange={handleInputChange}
										value={dataLogin.email}
										error={errors.email}
									/>
								</InputGroup>
							) : (
								<InputComponent
									type="text"
									label="Email/Phone no."
									placeholder="Enter your Email or Phone No."
									name="email"
									onChange={handleInputChange}
									value={dataLogin.email}
									error={errors.email}
								/>
							)}
						</>
					)}
				</Row>
				<Row className="login-wrapper__passwordField">
					<InputComponent
						type="password"
						label="Create Password"
						name="password"
						placeholder="Enter your new Password"
						onChange={handleInputChange}
						value={dataLogin.password}
						error={errors.password}
					/>
				</Row>
				<Row className="login-wrapper__passwordField">
					<InputComponent
						type={showConfirmPassword ? "text" : "password"}
						label="Confirm Password"
						name="confirmPassword"
						placeholder="Confirm your new Password"
						onChange={handleInputChange}
						value={dataLogin.confirmPassword}
						error={errors.confirmPassword}
					/>
					<img
						src={Images.VisibilityIcon}
						className="login-wrapper__eyeImage"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
					/>
				</Row>

				<Row className="mt5">
					<ButtonComponent
						label="Signup"
						btnHandler={submitHandler}
						disable={disableSubmitButton}
					/>
				</Row>
			</Form>
		</Container>
	);
}
