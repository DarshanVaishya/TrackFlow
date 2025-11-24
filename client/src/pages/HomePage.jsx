import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { CodeXml, Github, TextAlignStart } from "lucide-react"

export default function HomePage() {
	// TODO: Add rest of the sections
	return (
		<Container>
			<Navbar>
			</Navbar>

			{/* Hero section */}
			<div className="min-h-screen flex flex-col items-center justify-center text-center gap-5 lg:px-36">

				<span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-900/30">
					<CodeXml className="text-blue-500 h-4 w-4 mr-1" />
					<span className="text-blue-400 text-sm font-medium">Open Source &amp; Self-Hosted</span>
				</span>

				<h1 className="text-6xl sm:text-8xl font-bold ">Bug tracking that respects your <span className="text-blue-500">privacy</span></h1>

				<p className="text-xl text-neutral-500 px-20">TrackFlow is a powerful, self-hosted bug tracking system built with FastAPI and Postgres. Deploy it on your infrastructure and keep complete control over your data.</p>

				<div className="flex justify-center items-center gap-5 pt-5">
					<BlueButton className="flex gap-3 items-center">
						<TextAlignStart className="h-5 w-5" />
						<a href="/login">Get Started</a>
					</BlueButton>
					<BlackButton className="flex gap-3 items-center">
						<Github className="h-5 w-5" />
						<a href="https://www.github.com/DarshanVaishya/TrackFlow">View on github</a>
					</BlackButton>
				</div>

			</div>
		</Container>
	)
}
