import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react"; import { useNavigate, useParams } from "react-router-dom";
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

	const { project_id } = useParams()
	const [project, setProject] = useState(null)
	const [bugs, setBugs] = useState(null)
	const [filtBugs, setFiltBugs] = useState(null)
	const [search, setSearch] = useState("")
	const [status, setStatus] = useState("all")
	const [priority, setPriority] = useState("all")
	const [error, setError] = useState(null)


	useEffect(() => {
		axios.get(`http://localhost:8000/projects/${project_id}`).then(response => {
			const { data } = response.data
			setProject(data)
			setBugs(data.bugs)
			setFiltBugs(data.bugs)
		}).catch(response => {
			const data = response.response.data
			setError(data.message)
		})
	}, [project_id])

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

	if (!project)
		return <Spinner />

	return (
		<>
			<Container>
				<Navbar>
					<BlackButton onClick={() => navigate("/projects")}>← Back to Projects</BlackButton>
				</Navbar>

				<div className="pt-18 flex flex-col gap-5">
					<div className="flex justify-between items-center">
						<h1 className="text-4xl font-bold pt-5 capitalize">Project: {project.title}</h1>
						<BlueButton className="flex items-center mt-5" onClick={() => navigate(`/projects/${project_id}/bugs/new`)} >
							<Plus />
							New Bug</BlueButton>
					</div>
					<span className="text-neutral-500 pb-5">Description: {project.description}</span>
				</div>

				<div className="mb-5 p-5 bg-neutral-900/50 border border-neutral-500/50 rounded">
					<div className="flex gap-2 items-center mb-5">
						<Filter className="h-4 w-4" />
						<p>Filters</p>
					</div>

					<div className="flex flex-col gap-3 items-center sm:flex-row">
						<input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="px-2 py-1 outline-none border border-neutral-500/50 rounded" />

						<select className="border border-neutral-500/50 p-2 px-3 rounded" label="status" value={status} onChange={e => setStatus(e.target.value)}>
							<option value="all">All Statuses</option>
							<option value="todo">Todo</option>
							<option value="in_progress">In Progress</option>
							<option value="in_review">In Review</option>
							<option value="done">Done</option>
						</select>
						<select className="border border-neutral-500/50 p-2 px-3 rounded" label="priority" value={priority} onChange={e => setPriority(e.target.value)}>
							<option value="all">All Priorities</option>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
							<option value="top">Top</option>
						</select>
					</div>
				</div>

				{error && <div className="flex items-center justify-center"><p className="text-red-500 bg-red-800/30 mt-10 px-10 py-5 inline-block rounded-xl">{error}</p></div>}
				{!error && (bugs ?
					<div className="flex flex-col gap-5 pb-10">
						<BugsCard bugs={filtBugs} />
					</div>
					: <Spinner />
				)}

				{bugs.length == 0 && <h1 className="text-3xl text-center">Create bugs to start tracking them!</h1>}

			</Container>
		</>
	)
}
