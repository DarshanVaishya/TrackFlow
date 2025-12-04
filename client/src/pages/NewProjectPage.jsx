import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import TextInput from "../components/utils/TextInput";
import SelectInput from "../components/utils/SelectInput";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import API_BASE_URL from "../api";
import Spinner from "../components/utils/Spinner";

export default function NewProjectPage() {
	const navigate = useNavigate()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		axios.post(`${API_BASE_URL}/projects`, {
			title,
			description,
		}).then(() => {
			navigate(`/projects`)
		}).finally(() => setLoading(false))
	}

	return (
		<Container>
			<Navbar>
				<BlackButton onClick={() => navigate("/projects")}>← Back to Projects</BlackButton>
			</Navbar>
			<div className="h-screen flex justify-center items-center" onSubmit={handleSubmit}>
				<form className="p-5 border border-neutral-500/50 rounded w-xl">
					<h1 className="text-3xl font-bold mb-5 text-center">New Project</h1>
					<div className="flex flex-col">
						<TextInput label="Title" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} />

						<label className="text-white self-baseline font-bold mb-2" >Description</label>
						<textarea placeholder="Detailed description of the project" value={description} onChange={e => setDescription(e.target.value)} className="px-3 py-2 min-h-32 mb-4 border border-neutral-500/50 rounded" />
						<BlueButton disabled={loading} type="submit">{loading ? <Spinner size="h-5 w-5" color="border-white" /> : "Create Project"}</BlueButton>
					</div>
				</form>
			</div>
		</Container>
	)
}
