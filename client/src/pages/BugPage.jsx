import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton, RedButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Status from "../components/utils/Status";
import Priority from "../components/utils/Priority";
import { FormatDate } from "../components/BugsCard";
import CommentsSection from "../components/CommentsSection";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/utils/Spinner";
import { UserPen, ClockPlus, CalendarClock, UserPlus, History } from "lucide-react"
import NameCard from "../components/utils/NameCard";
import TextWithBugLinks from "../components/utils/TextWithBugLinks";
import API_BASE_URL from "../api";

export default function BugPage() {
	const navigate = useNavigate()
	const { bug_id, project_id } = useParams();
	const { user } = useContext(AuthContext)
	const [bug, setBug] = useState(null)
	const [comments, setComments] = useState(null)
	const [error, setError] = useState(null)
	const [creator, setCreator] = useState(null)
	const [showModal, setShowModal] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [loadingUsers, setLoadingUsers] = useState(false);

	const isOwner = useMemo(() => {
		if (!bug || !user) return
		return user.id === bug.created_by_id
	}, [bug, user])

	const canEdit = useMemo(() => {
		if (!bug || !user) return
		return bug.assignees.some(u => u.id === user.id)
	}, [bug, user])

	useEffect(() => {
		if (showModal) {
			setLoadingUsers(true);
			axios.get(`${API_BASE_URL}/projects/${project_id}/users`)
				.then(response => {
					setAllUsers(response.data.data);
					setLoadingUsers(false);
				})
				.catch(() => setLoadingUsers(false));
		}
	}, [showModal, project_id]);

	useEffect(() => {
		axios.get(`${API_BASE_URL}/bugs/${bug_id}`)
			.then(response => {
				const bug = response.data.data
				setBug(bug)
				axios.get(`${API_BASE_URL}/users/${bug.created_by_id}`).then(response => {
					setCreator(response.data.data)
				})
			})
			.catch(e => {
				const data = e.response.data
				setError(data.message)
			})

		axios.get(`${API_BASE_URL}/bugs/${bug_id}/comments`)
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

		axios.delete(`${API_BASE_URL}/bugs/${bug_id}`).then(
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

				{!bug && <Spinner />}

				{!error && bug &&
					<>
						<div className="flex gap-5 pt-10">
							<span className="text-neutral-500 text-lg">#{bug.id}</span>
							<div className="flex-1">
								<div className="flex flex-col shrink-0 items-start md:flex-row gap-2">
									{isOwner && <BlackButton onClick={() => setShowModal(true)} className="flex gap-1 shrink-0 items-center">
										<UserPlus className="h-4 w-4" />
										Assign Users
									</BlackButton>}
									{(isOwner || canEdit) && <BlueButton className="shrink-0" onClick={() => navigate(`/projects/${project_id}/bugs/${bug.id}/edit`)}>Edit Bug</BlueButton>}
									{isOwner && <RedButton className="shrink-0" onClick={handleDelete}>Delete Bug</RedButton>}
									<BlackButton className="flex gap-1 shrink-0 items-center mb-2" onClick={() => navigate(`/projects/${project_id}/bugs/${bug.id}/history`)}>
										<History className="h-5 w-5" />
										History
									</BlackButton>
								</div>
								<div className="flex flex-col justify-between sm:flex-row">
									<h1 className="text-3xl">{bug.title}</h1>
								</div>

								<div className="flex gap-5 mt-5">
									<Status status={bug.status} />
									<Priority priority={bug.priority} />
								</div>
							</div>
						</div>


						<div className="border mt-5 border-neutral-500/50 rounded p-5">
							<h1 className="font-bold">Description</h1>
							<p className="whitespace-pre-line mt-5 mb-10 text-neutral-400">
								<TextWithBugLinks text={bug.description} projectId={project_id} />
							</p>
							<hr className="my-4 border-neutral-700" />
							<div>
								<p>Assigned To</p>
								<div className="flex gap-5 mt-2 flex-wrap">
									{bug.assignees.length == 0 ? <span className="font-bold">None</span> :
										bug.assignees.map(user => <NameCard key={user.id} email={user.email} />)}
								</div>
							</div>
							<div className="flex flex-col gap-2 justify-between md:flex-row mt-5">
								<span className="flex"><span className="text-neutral-500 mr-2"><UserPen /></span>
									{creator ?
										creator.email
										:
										<Spinner size="w-6 h-6" />
									}
								</span>
								<span className="flex"><span className="text-neutral-500 mr-2"><ClockPlus /></span> {FormatDate(bug.created_at, true)}</span>
								<span className="flex"><span className="text-neutral-500 mr-2"><CalendarClock /></span> {FormatDate(bug.updated_at, true)}</span>
							</div>
						</div>

						<CommentsSection project_id={project_id} setComments={setComments} bugId={bug_id} comments={comments} />
					</>}
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black/70 flex justify-center items-center">
					<div className="bg-neutral-900 p-6 rounded max-w-md w-full">
						<h3 className="text-xl font-bold mb-5 text-white">Add Member to Project</h3>
						{loadingUsers ? (
							<Spinner />
						) : (
							<form className="max-h-60 overflow-auto">
								{allUsers.map(user => {
									const isChecked = bug.assignees.some(m => m.id === user.id);

									const handleCheckboxChange = async (event) => {
										{/* console.log("ASSIGN/UNASSIGN ", user) */ }
										try {
											let response;
											if (event.target.checked) {
												response = await axios.post(`${API_BASE_URL}/bugs/${bug.id}/assign/${user.id}`);
											} else {
												response = await axios.delete(`${API_BASE_URL}/bugs/${bug.id}/unassign/${user.id}`);
											}
											// Update the local bug state with the response data
											setBug(response.data.data);
										} catch (error) {
											console.error('Error updating assignment:', error);
										}
									};

									return (
										<label
											key={user.id}
											className="flex justify-between items-center py-2 border-b border-neutral-700 cursor-pointer"
										>
											<span>{user.email}</span>
											<label className="flex items-center cursor-pointer mr-3">
												<input
													type="checkbox"
													checked={isChecked}
													onChange={handleCheckboxChange}
													className="peer hidden"
												/>
												<span className="w-5 h-5 inline-block border-2 border-gray-500 rounded-sm 
                   peer-checked:bg-blue-500 "></span>
											</label>

										</label>
									);
								})}
							</form>
						)}
						<RedButton
							className="mt-5"
							onClick={() => setShowModal(false)}
						>
							Close
						</RedButton>
					</div>
				</div>
			)}
		</Container>
	)
}
