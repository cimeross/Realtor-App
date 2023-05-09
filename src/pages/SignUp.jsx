// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "./Components/OAuth";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { db, doc } from "../firebase.config";
import { serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const { name, email, password } = formData;

	const navigate = useNavigate();

	function onChange(e) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	}
	async function onSubmit(e) {
		e.preventDefault();

		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			updateProfile(auth.currentUser, {
				displayName: name,
			});
			const user = userCredential.user;
			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, "users", user.uid), formDataCopy);
			toast.success("Successfully signed up!");
			navigate("/");
		} catch (error) {
			toast.error("Something went wrong!");
		}
	}

	return (
		<section>
			<h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
			<div className="flex justify-between flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
				<div className="md:w-[67%] lg:w-[50%] py-7">
					<img
						className="w-full rounded-xl"
						src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
						alt="key"
					/>
				</div>
				<div className="w-full md:w-[67%] lg:w-[40%]">
					<form onSubmit={onSubmit}>
						<input
							className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out mb-6"
							type="text"
							id="name"
							placeholder="Full name"
							value={name}
							onChange={onChange}
						/>
						<input
							className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out mb-6"
							type="email"
							id="email"
							placeholder="Email address"
							value={email}
							onChange={onChange}
						/>
						<div className="relative mb-6">
							<input
								className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-md transition ease-in-out"
								type={showPassword ? "text" : "password"}
								id="password"
								placeholder="Password"
								value={password}
								onChange={onChange}
							/>
							{showPassword ? (
								<BsEyeSlashFill
									className="absolute right-3 top-3 text-xl text-gray-700 cursor-pointer"
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							) : (
								<BsEyeFill
									className="absolute right-3 top-3 text-xl text-gray-700 cursor-pointer"
									onClick={() => setShowPassword((prevState) => !prevState)}
								/>
							)}
						</div>
						<div className="flex items-center justify-between whitespace-nowrap text-sm sm:text-lg">
							<p className="mb-6">
								Have an account?{" "}
								<Link
									to="/sign-in"
									className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
								>
									Sign in
								</Link>
							</p>
							<p className="mb-6">
								<Link
									to="/forgot-password"
									className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out"
								>
									Forgot password?
								</Link>
							</p>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-sm font-medium uppercase text-white px-7 py-3 rounded shadow-md hover:bg-blue-600 transition duration-150 ease-in-out  hover:shadow-lg active:bg-blue-800"
						>
							Sign Up
						</button>
						<div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
							<p className="text-center font-semibold mx-4">OR</p>
						</div>
						<OAuth />
					</form>
				</div>
			</div>
		</section>
	);
};

export default SignUp;
