import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import Spinner from "./Components/Spinner";
import ListingItem from "./Components/ListingItem";

const Offers = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchListing, setLastFetchListing] = useState(null);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingRef = collection(db, "listings");
				const q = query(
					listingRef,
					where("offer", "==", true),
					orderBy("timestamp", "desc"),
					limit(8)
				);
				const querySnap = await getDocs(q);
				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchListing(lastVisible);
				const listings = [];
				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error("Could not fetch listing");
			}
		};
		fetchListings();
	}, []);

	const onFetchMoreListings = async () => {
		try {
			const listingRef = collection(db, "listings");
			const q = query(
				listingRef,
				where("offer", "==", true),
				orderBy("timestamp", "desc"),
				startAfter(lastFetchListing),
				limit(4)
			);
			const querySnap = await getDocs(q);
			const lastVisible = querySnap.docs[querySnap.docs.length - 1];
			setLastFetchListing(lastVisible);
			const listings = [];
			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			setListings((prevState) => [...prevState, ...listings]);
			setLoading(false);
		} catch (error) {
			toast.error("Could not fetch listing");
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-3">
			<h1 className="text-3xl text-center my-6 font-bold">Offers</h1>
			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
							{listings.map((listing) => (
								<ListingItem
									key={listing.id}
									listing={listing.data}
									id={listing.id}
								/>
							))}
						</ul>
					</main>
					{lastFetchListing && (
						<div className="flex justify-center items-center">
							<button
								onClick={onFetchMoreListings}
								className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 rounded hover:border-slate-600 transition duration-150 ease-in-out"
							>
								Load more ...
							</button>
						</div>
					)}
				</>
			) : (
				<p>There are no current offers!</p>
			)}
		</div>
	);
};

export default Offers;
