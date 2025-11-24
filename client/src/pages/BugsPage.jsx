import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/utils/Container";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import axios from "axios";
import BugsCard from "../components/BugsCard";
import CountCard from "../components/utils/CountCard";
import Spinner from "../components/utils/Spinner";
import { Filter, Plus } from "lucide-react"
import SelectInput from "../components/utils/SelectInput";

export default function BugsPage() {
	const navigate = useNavigate()

	const [bugs, setBugs] = useState(null)
	const [filtBugs, setFiltBugs] = useState(null)
	const [search, setSearch] = useState("")
	const [status, setStatus] = useState("all")
	const [priority, setPriority] = useState("all")


	useEffect(() => {
		axios.get("http://localhost:8000/bugs").then(response => {
			const bugs = response.data.data
			setBugs(bugs)
			setFiltBugs(bugs)
		})
	}, [])

	useEffect(() => {
		if (!bugs) return;
		const loweredSearch = search.toLowerCase();

		let filtered = bugs.filter(bug =>
			bug.title.toLowerCase().includes(loweredSearch) ||
			bug.description?.toLowerCase().includes(loweredSearch)
		);

		if (status != "all") {
			console.log(status)
			filtered = filtered.filter(bug => bug.status === status)
		}

		if (priority != "all")
			filtered = filtered.filter(bug => bug.priority === priority)

		setFiltBugs(filtered);
	}, [search, bugs, status, priority]);

	if (!bugs)
		return <Spinner />

	return (
		<>
			<Container>
				<Navbar>
					<BlackButton onClick={() => navigate("/")}>← Back to Home</BlackButton>
				</Navbar>

				<div className="pt-18 flex flex-col gap-5">
					<div className="flex justify-between items-center">
						<h1 className="text-4xl font-bold pt-5">Bug Tracker</h1>
						<BlueButton className="flex items-center mt-5" onClick={() => navigate("/bugs/new")} >
							<Plus />
							New Bug</BlueButton>
					</div>
					<span className="text-neutral-500 pb-5">Manage and track all your bugs in one place</span>
				</div>

				<div className="mb-5 p-5 bg-neutral-900/50 border border-neutral-500/50 rounded">
					<div className="flex gap-2 items-center mb-5">
						<Filter className="h-4 w-4" />
						<p>Filters</p>
					</div>

					<div className="flex flex-col gap-3 items-center sm:flex-row">
						<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="px-2 py-1 outline-none border border-neutral-500/50 rounded" />

						<select className="border border-neutral-500/50 p-2 px-4 rounded" label="status" value={status} onChange={e => setStatus(e.target.value)}>
							<option value="all">All Statuses</option>
							<option value="todo">Todo</option>
							<option value="in_progress">In Progress</option>
							<option value="in_review">In Review</option>
							<option value="done">Done</option>
						</select>
						<select className="border border-neutral-500/50 p-2 px-4 rounded" label="priority" value={priority} onChange={e => setPriority(e.target.value)}>
							<option value="all">All Priorities</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
							<option value="top">Top</option>
						</select>
					</div>
				</div>
				<div className="flex flex-col gap-5 pb-10">
					<BugsCard bugs={filtBugs} />
				</div>

			</Container>
		</>
	)
}
