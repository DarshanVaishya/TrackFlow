import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import TextInput from "../components/utils/TextInput";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Spinner from "../components/utils/Spinner";
import { Pencil, Trash2 } from "lucide-react"
import API_BASE_URL from "../api";

export default function EditProjectPage() {
	const navigate = useNavigate()
	const { project_id } = useParams()
	const [project, setProject] = useState(null)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [showModal, setShowModal] = useState(false);
	const [allUsers, setAllUsers] = useState([]);
	const [loadingUsers, setLoadingUsers] = useState(false);
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (showModal) {
			setLoadingUsers(true);
			axios.get(`${API_BASE_URL}/users`)
				.then(response => {
					setAllUsers(response.data.data); // use the data array
					setLoadingUsers(false);
				})
				.catch(() => setLoadingUsers(false));
		}
	}, [showModal]);

	const addMember = (userId) => {
		axios.post(`${API_BASE_URL}/projects/${project_id}/members/add/${userId}`)
			.then((response) => {
				setProject(response.data.data)
				setShowModal(false);
			});
	};

	const removeMember = (userId) => {
		axios.delete(`${API_BASE_URL}/projects/${project_id}/members/remove/${userId}`)
			.then(response => {
				setProject(response.data.data)
			})
	}


	useEffect(() => {
		axios.get(`${API_BASE_URL}/projects/${project_id}`).then(response => {
			const { data } = response.data
			setProject(data)
			setTitle(data.title)
			setDescription(data.description)
		})
	}, [project_id])

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		axios.put(`${API_BASE_URL}/projects/${project_id}`, {
			title,
			description,
		}).then(() => {
			navigate(`/projects`)
		}).finally(() => setLoading(false))
	}

	const handleAddMembers = (e) => {
		e.preventDefault()
		setShowModal(true)
	}


	if (!project)
		return <Spinner />

	return (
		<Container>
			<Navbar>
				<BlackButton onClick={() => navigate("/projects")}>← Back to Projects</BlackButton>
			</Navbar>
			<div className="min-h-screen flex justify-center items-center mt-16" onSubmit={handleSubmit}>
				<form className="p-5 border border-neutral-500/50 rounded min-w-xl">
					<h1 className="text-3xl font-bold mb-5 text-center">Edit Project</h1>
					<div className="flex flex-col">
						<TextInput disabled={loading} label="Title" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} />

						<label className="text-white self-baseline font-bold mb-2" >Description</label>
						<textarea disabled={loading} placeholder="Detailed description of the project" value={description} onChange={e => setDescription(e.target.value)} className="px-3 py-2 min-h-32 mb-4 border border-neutral-500/50 rounded" />

						<div>
							<div className="flex justify-between items-center mb-2">
								<h2 className="text-2xl ">Members</h2>
								<BlueButton onClick={handleAddMembers} size="py-1 px-2">Add Members</BlueButton>
							</div>
							{project.members.map(user =>
								<div key={user.id} className="py-1 flex justify-between items-center">
									<span>{user.email}</span>
									{project.created_by_id == user.id ? "" :
										<div className="p-2 bg-red-500/50 rounded">
											<Trash2 onClick={() => removeMember(user.id)} className="h-5 w-5" />
										</div>}
								</div>
							)}
						</div>
						<BlueButton disabled={loading} className="mt-5" type="submit">{loading ? <Spinner size="h-5 w-5" color="border-white" /> : "Update Project"}</BlueButton>
					</div>
				</form>
			</div>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-black/70 flex justify-center items-center">
					<div className="bg-neutral-900 p-6 rounded max-w-md w-full">
						<h3 className="text-xl font-bold mb-5 text-white">Add Member to Project</h3>
						{loadingUsers ? (
							<Spinner />
						) : (
							<ul className="max-h-60 overflow-auto">
								{allUsers
									.filter(user => !project.members.some(m => m.id === user.id))
									.map(user => (
										<li key={user.id} className="flex justify-between items-center py-2 border-b border-neutral-700">
											<span>{user.email}</span>
											<button
												className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
												onClick={() => addMember(user.id)}
											>
												Add
											</button>
										</li>
									))}
							</ul>
						)}
						<button
							className="mt-4 px-4 py-2 bg-red-600 rounded text-white"
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</Container>
	)
}
