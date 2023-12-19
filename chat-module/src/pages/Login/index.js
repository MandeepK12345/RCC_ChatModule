import React, { useEffect } from "react";
import InputComponent from "../../components/Input";
import Images from "../../utils/images";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonComponent from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { routesPath } from "../../Router/routes";
import TextMsg from "../../constants/textMessages";
import postApiCall from "../../api/methods";
import endPoint from "../../api/endPoint";
import { emailPattern, passwordPattern, numRegex } from "../../utils/common";
import "./index.css";



export default function Login() {

	const [showPassword, setShowPassword] = React.useState(false);
	const [dataLogin, setDataLogin] = React.useState({
		email: "",
		password: "",
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
		const phonePattren = new RegExp("^[0-9]+$");
		const { email, password } = dataLogin;
		const errors = {};
		if (phonePrefix) {
			if (!email.match(phonePattren)) {
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
		setErrors({ ...errors });
		if (!Object.keys(errors).length) {
			//login api call
			const payload = {
				email,
				password,
			};
			postApiCall(
				endPoint.userLogin,
				payload, // Phone and password API call
				(response) => {
					if (response.status === 200) {
						const { accessToken } = response?.data.data;
						localStorage.setItem("accessToken".accessToken);
					}
				},
				(error) => {
					console.log("error", error);
				}
			);

			// navigate(routesPath.HOMESCREEN);
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
				<Row className="login-wrapper__label mb-4">Login Form</Row>
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
						type={showPassword ? "text" : "password"}
						label="Password"
						name="password"
						placeholder="Enter your Password"
						onChange={handleInputChange}
						value={dataLogin.password}
						error={errors.password}
					/>
					<img
						src={Images.VisibilityIcon}
						className="login-wrapper__eyeImage"
						onClick={() => setShowPassword(!showPassword)}
					/>
				</Row>
				<Row className="mt5">
					<ButtonComponent
						label="Submit"
						btnHandler={submitHandler}
						disable={disableSubmitButton}
					/>
				</Row>

				<Row className="mt-2">
					<span>Don't have account yet ?</span>
					<a
						onClick={() => navigate(routesPath.SIGNUP)}
						href="javascript:void(0)"
						class="link-primary"
					>
						Signup
					</a>
				</Row>
			</Form>
		</Container>
	);
}
