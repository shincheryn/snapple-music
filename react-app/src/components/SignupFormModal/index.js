import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let errorMess = [];
		if(!validateEmail(email)) {
			errorMess.push("Email is not valid")
		}

		if(password.length < 5) {
			errorMess.push("Password must have more than 5 characters")
		}

		if(email.length < 5) {
			errorMess.push("Email must have more than 5 characters")
		}

		if(username === email) {
			errorMess.push("Email and Username cannot be the same")
		}

		setErrors(errorMess)

		if(errorMess.length === 0) {
			if (password === confirmPassword) {

				const data = await dispatch(signUp(firstName, lastName, username, email, password));

				if (data) {
					setErrors(data);
				} else {
					closeModal();
				}
			} else {
				setErrors([
					"Confirm Password field must be the same as the Password field",
				]);
			}
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="mm">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="mm">
					First Name
					<input
						type="texts"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						className="mm"
					/>
				</label>
				<label className="mm">
					Last Name
					<input
						type="texts"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						className="mm"
					/>
				</label>
				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required

					/>
				</label>
				<label>
					Username
					<input
						type="texts"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit" className="mmButton">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
