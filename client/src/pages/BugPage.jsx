import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import Status from "../components/utils/status";
import Priority from "../components/utils/Priority";
import { FormatDate } from "../components/BugsCard";

export default function BugPage() {
	const navigate = useNavigate()
	const { bug_id } = useParams();
	const [bug, setBug] = useState(null)
	const [comments, setComments] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		axios.get(`http://localhost:8000/bugs/${bug_id}`)
			.then(response => setBug(response.data.data))
			.catch(e => {
				const data = e.response.data
				setError(data.message)
			})

		axios.get(`http://localhost:8000/bugs/${bug_id}/comments`)
			.then(response => setComments(response.data.data))
			.catch(e => {
				const data = e.response.data
				setError(data.message)
			})
	}, [bug_id])

	return (
		<Container>
			<Navbar>
				<BlackButton onClick={() => navigate("/bugs")}>← Back to Bugs</BlackButton>
			</Navbar>

			<div className="pt-16">
				{error && <div className="flex items-center justify-center"><p className="text-red-500 bg-red-800/30 mt-10 px-10 py-5 inline-block rounded-xl">{error}</p></div>}

				{!error && bug &&
					<>
						<div className="flex gap-5 pt-10">
							<span className="text-neutral-500 text-lg">#{bug.id}</span>
							<div className="flex-1">
								<div className="flex justify-between">
									<h1 className="text-3xl">{bug.title}</h1>
									<BlueButton>Edit Bug</BlueButton>
								</div>

								<div className="flex gap-5 mt-5">
									<Status status={bug.status} />
									<Priority priority={bug.priority} />
								</div>
							</div>
						</div>

						<div className="border-1 mt-5 border-neutral-500/50 rounded p-5">
							<h1 className="font-bold">Description</h1>
							<p className="whitespace-pre-line mt-5 mb-10 text-neutral-400">{bug.description}</p>
							<hr className="my-4 border-neutral-700" />
							<div className="flex justify-between">
								<span><span className="text-neutral-500">Created:</span> {FormatDate(bug.created_at, true)}</span>
								<span><span className="text-neutral-500">Updated:</span> {FormatDate(bug.updated_at, true)}</span>
							</div>
						</div>
					</>}
			</div>

		</Container>
	)
}
