import { FolderKanban, Bug } from "lucide-react"
import { FormatDate } from "./BugsCard"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Pencil, Trash2, Users } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function ProjectCard({ project, handleClick, setProjects, projects }) {
	const { user } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleEdit = e => {
		e.stopPropagation()
		navigate(`/projects/${project.id}/edit`)
	}

	const handleDelete = (e) => {
		e.stopPropagation()
		const agree = confirm("Do you want to DELETE this project? All the bugs and comments inside will be permenantly deleted.")
		if (!agree) return
		axios.delete(`http://localhost:8000/projects/${project.id}`).then(() => {
			setProjects(projects.filter(p => p.id !== project.id))
			navigate("/projects")
		})
	}

	return (
		<div onClick={handleClick} className="group flex gap-5 p-5 bg-neutral-900/50 border border-neutral-500/50 rounded cursor-pointer hover:border-blue-500 mb-3">
			<FolderKanban className="h-8 w-8 text-blue-500" />
			<div className="flex-1">
				<div className="flex justify-between">
					<h3 className="text-2xl mb-3">{project.title}</h3>
					<div className="flex items-center">
						{user.id === project.created_by_id && <div className="flex gap-3">
							<button onClick={handleEdit} className="hidden group-hover:flex px-2 py-1 rounded hover:bg-green-500/50 justify-center items-center hover:cursor-pointer">
								<Pencil className="h-5 w-5" />
							</button>
							<button onClick={handleDelete} className="hidden group-hover:flex px-2 py-1 rounded hover:bg-red-500/50 justify-center items-center hover:cursor-pointer">
								<Trash2 className="h-5 w-5" />
							</button>
						</div>}
					</div> </div>

				<p className="text-base text-neutral-400 mb-2">{project.description}</p>
				<div className="flex gap-5">
					<span className="flex gap-2 items-center text-neutral-400">
						<Bug className="h-5 w-5 text-white" />
						{project.bugs.length} bugs
					</span>
					<span className="flex gap-2 items-center text-neutral-400">
						<Users className="h-5 w-5 text-white" />
						{project.members.length} members
					</span>
					<span className="text-neutral-400">Created {FormatDate(project.created_at)}</span>
				</div>
			</div>
		</div>
	)
}
