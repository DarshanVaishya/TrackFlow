import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BugDetailsModal from "../components/BugDetailsModal";

export default function BugsPage() {
	const [bugs, setBugs] = useState([]);
	const [selectedBugId, setSelectedBugId] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [newBugData, setNewBugData] = useState({
		title: "",
		description: "",
		status: "todo",
		priority: "low",
	});

	const theme = useTheme();

	// Fetch all bugs
	const fetchBugs = async () => {
		try {
			const res = await fetch("http://localhost:8000/bugs");
			const data = await res.json();
			if (data.success) setBugs(data.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchBugs();
	}, []);

	// Open modal for selected bug
	const handleOpenBug = (id) => {
		setSelectedBugId(id);
		setIsModalOpen(true);
	};
	const handleCloseModal = () => {
		setSelectedBugId(null);
		setIsModalOpen(false);
	};

	// Create bug dialog
	const handleCreateOpen = () => setIsCreateOpen(true);
	const handleCreateClose = () => setIsCreateOpen(false);

	const handleCreateBug = async () => {
		try {
			const res = await fetch("http://localhost:8000/bugs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...newBugData, created_by_id: 1 }),
			});
			const data = await res.json();
			if (data.success) {
				fetchBugs();
				setNewBugData({ title: "", description: "", status: "todo", priority: "low" });
				handleCreateClose();
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Box
			sx={{
				p: 4,
				backgroundColor: theme.palette.background.default,
				minHeight: "100vh",
				fontFamily: "'Inter', sans-serif",
			}}
		>
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={3}
			>
				<Typography variant="h4" fontWeight={700} color={theme.palette.text.primary}>
					🐞 Bugs Dashboard
				</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={handleCreateOpen}
					sx={{
						textTransform: "none",
						borderRadius: "8px",
						fontWeight: 600,
						px: 3,
						py: 1,
					}}
				>
					Create Bug
				</Button>
			</Box>

			{/* Table */}
			<Paper
				elevation={3}
				sx={{
					borderRadius: 2,
					overflow: "hidden",
					backgroundColor: theme.palette.background.paper,
				}}
			>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
							<TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
							<TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
							<TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
							<TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>
							<TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{bugs.length === 0 ? (
							<TableRow>
								<TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
									No bugs found. Click “Create Bug” to add one.
								</TableCell>
							</TableRow>
						) : (
							bugs.map((bug) => (
								<TableRow
									key={bug.id}
									hover
									onClick={() => handleOpenBug(bug.id)}
									sx={{
										cursor: "pointer",
										"&:hover": { backgroundColor: theme.palette.action.hover },
									}}
								>
									<TableCell>{bug.id}</TableCell>
									<TableCell>{bug.title}</TableCell>
									<TableCell>
										<Box
											sx={{
												display: "inline-block",
												px: 1.5,
												py: 0.5,
												borderRadius: "6px",
												backgroundColor:
													bug.status === "done"
														? theme.palette.success.light
														: bug.status === "in_progress"
															? theme.palette.warning.light
															: theme.palette.grey[200],
												color:
													bug.status === "done"
														? theme.palette.success.dark
														: bug.status === "in_progress"
															? theme.palette.warning.dark
															: theme.palette.text.primary,
												fontWeight: 600,
												fontSize: "0.85rem",
											}}
										>
											{bug.status.replace("_", " ")}
										</Box>
									</TableCell>
									<TableCell>
										<Box
											sx={{
												display: "inline-block",
												px: 1.5,
												py: 0.5,
												borderRadius: "6px",
												backgroundColor:
													bug.priority === "high"
														? theme.palette.error.light
														: bug.priority === "medium"
															? theme.palette.warning.light
															: theme.palette.success.light,
												color:
													bug.priority === "high"
														? theme.palette.error.dark
														: bug.priority === "medium"
															? theme.palette.warning.dark
															: theme.palette.success.dark,
												fontWeight: 600,
												fontSize: "0.85rem",
											}}
										>
											{bug.priority}
										</Box>
									</TableCell>
									<TableCell>{new Date(bug.created_at).toLocaleString()}</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</Paper>

			{/* Bug Details Modal */}
			{selectedBugId && (
				<BugDetailsModal
					bugId={selectedBugId}
					open={isModalOpen}
					onClose={handleCloseModal}
					fetchBugs={fetchBugs}
				/>
			)}

			{/* Create Bug Dialog */}
			<Dialog open={isCreateOpen} onClose={handleCreateClose} maxWidth="sm" fullWidth>
				<DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Create New Bug</DialogTitle>
				<DialogContent
					dividers
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						pt: 2,
					}}
				>
					<TextField
						label="Title"
						fullWidth
						value={newBugData.title}
						onChange={(e) => setNewBugData({ ...newBugData, title: e.target.value })}
					/>
					<TextField
						label="Description"
						multiline
						minRows={4}
						fullWidth
						value={newBugData.description}
						onChange={(e) => setNewBugData({ ...newBugData, description: e.target.value })}
					/>
					<FormControl fullWidth>
						<InputLabel>Status</InputLabel>
						<Select
							value={newBugData.status}
							onChange={(e) => setNewBugData({ ...newBugData, status: e.target.value })}
						>
							<MenuItem value="todo">Todo</MenuItem>
							<MenuItem value="in_progress">In Progress</MenuItem>
							<MenuItem value="done">Done</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel>Priority</InputLabel>
						<Select
							value={newBugData.priority}
							onChange={(e) => setNewBugData({ ...newBugData, priority: e.target.value })}
						>
							<MenuItem value="low">Low</MenuItem>
							<MenuItem value="medium">Medium</MenuItem>
							<MenuItem value="high">High</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleCreateClose} sx={{ textTransform: "none" }}>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={handleCreateBug}
						sx={{ textTransform: "none", fontWeight: 600 }}
					>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

