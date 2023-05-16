// eslint-disable-next-line no-unused-vars
import React from "react";
import spinner from "../../assets/svg/spinner.svg";

const Spinner = () => {
	return (
		<div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 top-0 bottom-0 z-50">
			<div>
				<img src={spinner} alt="Loading..." className="h-32" />
			</div>
		</div>
	);
};

export default Spinner;
