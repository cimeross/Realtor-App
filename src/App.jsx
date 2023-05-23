import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {
	Home,
	Profile,
	Offers,
	SignIn,
	SignUp,
	ForgotPassword,
	CreateListing,
	EditListing,
} from "./pages";
import { Header, PrivateRoute } from "./pages/Components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/offers" element={<Offers />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="create-listing" element={<PrivateRoute />}>
						<Route path="/create-listing" element={<CreateListing />} />
					</Route>
					<Route path="edit-listing" element={<PrivateRoute />}>
						<Route path="/edit-listing:listingId" element={<EditListing />} />
					</Route>
				</Routes>
			</Router>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</>
	);
}

export default App;
