import axios from "axios";
import { FormatDate } from "./BugsCard";

export default function CommentCard({ comment, userId, commentsState }) {
	const { comments, setComments } = commentsState;

	const handleDelete = () => {
		axios.delete(`http://localhost:8000/comments/${comment.id}`)
			.then(response => {
				const filteredComments = comments.filter(c => c.id !== comment.id)
				setComments(filteredComments)
			})
	}

	return (
		<div className="bg-neutral-900/60 border-1 border-neutral-500/50 rounded p-5 mt-3">
			<div className="flex justify-between">
				<div className="flex gap-3 mb-2">
					<span className="capitalize">{comment.created_by.email.split("@")[0]}</span>
					<span className="text-neutral-500">{FormatDate(comment.created_at, true)}</span>
				</div>
				{userId === comment.created_by_id && <span onClick={handleDelete} className="hover:cursor-pointer text-red-500 underline">Delete</span>}
			</div>
			<span className="whitespace-pre-line">{comment.content}</span>
		</div>
	)
}
