import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import TextMsg from "../../constants/textMessages";
import { useLocation, useNavigate } from "react-router-dom";
import {putApiCall} from "../../api/methods";
import endPoint from "../../api/endPoint";
import { routesPath } from "../../router/routes";
import {
	passwordPattern,
} from "../../utils/common";
import Images from "../../utils/images";
import "./index.css";

function ResetPassword() {
	
	const[resetPasswordData, setResetPasswordData]=useState({});
	const [errors, setErrors] = React.useState({});
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const navigate = useNavigate();
	const location= useLocation();

	const handleInputChange = (e) => {
		const { name,value} = e?.target;
		setResetPasswordData({...resetPasswordData,[name]:value})
		setErrors({});
	};

	const submitHandler=(event)=>{
	    event.preventDefault();
	    const errors = {};
	    const {password,confirmPassword} = resetPasswordData;
		const resetEmail = location?.state?.resetEmail;

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

		if (password !== confirmPassword) {
			errors.confirmPassword = "confirm password should be same";
		}

	    setErrors({ ...errors });
	    const payloadGenerateOtp = {
			email:resetEmail,
			newPassword:password,
			confirmPassword:confirmPassword
		
		};
	    putApiCall(
	        endPoint.resetPassword,
	        payloadGenerateOtp,
	        (response) => {
	            if (response?.data.httpCode === 200) {
	                toast.success(response.data.message);
	                navigate(routesPath.LOGIN);
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

	return (
		<Container className="login-wrapper mt-4">
			<Form>
				<Row className="login-wrapper__passwordField">
					<InputComponent
						type="password"
						label="Create Password"
						name="password"
						placeholder="Enter your new Password"
						onChange={handleInputChange}
						value={resetPasswordData.password}
						error={errors.password}
					/>
					<img
						src={Images.VisibilityIcon}
						className="login-wrapper__eyeImage"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						alt="eyeImage"
					/>
				</Row>
				<Row className="login-wrapper__passwordField">
					<InputComponent
						type={showConfirmPassword ? "text" : "password"}
						label="Confirm Password"
						name="confirmPassword"
						placeholder="Confirm your new Password"
					    onChange={handleInputChange}
						value={resetPasswordData.confirmPassword}
						error={errors.confirmPassword}
					/>
					<img
						src={Images.VisibilityIcon}
						className="login-wrapper__eyeImage"
						onClick={() => setShowConfirmPassword(!showConfirmPassword)}
						alt="eyeImage"
					/>
				</Row>

				<Row className="mt5">
					<ButtonComponent
						label="Submit"
						btnHandler={submitHandler}
						// disable={disableSubmitButton}
					/>
				</Row>
			</Form>
		</Container>
	);
}

export default ResetPassword;
