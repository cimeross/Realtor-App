// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
	const [pageState, setPageState] = useState("Sign in");
	const location = useLocation();
	const navigate = useNavigate();

	const auth = getAuth();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setPageState("Profile");
			} else {
				setPageState("Sign in");
			}
		});
	}, [auth]);

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
		return false;
	};
	return (
		<div className="bg-white border-b shadow-sm sticky top-0 z-40">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div
					className="flex justify-between items-center cursor-pointer"
					onClick={() => navigate("/")}
				>
					<img
						src="/favicon.ico"
						alt="logo"
						className="p-2 max-w-[45px] max-h-[45px] "
					/>
					<h1
						className="text-gray-900 hidden font-semibold text-xl md:text-lg md:block lg:text-2xl"
						onClick={() => navigate("/")}
					>
						Horizon Properties
					</h1>
				</div>
				<div>
					<ul className="flex space-x-6 md:space-x-10">
						<li
							className={`cursor-pointer py-3 text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/") && "text-red-600 border-b-red-600"
							}`}
							onClick={() => navigate("/")}
						>
							Home
						</li>
						<li
							className={`cursor-pointer py-3 text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/offers") && "text-red-600 border-b-red-600"
							}`}
							onClick={() => navigate("/offers")}
						>
							Offers
						</li>
						<li
							className={`cursor-pointer py-3 text-base font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
								"text-red-600 border-b-red-600"
							}`}
							onClick={() => navigate("/profile")}
						>
							{pageState}
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
};

export default Header;
