import { useContext } from "react";
import { BlackButton, BlueButton } from "./utils/Buttons";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn, LogOut, Terminal } from "lucide-react"

export default function Navbar({ children }) {
	const { user, setUser } = useContext(AuthContext)
	const navigate = useNavigate();


	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		setUser(null);
		axios.defaults.headers.common['Authorization'] = undefined;
		navigate("/login");
	};

	return (
		<nav className="bg-black fixed w-full z-20 top-0 left-0 py-1 border-b border-gray-700 p-2 px-12">
			<div className="flex flex-wrap items-center justify-between mx-auto p-2">
				<a href="/" className="flex items-center space-x-3">
					<Terminal className="text-blue-500" />
					<span className="text-white text-xl font-semibold">TrackFlow</span>
				</a>

				<button type="button" className="inline-flex items-center p-2 w-9 h-9 justify-center text-gray-400 rounded-md md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
					<span className="sr-only">Open main menu</span>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>

				<div className="hidden w-full md:flex md:w-auto md:items-center gap-4" id="navbar-menu">
					{children}
					{!user ? <BlueButton className="flex gap-2 items-center" onClick={() => navigate("/login")}><LogIn className="h-4 w-4" />Login</BlueButton> : <BlackButton className="flex gap-2 items-center" onClick={handleLogout}><LogOut className="h-4 w-4" />Log out</BlackButton>}
				</div>
			</div>
		</nav>
	)
}
// <ul class="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-white font-medium">
// 	<a href="/bugs">
// 		<BlueButton>Get Started</BlueButton>
// 	</a>
// </ul>
