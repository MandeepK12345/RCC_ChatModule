import { Row, Container } from "react-bootstrap";
import endPoint from "../../api/endPoint";
import ButtonComponent from "../../components/Button";
import postApiCall from "../../api/methods";
import { useNavigate } from "react-router-dom";
import { routesPath } from "../../Router/routes";
import "./index.css";

const inputFields = ["otp1", "otp2", "otp3", "otp4"];

const otpData = {};

export default function VerifyAccount() {
	const navigate = useNavigate();

	// const [otpData,setOtpData]=useState({otp1:'',otp2:'',otp3:'',otp4:''})
	// const handleResend = () => {
	// 	const email = localStorage.getItem("email");
	// 	console.log("handleResed");

	// 	// getApiCall(
	// 	//   endPoints.sendotp +
	// 	//     '?email=' +
	// 	//     email +
	// 	//     `&type=${type === 'FORGOT_PASSWORD' ? type : 'REGISTER'}`,
	// 	//   (s: any) => {
	// 	//     const {
	// 	//       data: { statusCode, message },
	// 	//     } = s
	// 	//     if (statusCode && statusCode === 200) {
	// 	//     //   notify(message, 'success')
	// 	//     //   setTimer(60)
	// 	//     //   startTimer()
	// 	//     }
	// 	//     // setLoad(false)
	// 	//   },
	// 	//   (e: any) => {
	// 	//     setLoad(false)
	// 	//     if (e?.data && e?.data.message) {
	// 	//       notify(e?.data.message, 'error')
	// 	//       setTimer(900)
	// 	//       startTimer()
	// 	//     }
	// 	//   }
	// 	// )
	// };

	const validateOtp = () => {
		console.log("validate otp", otpData);
		const { otp1, otp2, otp3, otp4 } = otpData;
		const code = `${otp1}${otp2}${otp3}${otp4}`;

		const payload = {
			code: parseInt(code),
			email: localStorage.getItem("email"),
		};

		postApiCall(
			endPoint.verifyViaEmail,
			payload,
			(s) => {
				const {
					data: { statusCode, data },
				} = s;
				if (data && statusCode && statusCode === 200 && data) {
					localStorage.setItem("token", data["token"]);

					alert("register successfully");
					navigate(routesPath.DASHBOARD);
				}
				localStorage.removeItem("email");
				//   setLoad(false)
			},
			(error) => {
				console.log("error");
				//   setLoad(false)
				//   if (e?.data && e?.data.message) {
				// 	notify(e?.data.message, 'error')
				//   }
			}
		);
	};

	const handleOnChange = (e, name) => {
		if (e.target.value.length > 1) {
			e.target.value = e.target.value[0];
			return;
		}
		if (e.target.value) {
			moveFocusToNextInput(name);
		}
	};

	// Function to move focus to the next input field
	const moveFocusToNextInput = (currentField) => {
		const currentIndex = inputFields.indexOf(currentField);
		if (currentIndex < inputFields.length - 1) {
			const nextField = inputFields[currentIndex + 1];
			//   const nextValue = getValues(nextField)
			const nextValue = document.getElementById(nextField)?.value;

			if (nextValue) {
				// If the next field has a value, move focus to it
				// setValue(nextField, undefined)
				let inputF = document.getElementById(nextField);
				inputF.value = undefined;
			}
			const nextFieldRef = document.getElementById(nextField);
			if (nextFieldRef) {
				nextFieldRef.focus();
			}
		}
		// else if (Object.keys(errors).length === 0) {
		else {
			// const data = {};
			inputFields.forEach((s) => {
				// data[s] = getValues(s)
				otpData[s] = document.getElementById(s)?.value;
			});
			// onSubmit(data)
			// console.log('data',data);
		}
	};

	const handleKeyDown = (e, field) => {
		if (e.key === "Backspace" && field !== "otp1") {
			const index = inputFields.indexOf(field);
			const currentEle = document.getElementById(inputFields[index]);
			if (currentEle) {
				currentEle.value = "";
				// setValue(inputFields[index], undefined);
				let inputF = document.getElementById(inputFields[index]);
				inputF.value = undefined;
			}
			document.getElementById(inputFields[index - 1])?.focus();
		}
	};

	return (
		<Container className="alignCentre">
			<h1>Verify your Account</h1>
			<p className="mt-15">
				We have just sent an OTP to your registered mobile number i.e. +91 xxxxx
				xxx66{" "}
				{/* <span>{localStorage.getItem('email')}</span> for email verification. */}
			</p>

			<Row className="inputfieldContainer mt-15">
				<input
					id="otp1"
					className="otpInput"
					type="number"
					maxlength="1"
					onChange={(e) => {
						handleOnChange(e, "otp1");
					}}
					onKeyDown={(e) => handleKeyDown(e, "otp1")}
				/>
				<input
					id="otp2"
					className="otpInput"
					type="number"
					maxlength="1"
					onChange={(e) => {
						handleOnChange(e, "otp2");
					}}
					onKeyDown={(e) => handleKeyDown(e, "otp2")}
				/>
				<input
					id="otp3"
					className="otpInput"
					type="number"
					maxlength="1"
					onChange={(e) => {
						handleOnChange(e, "otp3");
					}}
					onKeyDown={(e) => handleKeyDown(e, "otp3")}
				/>
				<input
					id="otp4"
					className="otpInput"
					type="number"
					maxlength="1"
					onChange={(e) => {
						handleOnChange(e, "otp4");
					}}
					onKeyDown={(e) => handleKeyDown(e, "otp4")}
				/>
			</Row>

			{/* <Row className="signupLink mt-15">
				Didn’t receive the code?{" "}
				<span className="resendLink" onClick={handleResend}>
					Resend
				</span>
			</Row> */}

			<Row className="mt-15">
				<ButtonComponent label="VERIFY OTP" btnHandler={validateOtp} />
			</Row>
		</Container>
	);
}
