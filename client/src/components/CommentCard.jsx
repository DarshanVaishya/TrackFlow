import axios from "axios";
import { FormatDate } from "./BugsCard";
import { useState } from "react";
import { BlueButton } from "./utils/Buttons";

export default function CommentCard({ comment, userId, commentsState }) {
	const { comments, setComments } = commentsState;
	const [editing, setEditing] = useState(false)
	const [content, setContent] = useState(comment.content)

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

	// TODO: Fix the look of edit and delete buttons
	return (
		<div className="bg-neutral-900/60 border-1 border-neutral-500/50 rounded p-5 mt-3">
			<div className="flex justify-between">
				<div className="flex gap-3 mb-2">
					<span className="capitalize">{comment.created_by.email.split("@")[0]}</span>
					<span className="text-neutral-500">{FormatDate(comment.created_at, true)}</span>
				</div>
				{userId === comment.created_by_id && <div className="flex gap-3">
					<span onClick={() => setEditing(!editing)} className="hover:cursor-pointer text-green-400 underline">Edit</span>
					<span onClick={handleDelete} className="hover:cursor-pointer text-red-500 underline">Delete</span>
				</div>}
			</div>
			{
				editing ?
					<div className="flex gap-3">
						<input className="border border-neutral-500/50 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="New content" type="text" value={content} onChange={e => setContent(e.target.value)} />
						<BlueButton onClick={handleUpdate}>Submit</BlueButton>
					</div>
					:
					<span className="whitespace-pre-line">{comment.content}</span>
			}
		</div>
	)
}
