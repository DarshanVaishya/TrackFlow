import axios from "axios";
import { FormatDate } from "./BugsCard";
import { useState } from "react";
import { BlueButton } from "./utils/Buttons";
import { Pencil, Trash2 } from "lucide-react"

export default function CommentCard({ comment, userId, commentsState }) {
	const { comments, setComments } = commentsState;
	const [editing, setEditing] = useState(false)
	const [content, setContent] = useState(comment.content)

	const handleDelete = () => {
		axios.delete(`http://localhost:8000/comments/${comment.id}`)
			.then(() => {
				const agree = confirm("Do you want to DELETE this comment? This action is irreversible.")
				if (!agree) return
				const filteredComments = comments.filter(c => c.id !== comment.id)
				setComments(filteredComments)
			})
	}

	const handleUpdate = () => {
		axios.put(`http://localhost:8000/comments/${comment.id}`, {
			content
		}).then(response => {
			const updatedComment = response.data.data
			const newComments = comments.map(c => c.id === updatedComment.id ? updatedComment : c)
			setComments(newComments)
			setEditing(false)
		})
	}

	return (
		<div className="group bg-neutral-900/60 border border-neutral-500/50 rounded p-5 mt-3 outline-none hover:ring-1 hover:ring-blue-500">
			<div className="flex justify-between">
				<div className="flex flex-col gap-3 mb-2 sm:flex-row">
					<span className="capitalize">{comment.created_by.email.split("@")[0]}</span>
					<span className="text-neutral-500">{FormatDate(comment.created_at, true)}</span>
				</div>
				{userId === comment.created_by_id && <div className="flex gap-3">
					<button onClick={() => setEditing(!editing)} className="hidden group-hover:flex px-2 py-1 rounded hover:bg-green-500/50 justify-center items-center hover:cursor-pointer">
						<Pencil className="h-4 w-4" />
					</button>
					<button onClick={handleDelete} className="hidden group-hover:flex px-2 py-1 rounded hover:bg-red-500/50 justify-center items-center hover:cursor-pointer">
						<Trash2 className="h-4 w-4" />
					</button>
				</div>}
			</div>
			{
				editing ?
					<div className="flex flex-col gap-3">
						<textarea className="border border-neutral-500/50 min-h-32 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="New content" type="text" value={content} onChange={e => setContent(e.target.value)} />
						<BlueButton className="self-baseline" onClick={handleUpdate}>Submit</BlueButton>
					</div>
					:
					<span className="whitespace-pre-line text-neutral-400/90">{comment.content}</span>
			}
		</div>
	)
}
