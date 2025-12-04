import { useNavigate, useParams } from "react-router-dom";
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

export default function NewBugPage() {
	const navigate = useNavigate()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [status, setStatus] = useState("todo")
	const [priority, setPriority] = useState("low")
	const [loading, setLoading] = useState(false)
	const { project_id } = useParams()

	const handleSubmit = (e) => {
		e.preventDefault()
		setLoading(true)
		axios.post(`${API_BASE_URL}/bugs`, {
			title,
			description,
			status,
			priority,
			project_id: project_id
		}).then(() => {
			navigate(`/projects/${project_id}/bugs`)
		}).finally(() => setLoading(false))
	}

	return (
		<Container>
			<Navbar>
				<BlackButton onClick={() => navigate(`/projects/${project_id}/bugs`)}>← Back to Bugs</BlackButton>
			</Navbar>
			<div className="h-screen flex justify-center items-center" onSubmit={handleSubmit}>
				<form className="p-5 border border-neutral-500/50 rounded w-xl">
					<h1 className="text-3xl font-bold mb-5 text-center">New Bug</h1>
					<div className="flex flex-col">
						<TextInput label="Title" placeholder="A brief description of the bug" value={title} onChange={e => setTitle(e.target.value)} />

						<label className="text-white self-baseline font-bold mb-2" >Description</label>
						<textarea placeholder="Detailed description of the bug, including steps to reproduce..." value={description} onChange={e => setDescription(e.target.value)} className="px-3 py-2 min-h-32 mb-4 border border-neutral-500/50 rounded" />

						<div className="flex gap-10">
							<div className="flex flex-col">
								<SelectInput label="status" value={status} onChange={e => setStatus(e.target.value)}>
									<option value="todo">Todo</option>
									<option value="in_progress">In Progress</option>
									<option value="in_review">In Review</option>
									<option value="done">Done</option>
								</SelectInput>
							</div>

							<div className="flex flex-col">
								<SelectInput label="priority" value={priority} onChange={e => setPriority(e.target.value)}>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
									<option value="top">Top</option>
								</SelectInput>
							</div>
						</div>

						<BlueButton disabled={loading} type="submit">{loading ? <Spinner size="h-5 w-5" color="border-white" /> : "Create Bug"}</BlueButton>
					</div>
				</form>
			</div>
		</Container>
	)
}
