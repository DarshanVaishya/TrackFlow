import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	TextField,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Divider,
	useTheme,
	Paper,
} from "@mui/material";

export default function BugDetailsModal({ bugId, open, onClose, fetchBugs }) {
	const [selectedBug, setSelectedBug] = useState(null);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [editData, setEditData] = useState({
		title: "",
		description: "",
		status: "todo",
		priority: "low",
	});

	const theme = useTheme();

	// Fetch bug + comments
	useEffect(() => {
		if (!bugId) return;
		const fetchBugDetails = async () => {
			try {
				const bugRes = await fetch(`http://localhost:8000/bugs/${bugId}`);
				const bugData = await bugRes.json();
				if (bugData.success) {
					setSelectedBug(bugData.data);
					setEditData({
						title: bugData.data.title,
						description: bugData.data.description,
						status: bugData.data.status,
						priority: bugData.data.priority,
					});
				}
				const commentsRes = await fetch(`http://localhost:8000/bugs/${bugId}/comments`);
				const commentsData = await commentsRes.json();
				if (commentsData.success) setComments(commentsData.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchBugDetails();
	}, [bugId]);

	// Add comment
	const handleAddComment = async () => {
		if (!newComment.trim()) return;
		try {
			const res = await fetch(`http://localhost:8000/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: newComment,
					created_by_id: 1,
					bug_id: bugId,
				}),
			});
			const data = await res.json();
			if (data.success) {
				setComments((prev) => [...prev, data.data]);
				setNewComment("");
			}
		} catch (err) {
			console.error(err);
		}
	};

	// Delete bug
	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this bug?")) return;
		try {
			const res = await fetch(`http://localhost:8000/bugs/${bugId}`, { method: "DELETE" });
			const data = await res.json();
			if (data.success) {
				onClose();
				fetchBugs();
			}
		} catch (err) {
			console.error(err);
		}
	};

	// Edit bug
	const handleSaveEdit = async () => {
		try {
			const res = await fetch(`http://localhost:8000/bugs/${bugId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(editData),
			});
			const data = await res.json();
			if (data.success) {
				setSelectedBug(data.data);
				setEditMode(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleEditOpen = () => setEditMode(true);
	const handleEditClose = () => setEditMode(false);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle
				sx={{
					fontWeight: 700,
					fontSize: "1.4rem",
					bgcolor: theme.palette.background.default,
					color: theme.palette.text.primary,
				}}
			>
				{editMode ? "Edit Bug" : selectedBug?.title || "Loading..."}
			</DialogTitle>

			<DialogContent dividers sx={{ bgcolor: theme.palette.background.paper }}>
				{selectedBug ? (
					editMode ? (
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							<TextField
								label="Title"
								fullWidth
								value={editData.title}
								onChange={(e) => setEditData({ ...editData, title: e.target.value })}
							/>
							<TextField
								label="Description"
								fullWidth
								multiline
								minRows={4}
								value={editData.description}
								onChange={(e) => setEditData({ ...editData, description: e.target.value })}
							/>
							<FormControl fullWidth>
								<InputLabel>Status</InputLabel>
								<Select
									value={editData.status}
									onChange={(e) => setEditData({ ...editData, status: e.target.value })}
								>
									<MenuItem value="todo">Todo</MenuItem>
									<MenuItem value="in_progress">In Progress</MenuItem>
									<MenuItem value="in_review">In Review</MenuItem>
									<MenuItem value="done">Done</MenuItem>
								</Select>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel>Priority</InputLabel>
								<Select
									value={editData.priority}
									onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
								>
									<MenuItem value="low">Low</MenuItem>
									<MenuItem value="medium">Medium</MenuItem>
									<MenuItem value="high">High</MenuItem>
									<MenuItem value="top">Top</MenuItem>
								</Select>
							</FormControl>
						</Box>
					) : (
						<>
							{/* Bug Details */}
							<Box sx={{ mb: 3 }}>
								<Typography
									variant="body1"
									sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "text.primary", mb: 2 }}
								>
									{selectedBug.description}
								</Typography>

								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										gap: 2,
										mt: 1,
									}}
								>
									<InfoChip label="Status" value={selectedBug.status} color={theme} />
									<InfoChip label="Priority" value={selectedBug.priority} color={theme} />
									<Typography variant="body2" color="text.secondary">
										<b>Created:</b>{" "}
										{new Date(selectedBug.created_at).toLocaleString()}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										<b>Updated:</b>{" "}
										{new Date(selectedBug.updated_at).toLocaleString()}
									</Typography>
								</Box>
							</Box>

							<Divider sx={{ my: 2 }} />

							{/* Comments Section */}
							<Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
								Comments
							</Typography>

							{comments.length === 0 ? (
								<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
									No comments yet.
								</Typography>
							) : (
								comments.map((c) => (
									<Paper
										key={c.id}
										elevation={0}
										sx={{
											p: 1.5,
											mb: 1.5,
											backgroundColor: theme.palette.grey[100],
											borderRadius: "10px",
										}}
									>
										<Typography
											variant="body2"
											sx={{ whiteSpace: "pre-wrap", mb: 0.5 }}
										>
											{c.content}
										</Typography>
										<Typography variant="caption" color="text.secondary">
											{new Date(c.created_at).toLocaleString()}
										</Typography>
									</Paper>
								))
							)}

							<Box sx={{ mt: 3, display: "flex", gap: 1 }}>
								<TextField
									label="Add Comment"
									fullWidth
									multiline
									minRows={2}
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
								/>
								<Button
									variant="contained"
									onClick={handleAddComment}
									sx={{ textTransform: "none", fontWeight: 600 }}
								>
									Post
								</Button>
							</Box>
						</>
					)
				) : (
					<Typography>Loading...</Typography>
				)}
			</DialogContent>

			{/* Actions */}
			<DialogActions sx={{ p: 2 }}>
				{!editMode && (
					<>
						<Button color="error" onClick={handleDelete} sx={{ textTransform: "none" }}>
							Delete
						</Button>
						<Button onClick={handleEditOpen} sx={{ textTransform: "none" }}>
							Edit
						</Button>
					</>
				)}
				{editMode && (
					<>
						<Button onClick={handleEditClose} sx={{ textTransform: "none" }}>
							Cancel
						</Button>
						<Button
							variant="contained"
							onClick={handleSaveEdit}
							sx={{ textTransform: "none", fontWeight: 600 }}
						>
							Save
						</Button>
					</>
				)}
				<Button onClick={onClose} sx={{ textTransform: "none" }}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
}

/** Custom Chip-like label for Status and Priority **/
function InfoChip({ label, value, color }) {
	const palette = {
		status: {
			done: color.palette.success,
			in_progress: color.palette.warning,
			todo: color.palette.grey,
		},
		priority: {
			high: color.palette.error,
			medium: color.palette.warning,
			low: color.palette.success,
		},
	};

	const category = label.toLowerCase();
	const tone = palette[category]?.[value] || color.palette.grey;

	return (
		<Box
			sx={{
				display: "inline-flex",
				alignItems: "center",
				px: 1.5,
				py: 0.5,
				borderRadius: "6px",
				backgroundColor: tone.light,
				color: tone.dark,
				fontWeight: 600,
				fontSize: "0.85rem",
			}}
		>
			{label}: {value.replace("_", " ")}
		</Box>
	);
}

