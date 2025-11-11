// pages/BugsListPage.jsx
import { useState, useEffect } from 'react';
import { Box, Container, Spinner, Text } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import BugsListHeader from '../components/BugsListHeader';
import BugsListFilters from '../components/BugsListFilters';
import BugsList from '../components/BugsList';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

export default function BugsListPage() {
	const [bugs, setBugs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [priorityFilter, setPriorityFilter] = useState('all');


	useEffect(() => {
		fetchBugs();
	}, []);

	const fetchBugs = async () => {
		try {
			setLoading(true);
			const response = await fetch('http://localhost:8000/bugs');
			const result = await response.json();

			if (result.success) {
				setBugs(result.data);
			} else {
				setError('Failed to load bugs');
			}
		} catch (err) {
			setError('Error fetching bugs: ' + err.message);
		} finally {
			setLoading(false);
		}
	};

	const filteredBugs = bugs.filter((bug) => {
		const matchesSearch =
			bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			bug.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === 'all' || bug.status === statusFilter;
		const matchesPriority = priorityFilter === 'all' || bug.priority === priorityFilter;

		return matchesSearch && matchesStatus && matchesPriority;
	});

	return (
		<Box minH="100vh" bg="gray.50">
			<Navbar />

			<Container maxW="container.xl" py={8} px={6}>
				<BugsListHeader totalBugs={bugs.length} filteredBugs={filteredBugs.length} />

				<BugsListFilters
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					priorityFilter={priorityFilter}
					setPriorityFilter={setPriorityFilter}
				/>

				{loading && (
					<Box textAlign="center" py={12}>
						<Spinner size="xl" color="cyan.600" thickness="4px" />
						<Text mt={4} color="gray.600">Loading issues...</Text>
					</Box>
				)}

				{error && <ErrorState error={error} onRetry={fetchBugs} />}

				{!loading && !error && (
					filteredBugs.length === 0 ? (
						<EmptyState />
					) : (
						<BugsList bugs={filteredBugs} />
					)
				)}
			</Container>
		</Box>
	);
}

