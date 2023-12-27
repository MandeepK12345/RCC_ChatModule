import React, { useEffect, useState } from "react";
import InputComponent from "../../components/input";
import Images from "../../utils/images";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Form, Row, Container, InputGroup } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../state";
import ButtonComponent from "../../components/button";
import { routesPath } from "../../router/routes";
import TextMsg from "../../constants/textMessages";
import {postApiCall} from "../../api/methods";
import endPoint from "../../api/endPoint";
import {
	emailPattern,
	passwordPattern,
	phonePattern,
} from "../../utils/common";
import "./index.css";

const loginToggle = [
	{ name: "Login with email", value: "1" },
	{ name: "Login with phone", value: "2" },
];

export default function Login() {
	const [showPassword, setShowPassword] = React.useState(false);
	const [dataLogin, setDataLogin] = React.useState({
		email: "",
		password: "",
	});
	const [radioValue, setRadioValue] = useState("1");
	const [errors, setErrors] = React.useState({});
	const [disableSubmitButton, setDisableSubmitButton] = React.useState(false);
	const [showPhoneField, setShowPhoneField] = React.useState(false);
	const [phoneDropDown, setPhoneDropDown] = React.useState("");
	const [countryCode, setCountryCode] = useState("+91");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	//Form input  handler to set state

	const handleInputChange = (e) => {
		const { value, name } = e?.target;
		setDataLogin({ ...dataLogin, [name]: value });
		setErrors({});
	};

	// Login handler
	const submitHandler = (event) => {
		event.preventDefault();
		const { email, password } = dataLogin;
		const errors = {};
		if (!email) {
			errors.email =
				radioValue === "1"
					? TextMsg.Login.emailRequired
					: TextMsg.Login.phoneRequired;
		}else if(radioValue==='2' && email && !email.match(phonePattern)){
			errors.email = TextMsg.Login.validMobile;
		}else if(radioValue==='1' && email && !email.match(emailPattern)){
			errors.email = TextMsg.Login.validEmail;
		}
		if (!password) {
			errors.password = TextMsg.Login.passwordUndefined;
		} else if (!password.match(passwordPattern)) {
			errors.password = TextMsg.Login.validPassword;
		}
		setErrors({ ...errors });
		if (!Object.keys(errors).length) {
			//login api call
			let payload = {
				email,
				password,
			};
			if (radioValue === "2") {
				payload = {
					countryCode: countryCode,
					phoneNo: email,
				};
			}

			postApiCall(
				endPoint.userLogin,
				payload, // Phone and password API call
				(response) => {
					if (response.status === 200) {
						const { email } = response?.data.data;
						toast.success(`${email} successfully loggedin.`);
						// dispatching an action to set userData in store
						dispatch(setUser({ ...response?.data?.data }));
						// on successful login navigting to dashboard
						navigate(routesPath.DASHBOARD);
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

	useEffect(() => {
		if (!Object.keys(errors).length) {
			setDisableSubmitButton(true);
		}
	}, [errors]);

	const showPhoneFieldHandler = () => {
		setShowPhoneField(true);
		setPhoneDropDown(dataLogin.email);
	};
	// multiple country code dropDown Handler
	const inbuiltPhoneHandler = (_value, data) => {
		setDataLogin({...dataLogin,email:_value})
		setCountryCode("+" + data.dialCode);
	};

	const toggleHandler=(value)=>{
		setShowPhoneField(false);
		setErrors({})
		setDataLogin({...dataLogin,email:''});
		setRadioValue(value);
		setCountryCode('+91');
	}

	return (
		<Container className="login-wrapper mt-4">
			<Form>
				<Row className="login-wrapper__label mb-4">Login Form</Row>
				<Row>
					<ButtonGroup className="mb-2 toggleBtn">
						{loginToggle.map((radio, idx) => (
							<ToggleButton
								key={idx}
								id={`radio-${idx}`}
								type="radio"
								variant="secondary"
								name="radio"
								value={radio.value}
								checked={radioValue === radio.value}
								onChange={(e) => toggleHandler(e.target.value)}
								className={radioValue === radio.value ? "toggle-active" : ""}
							>
								{radio.name}
							</ToggleButton>
						))}
					</ButtonGroup>

					{showPhoneField ? (
						<PhoneInput
							className="phoneInput"
							country="in"
							enableSearch={true}
							value={phoneDropDown}
							onChange={inbuiltPhoneHandler}
						/>
					) : (<>
						<InputGroup className="mb-3">
							{radioValue === "2" && (
								<InputGroup.Text
									id="basic-addon1"
									onClick={showPhoneFieldHandler}
								>
									+91
								</InputGroup.Text>
							)}
							<Form.Control
								type="text"
								placeholder={
									radioValue === "1" ? "Enter your Email" : "Enter your Phone"
								}
								name="email"
								onChange={handleInputChange}
								value={dataLogin.email}
							/>
							
						</InputGroup>
						{errors.email && (
							<Form.Text className="input-wrapper__errMsg">
								{errors.email}
							</Form.Text>
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
						alt="eyeImage"
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
				<Row className="mt-2">
					<span>Forgot your password ?</span>
					 <a
						onClick={() => navigate(routesPath.FORGOTPASSWORD)}
						href="javascript:void(0)"
						class="link-primary"
					>
						 ForgotPassword
					</a>
				</Row>
			</Form>
		</Container>
	);
}
