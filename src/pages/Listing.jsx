import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db, doc } from "../firebase.config";
import { getDoc } from "firebase/firestore";
import Spinner from "./components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
} from "swiper";
import "swiper/css/bundle";

const Listing = () => {
	const params = useParams();
	const [listing, setLisitng] = useState(null);
	const [loading, setLoading] = useState(true);

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
				pagination={{ type: "progressbar" }}
				effect="fade"
				modules={[EffectFade]}
				autoplay={{ delay: 3000 }}
			>
				{listing.imgUrls.map((url, index) => (
					<SwiperSlide key={index}>
						<div
							className="relative w-full overflow-hidden h-[300px]"
							style={{
								background: `url(${listing.imgUrls[index]}) center no-repeat`,
								backgroundSize: "cover",
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>
		</main>
	);
};

export default Listing;
