/* eslint-disable react/prop-types */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Contact = ({ userRef, listing }) => {
	const [landLord, setlandlord] = useState(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const getLandlord = async () => {
			const docRef = doc(db, "users", userRef);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setlandlord(docSnap.data());
			} else {
				toast.error("Could not get lanlord data");
			}
		};
		getLandlord();
	}, [userRef]);

	const onChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<>
			{landLord !== null && (
				<div>
					<p>
						Contact {landLord.name} for the {listing.name.toLowerCase()}
					</p>
					<div className="flex flex-col w-full mt-3 mb-5">
						<textarea
							name="message"
							id="message"
							value={message}
							rows="2"
							onChange={onChange}
							className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
						></textarea>
					</div>
					<a
						href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}
					>
						<button
							className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
							type="button"
						>
							Send Message
						</button>
					</a>
				</div>
			)}
		</>
	);
};

export default Contact;
