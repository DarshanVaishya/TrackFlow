import axios from "axios";
import { FormatDate } from "./BugsCard";
import { useState } from "react";
import { BlueButton } from "./utils/Buttons";

export default function CommentCard({ comment, userId, commentsState }) {
	const { comments, setComments } = commentsState;
	const [editing, setEditing] = useState(false)
	const [content, setContent] = useState(comment.content)

	// TODO: Have a confirm alert box before deleting
	const handleDelete = () => {
		axios.delete(`http://localhost:8000/comments/${comment.id}`)
			.then(response => {
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

	// TODO: Change edit comment from input to textarea
	return (
		<div className="group bg-neutral-900/60 border border-neutral-500/50 rounded p-5 mt-3 outline-none hover:ring-1 hover:ring-blue-500">
			<div className="flex justify-between">
				<div className="flex gap-3 mb-2">
					<span className="capitalize">{comment.created_by.email.split("@")[0]}</span>
					<span className="text-neutral-500">{FormatDate(comment.created_at, true)}</span>
				</div>
				{userId === comment.created_by_id && <div className="flex gap-3">
					<button onClick={() => setEditing(!editing)} className="hidden group-hover:flex px-2 py-1 rounded hover:bg-green-500/50 justify-center items-center hover:cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil h-3.5 w-3.5"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>
					</button>
					<button onClick={handleDelete} className="hidden group-hover:flex px-2 py-1 rounded hover:bg-red-500/50 justify-center items-center hover:cursor-pointer">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-3.5 w-3.5"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
					</button>
				</div>}
			</div>
			{
				editing ?
					<div className="flex gap-3">
						<input className="border border-neutral-500/50 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="New content" type="text" value={content} onChange={e => setContent(e.target.value)} />
						<BlueButton onClick={handleUpdate}>Submit</BlueButton>
					</div>
					:
					<span className="whitespace-pre-line text-neutral-400/90">{comment.content}</span>
			}
		</div>
	)
}
