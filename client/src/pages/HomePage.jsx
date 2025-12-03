import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { CodeXml, Github, TextAlignStart, Lock, Server, Database, Zap, Shield } from "lucide-react"
import FeatureCard from "../components/utils/FeatureCard";
import { useNavigate } from "react-router-dom";

const features = [
	{
		"logo": <Lock className="text-blue-600" />,
		"color": "blue",
		"title": "Privacy First",
		"description": "Your data stays on your servers. No third-party access, no cloud dependencies, complete data sovereignty."
	},
	{
		"logo": <Server className="text-green-600" />,
		"color": "green",
		"title": "Self-Hosted",
		"description": "Deploy anywhere—Docker, Kubernetes, bare metal. Full control over your infrastructure and deployment."
	},
	{
		"logo": <CodeXml className="text-blue-600" />,
		"color": "blue",
		"title": "Open Source",
		"description": "Fully transparent codebase. Inspect, modify, and contribute. No vendor lock-in, ever."
	},
	{
		"logo": <Zap className="text-green-600" />,
		"color": "green",
		"title": "Lightning Fast",
		"description": "Built with FastAPI for blazing-fast performance. Optimized queries and efficient Postgres storage."
	},
	{
		"logo": <Database className="text-blue-600" />,
		"color": "blue",
		"title": "Postgres Powered",
		"description": "Reliable, battle-tested Postgres database. Robust data integrity and powerful querying capabilities."
	},
	{
		"logo": <Shield className="text-green-600" />,
		"color": "green",
		"title": "Secure by Default",
		"description": "Built-in authentication, authorization based access control, and security best practices from day one."
	},
]

export default function HomePage() {
	const navigate = useNavigate()
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

				<h1 className="text-5xl sm:text-8xl font-bold ">Bug tracking that respects your <span className="text-blue-500">privacy</span></h1>

				<p className="text-lg text-neutral-500 px-5 md:text-xl md:px-20">TrackFlow is a powerful, self-hosted bug tracking system built with FastAPI and Postgres. Deploy it on your infrastructure and keep complete control over your data.</p>

				<div className="flex justify-center items-center gap-5 pt-5">
					<BlueButton className="flex gap-3 items-center">
						<TextAlignStart className="h-5 w-5" />
						<a onClick={() => navigate("/login")}>Get Started</a>
					</BlueButton>
					<BlackButton className="flex gap-3 items-center">
						<Github className="h-5 w-5" />
						<a href="https://www.github.com/DarshanVaishya/TrackFlow">View on github</a>
					</BlackButton>
				</div>
			</div>

			<div className="text-center ">
				<h2 className="text-4xl font-bold">Built for developers, by a developer</h2>
				<p className="text-neutral-500 mx-auto mt-5 max-w-sm">Everything you need to track bugs efficiently without compromising on privacy or flexibility</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
				{features.map(feature => <FeatureCard features={feature} />)}
			</div>
		</Container>
	)
}
