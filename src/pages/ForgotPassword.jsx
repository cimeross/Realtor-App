// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "./Components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");

	const onChange = (e) => {
		setEmail(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success("Reset email was sent");
		} catch (error) {
			toast.error("Could not send reset password!");
		}
	};

	return (
		<section>
			<h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
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
							type="email"
							id="email"
							placeholder="Email address"
							value={email}
							onChange={onChange}
						/>

						<div className="flex items-center justify-between whitespace-nowrap text-sm sm:text-lg">
							<p className="mb-6">
								Don&apos;t have an account?{" "}
								<Link
									to="/sign-up"
									className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
								>
									Register
								</Link>
							</p>
							<p className="mb-6">
								<Link
									to="/sign-in"
									className="text-blue-500 hover:text-blue-800 transition duration-200 ease-in-out"
								>
									Sign in instead
								</Link>
							</p>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-sm font-medium uppercase text-white px-7 py-3 rounded shadow-md hover:bg-blue-600 transition duration-150 ease-in-out  hover:shadow-lg active:bg-blue-800"
						>
							Send reset password
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

export default ForgotPassword;
