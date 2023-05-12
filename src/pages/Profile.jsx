// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [changeDetail, setChangeDetail] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				//update display name in firebase auth
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				// update name in the firestore

				const docRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(docRef, {
					name,
				});
			}
			toast.success("Profile name updated!");
		} catch (error) {
			toast.error("Could not update the profile name!");
		}
	};

	return (
		<>
			<section className="max-w-6xl mx-auto flex flex-col justify-center items-center ">
				<h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
				<div className="w-full md:w-[50%] mt-6 px-3 ">
					<form>
						<input
							type="text"
							id="name"
							value={name}
							disabled={!changeDetail}
							onChange={onChange}
							className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
								changeDetail && "bg-red-100 focus:bg-red-100"
							}`}
						/>
						<input
							type="email"
							id="email"
							value={email}
							disabled
							className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
						/>
						<div className="flex justify-between whitespace-nowrap text-sm md:text-lg mb-6">
							<p className="flex items-center">
								Do you want to change your profile name?{" "}
								<span
									onClick={() => {
										changeDetail && onSubmit();
										setChangeDetail((prevState) => !prevState);
									}}
									className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
								>
									{changeDetail ? "Apply changes" : "Edit"}
								</span>
							</p>
							<p
								onClick={onLogout}
								className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
							>
								Sign out
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default Profile;
