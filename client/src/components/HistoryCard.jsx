import { Plus, MoveRight, FileText, ChartPie, CircleCheckBig, UserPlus, UserMinus } from "lucide-react"
import { FormatDate } from "./BugsCard"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import Spinner from "./utils/Spinner"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import API_BASE_URL from "../api"

const statusMapper = {
	"todo": "Todo",
	"in_progress": "In Progress",
	"in_review": "In Review",
	"done": "Done"
}

function getCardForField(history, author, user, currentUser) {
	const field = history.field_name

	if (field === "create")
		return (
			<>
				<div className="flex justify-between items-start">
					<h2 className="font-medium">Created Bug</h2>
					<span className="text-neutral-500 text-sm">{FormatDate(history.changed_at, true)}</span>
				</div>
				<span className="text-neutral-500 mt-3">by {author.email}</span>

				<p className="mt-5 text-neutral-500">Bug was created in the system</p>
			</>
		)
	else if (field === "title")
		return (
			<>
				<div className="flex justify-between items-start">
					<h2 className="font-medium">Updated Title</h2>
					<span className="text-neutral-500 text-sm">{FormatDate(history.changed_at, true)}</span>
				</div>
				<span className="text-neutral-500 mt-3">by {author.email}</span>

				<div className="flex justify-between items-center gap-5 mt-5">
					<div className="grow flex flex-col p-2 bg-neutral-800/50 rounded border border-neutral-500/30">
						<span>{history.old_value}</span>
					</div>
					<MoveRight />
					<div className="grow flex flex-col p-2 bg-blue-900/30 rounded border border-blue-500/30">
						<span className="text-blue-500">{history.new_value}</span>
					</div>
				</div>
			</>
		)
	else if (field === "description")
		return (
			<>
				<div className="flex justify-between">
					<h2 className="font-medium">Updated Description</h2>
					<span className="text-neutral-500 text-sm">{FormatDate(history.changed_at, true)}</span>
				</div>
				<span className="text-neutral-500 mt-3">by {author.email}</span>

				<div className="flex justify-between gap-5 mt-5">
					<div className="grow flex flex-col p-2 bg-neutral-800/50 rounded border border-neutral-500/30">
						<span className="whitespace-pre-wrap">{history.old_value}</span>
					</div>
					<MoveRight className="self-center" />
					<div className="grow flex flex-col p-2 bg-blue-900/30 rounded border border-blue-500/30">
						<span className="text-blue-500 whitespace-pre-wrap">{history.new_value}</span>
					</div>
				</div>
			</>
		)
	else if (field === "status")
		return (
			<>
				<div className="flex justify-between items-start">
					<h2 className="font-medium">Updated Status</h2>
					<span className="text-neutral-500 text-sm">{FormatDate(history.changed_at, true)}</span>
				</div>
				<span className="text-neutral-500 mt-3">by {author.email}</span>

				<div className="flex justify-between items-center gap-5 mt-5">
					<div className="grow flex flex-col p-2 bg-neutral-800/50 rounded border border-neutral-500/30">
						<span>{statusMapper[history.old_value]}</span>
					</div>
					<MoveRight />
					<div className="grow flex flex-col p-2 bg-blue-900/30 rounded border border-blue-500/30">
						<span className="text-blue-500">{statusMapper[history.new_value]}</span>
					</div>
				</div>
			</>
		)
	else if (field === "priority")
		return (
			<>
				<div className="flex justify-between items-start">
					<h2 className="font-medium">Updated Priority</h2>
					<span className="text-neutral-500 text-sm">{FormatDate(history.changed_at, true)}</span>
				</div>
				<span className="text-neutral-500 mt-3">by {author.email}</span>

				<div className="flex justify-between items-center gap-5 mt-5">
					<div className="grow flex flex-col p-2 bg-neutral-800/50 rounded border border-neutral-500/30">
						<span className="capitalize">{history.old_value}</span>
					</div>
					<MoveRight />
					<div className="grow flex flex-col p-2 bg-blue-900/30 rounded border border-blue-500/30">
						<span className="text-blue-500 capitalize">{history.new_value}</span>
					</div>
				</div>
			</>
		)
	else if (field === "assign")
		return (
			<>
				<div className="flex justify-between items-start">
					<h2 className="font-medium">Assigned User</h2>
					<span className="text-neutral-500 text-sm">{FormatDate(history.changed_at, true)}</span>
				</div>
				<span className="text-neutral-500 mt-3">by {author.email}</span>

				<div className="mt-5">
					<span className="text-neutral-500">User: </span>
					<div className="p-2 mt-1 bg-blue-900/30 rounded border border-blue-500/30">
						<span className="text-blue-500 ">{currentUser.email === user.email ? "You" : user.email}</span>
					</div>
				</div>
			</>
		)
	else if (field === "unassign")
		return (
			<>
				<div className="flex justify-between items-start">
					<h2 className="font-medium">Unassigned User</h2>
					<span className="text-neutral-500 text-sm">{FormatDate(history.changed_at, true)}</span>
				</div>
				<span className="text-neutral-500 mt-3">by {author.email}</span>

				<div className="mt-5">
					<span className="text-neutral-500">User: </span>
					<div className="p-2 mt-1 bg-blue-900/30 rounded border border-blue-500/30">
						<span className="text-blue-500 ">{currentUser.email === user.email ? "You" : user.email}</span>
					</div>
				</div>
			</>
		)
}

const logoMapper = {
	"create": Plus,
	"title": FileText,
	"description": FileText,
	"status": CircleCheckBig,
	"priority": ChartPie,
	"assign": UserPlus,
	"unassign": UserMinus
}

export default function HistoryCard({ history }) {
	const Logo = logoMapper[history.field_name]
	const { user: currentUser } = useContext(AuthContext)
	const [author, setAuthor] = useState(null)
	const [user, setUser] = useState(null)

	useEffect(() => {
		axios.get(`${API_BASE_URL}/users/${history.changed_by_id}`).then(response => setAuthor(response.data.data))
	}, [history])

	useEffect(() => {
		if (history.field_name !== "assign" && history.field_name !== "unassign") return;
		axios.get(`${API_BASE_URL}/users/${history.new_value}`).then(response => setUser(response.data.data))
	}, [history])

	if (!author || !currentUser)
		return <Spinner />

	if ((history.field_name === "assign" || history.field_name === "unassign") && !user)
		return <Spinner />

	return (
		<div className="mb-5 flex gap-5">
			<div className="flex flex-col items-center">
				<Logo className="text-neutral-500 bg-neutral-900 rounded-4xl p-2 h-10 w-10" />
				<div className="grow mt-2 w-0.5 border border-neutral-800"></div>
			</div>

			<div className="border border-neutral-500/50 grow p-5 rounded">
				{
					getCardForField(history, author, user, currentUser)
				}
			</div>
		</div>
	)
}
