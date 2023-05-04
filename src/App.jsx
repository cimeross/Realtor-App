import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Profile, Offers, SignIn, SignUp, ForgotPassword } from "./pages";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/proflie" element={<Profile />} />
					<Route path="/offers" element={<Offers />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
