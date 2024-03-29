import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, firstName, lastName, imageURL, password));
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
	};

	return (
		<>
			<h1 className="signup-modal-header">Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<div className='login-errors-container'>
					{errors.map((error, idx) => (
						<li className='login-errors' key={idx}>{error}</li>
					))}
				</div>
				<div className="signup-modal-div">
				<label className="signup-modal-input-title">
					Email
				</label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				<label className="signup-modal-input-title">
					First Name
				</label>
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				<label className="signup-modal-input-title">
					Last Name
				</label>
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				<label className="signup-modal-input-title">
					Username
				</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<label className="signup-modal-input-title">
					Profile Picture Url
				</label>
					<input
						type="text"
						value={imageURL}
						onChange={(e) => setImageURL(e.target.value)}
					/>
				<label className="signup-modal-input-title">
					Password
				</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				<label className="signup-modal-input-title">
					Confirm Password
				</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				<button className="signup-modal-button" type="submit">Sign Up</button>
				</div>
			</form>
		</>
	);
}

export default SignupFormModal;
