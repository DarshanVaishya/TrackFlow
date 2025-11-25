import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import TextInput from "../components/utils/TextInput";
import SelectInput from "../components/utils/SelectInput";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function EditProjectPage() {
	const navigate = useNavigate()
	const { project_id } = useParams()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	useEffect(() => {
		axios.get(`http://localhost:8000/projects/${project_id}`).then(response => {
			const { data } = response.data
			setTitle(data.title)
			setDescription(data.description)
		})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.put(`http://localhost:8000/projects/${project_id}`, {
			title,
			description,
		}).then(() => {
			navigate(`/projects`)
		})
	}

	// TODO: Add option to add and remove users to the project
	return (
		<Container>
			<Navbar>
				<BlackButton onClick={() => navigate("/projects")}>← Back to Projects</BlackButton>
			</Navbar>
			<div className="h-screen flex justify-center items-center" onSubmit={handleSubmit}>
				<form className="p-5 border border-neutral-500/50 rounded min-w-xl">
					<h1 className="text-3xl font-bold mb-5 text-center">Edit Project</h1>
					<div className="flex flex-col">
						<TextInput label="Title" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} />

						<label className="text-white self-baseline font-bold mb-2" >Description</label>
						<textarea placeholder="Detailed description of the project" value={description} onChange={e => setDescription(e.target.value)} className="px-3 py-2 min-h-32 mb-4 border border-neutral-500/50 rounded" />
						<BlueButton type="submit">Update Project</BlueButton>
					</div>
				</form>
			</div>
		</Container>
	)
}
