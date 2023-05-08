// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const pathMatchRoute = (route) => {
		if (route === location.pathname) {
			return true;
		}
		return false;
	};
	return (
		<div className="bg-white border-b shadow-sm sticky top-0 z-50">
			<header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
				<div>
					<img
						src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
						alt="logo"
						className="h-5 cursor-pointer"
						onClick={() => navigate("/")}
					/>
				</div>
				<div>
					<ul className="flex space-x-10">
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/") && "text-red-600 border-b-red-600"
							}`}
							onClick={() => navigate("/")}
						>
							Home
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/offers") && "text-red-600 border-b-red-600"
							}`}
							onClick={() => navigate("/offers")}
						>
							Offers
						</li>
						<li
							className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
								pathMatchRoute("/sign-in") && "text-red-600 border-b-red-600"
							}`}
							onClick={() => navigate("/sign-in")}
						>
							Sign In
						</li>
					</ul>
				</div>
			</header>
		</div>
	);
};

export default Header;