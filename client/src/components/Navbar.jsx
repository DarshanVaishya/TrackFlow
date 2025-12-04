import { useContext, useState } from "react";
import { BlackButton, BlueButton } from "./utils/Buttons";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn, LogOut, Terminal, X } from "lucide-react"

export default function Navbar({ children }) {
	const { user, setUser } = useContext(AuthContext)
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		setUser(null);
		axios.defaults.headers.common['Authorization'] = undefined;
		navigate("/login");
		setIsMenuOpen(false);
	};

	return (
		<nav className="bg-black fixed w-full z-20 top-0 left-0 py-1 border-b border-gray-700 p-2 px-12">
			<div className="flex flex-wrap items-center justify-between mx-auto p-2">
				<a href="/" className="flex items-center space-x-3">
					<Terminal className="text-blue-500" />
					<span className="text-white text-xl font-semibold">TrackFlow</span>
				</a>

				{/* Hamburger Button with rotation */}
				<button
					type="button"
					className={`md:hidden p-2 rounded-xl text-gray-400 hover:bg-gray-700/50 hover:backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 ${isMenuOpen ? 'bg-gray-800/50 backdrop-blur-sm rotate-90' : ''
						}`}
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-label="Toggle menu"
				>
					{isMenuOpen ? (
						<X className="w-6 h-6 transition-transform duration-300 rotate-180 scale-110" />
					) : (
						<svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					)}
				</button>

				{/* Mobile Menu with smooth slide-down */}
				<div className={`md:hidden w-full mt-4 md:mt-0 transition-all duration-500 ease-out overflow-hidden ${isMenuOpen
						? 'max-h-96 opacity-100 scale-100 translate-y-0 shadow-2xl'
						: 'max-h-0 opacity-0 scale-95 -translate-y-2'
					}`}>
					<div className="flex flex-col items-end gap-4 p-6 bg-neutral-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
						<div className="w-full flex flex-col items-end gap-3 mb-4">
							{children}
						</div>
						{!user ? (
							<BlueButton
								className="flex gap-3 items-center w-full justify-center px-6 py-3 text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm"
								onClick={() => {
									navigate("/login");
									setIsMenuOpen(false);
								}}
							>
								<LogIn className="h-5 w-5" /> Login
							</BlueButton>
						) : (
							<BlackButton
								className="flex gap-3 items-center w-full justify-center px-6 py-3 text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 backdrop-blur-sm"
								onClick={handleLogout}
							>
								<LogOut className="h-5 w-5" /> Log out
							</BlackButton>
						)}
					</div>
				</div>

				{/* Desktop Menu */}
				<div className="hidden w-full md:flex md:w-auto md:items-center gap-4" id="navbar-menu">
					{children}
					{!user ? (
						<BlueButton className="flex gap-2 items-center px-4 py-2" onClick={() => navigate("/login")}>
							<LogIn className="h-4 w-4" /> Login
						</BlueButton>
					) : (
						<BlackButton className="flex gap-2 items-center px-4 py-2" onClick={handleLogout}>
							<LogOut className="h-4 w-4" /> Log out
						</BlackButton>
					)}
				</div>
			</div>
		</nav>
	)
}

