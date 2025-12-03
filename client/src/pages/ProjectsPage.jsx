import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/utils/Spinner";
import ProjectCard from "../components/ProjectCard";
import { AuthContext } from "../contexts/AuthContext";
import API_BASE_URL from "../../api";

export default function ProjectsPage() {
	const navigate = useNavigate()
	const [projects, setProjects] = useState(null)
	const { user } = useContext(AuthContext)

	useEffect(() => {
		axios.get(`${API_BASE_URL}/projects/user/${user.id}`).then(response => {
			const projects = response.data.data
			setProjects(projects)
		})
	}, [user])

	return (
		<Container>
			<Navbar >
				<BlackButton onClick={() => navigate("/")}>← Back to Home</BlackButton>
			</Navbar>
			<div className="pt-18 flex flex-col gap-5">
				<div className="flex justify-between items-center">
					<h1 className="text-4xl font-bold pt-5">Projects</h1>
					<BlueButton className="flex items-center mt-5" onClick={() => navigate("/projects/new")} >
						New Project</BlueButton>
				</div>
				<span className="text-neutral-500 pb-5">Manage your projects and track bugs across your organization</span>
			</div>
			{projects ? <div>
				{projects.map(project => <ProjectCard key={project.id} projects={projects} setProjects={setProjects} handleClick={() => navigate(`/projects/${project.id}/bugs`)} project={project} />)}
			</div>
				:
				<Spinner />}
		</Container>
	)
}
