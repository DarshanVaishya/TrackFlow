import { Stack, HStack, Input } from '@chakra-ui/react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { Select } from '@chakra-ui/select';

export default function BugsListFilters({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter,
	priorityFilter,
	setPriorityFilter,
}) {
	return (
		<Stack
			direction={{ base: 'column', md: 'row' }}
			spacing={4}
			mb={6}
			bg="white"
			p={4}
			rounded="lg"
			borderWidth="1px"
			borderColor="gray.200"
		>
			<HStack flex={1}>
				<FaSearch color="gray" size={20} />
				<Input
					placeholder="Search issues..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					border="none"
					_focus={{ outline: 'none' }}
				/>
			</HStack>

			<HStack spacing={3}>
				<HStack>
					<FaFilter color="gray" size={16} />
					<Select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						w="150px"
						size="sm"
						borderColor="gray.200"
						rounded="md"
					>
						<option value="all">All Status</option>
						<option value="todo">To Do</option>
						<option value="in-progress">In Progress</option>
						<option value="done">Done</option>
						<option value="blocked">Blocked</option>
					</Select>
				</HStack>

				<Select
					value={priorityFilter}
					onChange={(e) => setPriorityFilter(e.target.value)}
					w="150px"
					size="sm"
					borderColor="gray.200"
					rounded="md"
				>
					<option value="all">All Priority</option>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
					<option value="critical">Critical</option>
				</Select>
			</HStack>
		</Stack>
	);
}

