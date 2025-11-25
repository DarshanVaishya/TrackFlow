import { useContext, useState } from "react"
import Spinner from "./utils/Spinner"
import { BlueButton } from "./utils/Buttons"
import CommentCard from "./CommentCard"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContext"

export default function CommentsSection({ bugId, comments, setComments }) {
	const [content, setContent] = useState("")
	const { user } = useContext(AuthContext)

	const handleSubmit = () => {
		axios.post(`http://localhost:8000/comments`, {
			"content": content,
			"created_by_id": user.id,
			"bug_id": bugId
		}).then(data => {
			const newComment = data.data.data
			setContent("")
			setComments([...comments, newComment])
		})
	}

	if (!comments)
		return <Spinner />

	return (
		<>
			{/* Comments title */}
			<div className="flex items-center gap-2 py-2 mt-5">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
				<span className="text-xl font-bold">Comments ({comments.length})</span>
			</div>

			{/* Post comment box */}
			<div className="p-5 border border-neutral-500/50 mt-3 mb-5 bg-neutral-900/50 rounded">
				<div>
					<textarea className="w-full p-2 rounded border border-neutral-600/50 bg-black text-white focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-32" value={content} onChange={e => setContent(e.target.value)} placeholder="Add a comment..." />
				</div>
				<BlueButton onClick={handleSubmit} className="mt-3">Post Comment</BlueButton>
			</div>

			{/* Comments */}
			<div>
				{comments.map(comment => <CommentCard key={comment.id} comment={comment} userId={user.id} commentsState={{ comments, setComments }} />)}
			</div>

			<div className="pt-10" />
		</>
	)
}
