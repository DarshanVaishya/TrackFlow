import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/utils/Container";
import { BlueButton } from "../components/utils/Buttons";
import axios from "axios";
import Spinner from "../components/utils/Spinner";
import BugsCard from "../components/BugsCard";
import CountCard from "../components/utils/CountCard";

function getCounts(bugs) {
	if (!bugs) return { todo: 0, inProgress: 0, inReview: 0, done: 0 };

	return bugs.reduce((acc, bug) => {
		switch (bug.status.toLowerCase()) {
			case 'todo':
				acc.todo += 1;
				break;
			case 'in_progress':
				acc.inProgress += 1;
				break;
			case 'in_review':
				acc.inReview += 1;
				break;
			case 'done':
				acc.done += 1;
				break;
			default:
				break;
		}
		return acc;
	}, { todo: 0, inProgress: 0, inReview: 0, done: 0 });
}


export default function BugsPage() {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	const [bugs, setBugs] = useState(null)
	const [counts, setCounts] = useState({})

	useEffect(() => {
		if (!user)
			navigate("/login")
	}, [user, navigate])

	useEffect(() => {
		axios.get("http://localhost:8000/bugs").then(response => {
			const bugs = response.data.data
			console.log(bugs)
			setBugs(bugs)
			setCounts(getCounts(bugs))
		})
	}, [])

	return (
		<>
			<Container>
				<Navbar>
					<BlueButton>New Bug</BlueButton>
				</Navbar>

				<div className="pt-18 flex flex-col gap-5">
					<h1 className="text-4xl font-bold pt-5">Bug Tracker</h1>
					<span className="text-neutral-500">Manage and track all your bugs in one place</span>
					<div className="flex gap-5 fill pb-5">
						<CountCard count={counts.todo} label="todo" />
						<CountCard count={counts.inProgress} label="In Progress" />
						<CountCard count={counts.inReview} label="In Review" />
						<CountCard count={counts.done} label="Done" />
					</div>
				</div>

				<div className="flex flex-col gap-5 pb-10">
					<BugsCard bugs={bugs} />
				</div>

			</Container>
		</>
	)
}
