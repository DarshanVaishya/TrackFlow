import { useNavigate } from "react-router-dom";
import Priority from "./utils/Priority"
import Spinner from "./utils/Spinner"
import Status from "./utils/status"

export function FormatDate(isoDate, Time = false) {
	const dateObj = new Date(isoDate);

	const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
	const optionsTime = { hour: '2-digit', minute: '2-digit' };

	const formattedDate = dateObj.toLocaleDateString(undefined, optionsDate);
	const formattedTime = dateObj.toLocaleTimeString(undefined, optionsTime);

	if (Time)
		return `${formattedDate}, ${formattedTime}`;
	else
		return `${formattedDate}`;
}

export default function BugsCard({ bugs }) {
	const navigate = useNavigate()

	if (!bugs)
		return <Spinner />

	return (
		bugs.map(bug => <div onClick={() => navigate(`/bugs/${bug.id}`)} className="p-5 border-1 border-neutral-500/50 bg-neutral-900/40 rounded-lg hover:cursor-pointer hover:border-blue-500" key={bug.id}>
			<div className="flex gap-5">
				<span className="text-neutral-400">#{bug.id}</span>
				<div className="flex flex-col gap-2">
					<h2 className="font-bold">{bug.title}</h2>
					<p className="text-neutral-400">{bug.description}</p>
					<div className="flex gap-5 p-2">
						<Status status={bug.status} />
						<Priority priority={bug.priority} />
						<span className="text-neutral-500 text-sm py-1">Created {FormatDate(bug.created_at)}</span>
						<span className="text-neutral-500 text-sm py-1">Updated {FormatDate(bug.updated_at)}</span>
					</div>
				</div>
			</div>
		</div>)
	)
}
