import { useContext } from "react";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { AuthContext } from "../contexts/AuthContext";

export default function HomePage() {
	// TODO: Add rest of the sections
	return (
		<Container>
			<Navbar>
			</Navbar>

			{/* Hero section */}
			<div className="h-screen flex flex-col items-center justify-center text-center gap-5 px-36">

				<span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-900/30">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-500">
						<polyline points="4 17 10 11 4 5"></polyline>
						<line x1="12" x2="20" y1="19" y2="19"></line>
					</svg>
					<span className="text-blue-400 text-sm font-medium">Open Source &amp; Self-Hosted</span>
				</span>

				<h1 className="text-8xl font-bold ">Bug tracking that respects your <span className="text-blue-500">privacy</span></h1>

				<p className="text-xl text-neutral-500 px-20">TrackFlow is a powerful, self-hosted bug tracking system built with FastAPI and Postgres. Deploy it on your infrastructure and keep complete control over your data.</p>

				<div className="flex justify-center items-center gap-5 pt-5">
					<BlueButton>
						<a href="/login">Get Started</a>
					</BlueButton>
					<BlackButton>
						<a href="https://www.github.com/DarshanVaishya/TrackFlow">View on github</a>
					</BlackButton>
				</div>

			</div>
		</Container>
	)
}
