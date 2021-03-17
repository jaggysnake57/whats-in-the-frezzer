import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData, selectUser } from '../../features/user/userSlice';
import { storageRef } from '../../firebase';
import './index.css';

const UserEdit = () => {
	const avatarPicker = useRef('');
	const dispatch = useDispatch();
	const { name, username, email, avatar, userDocId } = useSelector(
		selectUser
	);

	const [firstNameValue, setFirstNameValue] = useState(name.first);
	const [lastNameValue, setLastNameValue] = useState(name.last);
	const [emailValue, setEmailValue] = useState(email);
	const [avatarValue, setAvatarValue] = useState('');

	const handleFilePicker = () => {
		avatarPicker.current.click();
	};

	const handleFile = (event) => {
		console.log(event.target.files[0]);
		setAvatarValue(event.target.files[0]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const editedUserData = {
			firstName: firstNameValue,
			lastName: lastNameValue,
			email: emailValue,
		};
		let avatarFile = false;
		if (avatarValue) {
			avatarFile = avatarValue;
		}

		dispatch(editUserData(userDocId, editedUserData, avatarFile));
		setAvatarValue('');
	};

	return (
		<div className="userEdit">
			<h1>Edit your profile</h1>
			<form action="" onSubmit={(e) => handleSubmit(e)}>
				<div className="inputGroup">
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						value={firstNameValue}
						name="firstName"
						onChange={(e) => setFirstNameValue(e.target.value)}
					/>
				</div>
				<div className="inputGroup">
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						value={lastNameValue}
						name="lastName"
						onChange={(e) => setLastNameValue(e.target.value)}
					/>
				</div>
				<div className="inputGroup">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						value={emailValue}
						name="email"
						onChange={(e) => setEmailValue(e.target.value)}
					/>
				</div>
				<div className="avatarGroup">
					<img
						src={avatar}
						alt="avatar"
						onClick={() => handleFilePicker()}
					/>
					<p>Click To Edit</p>
					{avatarValue ? (
						<h3>{`1 File selected - ${avatarValue.name}`}</h3>
					) : (
						''
					)}

					<input
						type="file"
						ref={avatarPicker}
						onChange={(e) => handleFile(e)}
					/>
				</div>
				<button className="btn btnPrimary">Submit</button>
			</form>
		</div>
	);
};

export default UserEdit;
