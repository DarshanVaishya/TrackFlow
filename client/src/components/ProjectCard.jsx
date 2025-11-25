import { FolderKanban, Bug } from "lucide-react"
import { FormatDate } from "./BugsCard"
export default function ProjectCard({ project, handleClick }) {
	// Figure out how to find the correct number of bugs
	return (
		<div onClick={handleClick} className="flex gap-5 p-5 bg-neutral-900/50 border border-neutral-500/50 rounded cursor-pointer hover:border-blue-500">
			<FolderKanban className="h-8 w-8 text-blue-500" />
			<div>
				<h3 className="text-2xl mb-3">{project.title}</h3>
				<p className="text-base text-neutral-400 mb-2">{project.description}</p>
				<div className="flex gap-5">
					<div className="flex gap-2 items-center">
						<Bug className="h-4 w-4" />
						<span>24 total bugs</span>
					</div>
					<span className="text-neutral-400">Created {FormatDate(project.created_at)}</span>
				</div>
			</div>
		</div>
	)
}
