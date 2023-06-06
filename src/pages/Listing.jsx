import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db, doc } from "../firebase.config";
import { getDoc } from "firebase/firestore";
import Spinner from "./Components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
} from "swiper";
import "swiper/css/bundle";
import { BsShareFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import Contact from "./Components/Contact";

const Listing = () => {
	const params = useParams();
	const [listing, setLisitng] = useState(null);
	const [loading, setLoading] = useState(true);
	const [shareLinkCopied, setShareLinkCopied] = useState(false);
	const [contactLandLord, setContactLandLord] = useState(false);

	const auth = getAuth();

	SwiperCore.use([Autoplay, Navigation, Pagination]);
	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setLisitng(docSnap.data());
				setLoading(false);
			}
		};
		fetchListing();
	}, [params.listingId]);
	if (loading) {
		return <Spinner />;
	}

	return (
		<main>
			<Swiper
				slidesPerView={1}
				navigation
				//pagination={{ type: "progressbar" }}
				effect="fade"
				modules={[EffectFade]}
				//autoplay={{ delay: 9000 }}
			>
				{listing.imgUrls.map((url, index) => (
					<SwiperSlide key={index}>
						<div
							className="relative w-full overflow-hidden h-[350px]"
							style={{
								background: `url(${listing.imgUrls[index]}) center no-repeat`,
								backgroundSize: "cover",
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>
			<div
				className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
				onClick={() => {
					navigator.clipboard.writeText(window.location.href);
					setShareLinkCopied(true);
					setTimeout(() => {
						setShareLinkCopied(false);
					}, 2000);
				}}
			>
				<BsShareFill className="text-lg text-slate-500" />
			</div>
			{shareLinkCopied && (
				<p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-1">
					Link copied!
				</p>
			)}
			<div className="m-4 lg:mx-auto p-4 flex flex-col md:flex-row max-w-6xl  shadow-md bg-white lg:space-x-5">
				<div className="w-full  lg:h-[450px]">
					<p className="text-xl md:text-2xl font-bold mb-3 text-blue-900">
						{listing.name} - ${" "}
						{listing.offer
							? listing.discountedPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							: listing.regularPrice
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						{listing.type === "rent" ? " / month" : ""}
					</p>
					<p className="flex items-center mt-6 mb-3 font-semibold text-sm md:text-base">
						<ImLocation2 className="text-green-700 mr-1" />
						{listing.address}
					</p>
					<div className="flex justify-start items-center space-x-4 w-[85%]">
						<p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
							{listing.type === "rent" ? "Rent" : "Sale"}
						</p>
						{listing.offer && (
							<p className="w-full max-w-[250px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
								${+listing.regularPrice - +listing.discountedPrice} discount
							</p>
						)}
					</div>
					<p className="mt-3 mb-3">
						<span className="font-semibold">Description - </span>
						{listing.description}
					</p>
					<ul className="flex items-center space-x-2 lg:space-x-10 text-xs md:text-sm font-semibold text-slate-800 mb-6">
						<li className="flex items-center">
							<FaBed className="mr-1 text-base md:text-lg whitespace-nowrap" />
							{+listing.bedrooms > 1 ? `${+listing.bedrooms} Beds` : "1 Bed"}
						</li>
						<li className="flex items-center">
							<FaBath className="mr-1 text-base md:text-lg whitespace-nowrap" />
							{+listing.bathrooms > 1
								? `${+listing.bathrooms} Baths`
								: "1 Bath"}
						</li>
						<li className="flex items-center">
							<FaParking className="mr-1 text-base md:text-lg whitespace-nowrap" />
							{listing.parking ? "Parking Spot" : "No Parking"}
						</li>
						<li className="flex items-center">
							<FaChair className="mr-1 text-base md:text-lg whitespace-nowrap" />
							{listing.furnished ? "Furnished" : "Not furnished"}
						</li>
					</ul>
					{listing.userRef !== auth.currentUser?.uid && !contactLandLord && (
						<div className="mt-6">
							<button
								className="px-7 py-3 mb-2 bg-blue-600 text-white font-medium text-sm uppercase w-full rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg text-center transition duration-150 ease-in-out"
								onClick={() => setContactLandLord(false)}
							>
								Contact Landlord
							</button>
						</div>
					)}
					{contactLandLord && (
						<Contact userRef={listing.userRef} listing={listing} />
					)}
				</div>
				<div className="w-full  h-full lg:h-[400px] overflow-x-hidden">
					<Swiper
						slidesPerView={1}
						navigation
						pagination={{ type: "progressbar" }}
						effect="fade"
						modules={[EffectFade]}
						autoplay={{ delay: 3000 }}
					>
						{listing.imgUrls.map((url, index) => (
							<SwiperSlide key={index}>
								<div
									className="relative w-full overflow-hidden h-[350px]"
									style={{
										background: `url(${listing.imgUrls[index]}) center no-repeat`,
										backgroundSize: "cover",
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</main>
	);
};

export default Listing;
