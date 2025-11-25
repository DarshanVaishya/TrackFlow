import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton, RedButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Status from "../components/utils/status";
import Priority from "../components/utils/Priority";
import { FormatDate } from "../components/BugsCard";
import CommentsSection from "../components/CommentsSection";
import { AuthContext } from "../contexts/AuthContext";

export default function BugPage() {
	const navigate = useNavigate()
	const { bug_id, project_id } = useParams();
	const { user } = useContext(AuthContext)
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

	const handleDelete = () => {
		const agree = confirm("Do you want to DELETE this bug? This action irreversible.")
		if (!agree)
			return

		axios.delete(`http://localhost:8000/bugs/${bug_id}`).then(
			() => navigate(`/projects/${project_id}/bugs`)
		)
	}

	return (
		<Container className="max-w-5xl">
			<Navbar>
				<BlackButton onClick={() => navigate(`/projects/${project_id}/bugs`)}>← Back to Bugs</BlackButton>
			</Navbar>

			<div className="pt-16">
				{error && <div className="flex items-center justify-center"><p className="text-red-500 bg-red-800/30 mt-10 px-10 py-5 inline-block rounded-xl">{error}</p></div>}

				{!error && bug &&
					<>
						<div className="flex gap-5 pt-10">
							<span className="text-neutral-500 text-lg">#{bug.id}</span>
							<div className="flex-1">
								<div className="flex flex-col justify-between sm:flex-row">
									<h1 className="text-3xl">{bug.title}</h1>
									{user.user.id === bug.created_by_id && <div className="flex gap-5 pt-5 sm:pt-0">
										<BlueButton onClick={() => navigate(`/projects/${project_id}/bugs/${bug.id}/edit`)}>Edit Bug</BlueButton>
										<RedButton onClick={handleDelete}>Delete Bug</RedButton>
									</div>}
								</div>

								<div className="flex gap-5 mt-5">
									<Status status={bug.status} />
									<Priority priority={bug.priority} />
								</div>
							</div>
						</div>

						<div className="border mt-5 border-neutral-500/50 rounded p-5">
							<h1 className="font-bold">Description</h1>
							<p className="whitespace-pre-line mt-5 mb-10 text-neutral-400">{bug.description}</p>
							<hr className="my-4 border-neutral-700" />
							<div className="flex flex-col justify-between sm:flex-row">
								<span><span className="text-neutral-500">Created:</span> {FormatDate(bug.created_at, true)}</span>
								<span><span className="text-neutral-500">Updated:</span> {FormatDate(bug.updated_at, true)}</span>
							</div>
						</div>

						<CommentsSection setComments={setComments} bugId={bug_id} comments={comments} />
					</>}
			</div>

		</Container>
	)
}
