import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { BlackButton, BlueButton } from "../components/utils/Buttons";
import Container from "../components/utils/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/utils/Spinner";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
	const navigate = useNavigate()
	const [projects, setProjects] = useState(null)

	useEffect(() => {
		axios.get("http://localhost:8000/projects").then(response => {
			const projects = response.data.data
			setProjects(projects)
		})
	}, [])

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
