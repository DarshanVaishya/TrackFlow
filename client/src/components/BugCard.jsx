// components/BugCard.jsx
import { Box, HStack, VStack, Text, Heading, Badge } from '@chakra-ui/react';

const statusColors = {
	todo: 'gray',
	'in-progress': 'blue',
	done: 'green',
	blocked: 'red',
};

const priorityColors = {
	low: 'green',
	medium: 'yellow',
	high: 'orange',
	critical: 'red',
};

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
};

export default function BugCard({ bug }) {
	return (
		<Box
			bg="white"
			border="1px"
			borderColor="gray.200"
			rounded="lg"
			p={6}
			_hover={{
				borderColor: 'cyan.300',
				shadow: 'md',
				cursor: 'pointer',
			}}
			transition="all 0.2s"
		>
			<HStack justify="space-between" align="start" mb={3}>
				<VStack align="start" spacing={2} flex={1}>
					<HStack spacing={3}>
						<Text fontSize="sm" color="gray.500" fontWeight="medium">
							#{bug.id}
						</Text>
						<Badge
							colorScheme={statusColors[bug.status] || 'gray'}
							fontSize="xs"
							px={2}
							py={1}
							rounded="md"
							textTransform="capitalize"
						>
							{bug.status.replace('-', ' ')}
						</Badge>
						<Badge
							colorScheme={priorityColors[bug.priority] || 'gray'}
							fontSize="xs"
							px={2}
							py={1}
							rounded="md"
							textTransform="capitalize"
						>
							{bug.priority}
						</Badge>
					</HStack>

					<Heading as="h3" fontSize="lg" fontWeight="semibold" color="gray.900">
						{bug.title}
					</Heading>

					<Text color="gray.600" fontSize="sm" noOfLines={2} lineHeight="tall">
						{bug.description}
					</Text>
				</VStack>

				<Text fontSize="xs" color="gray.500" whiteSpace="nowrap" ml={4}>
					{formatDate(bug.created_at)}
				</Text>
			</HStack>

			<HStack spacing={4} fontSize="xs" color="gray.500">
				<Text>Created: {formatDate(bug.created_at)}</Text>
				<Text>•</Text>
				<Text>Updated: {formatDate(bug.updated_at)}</Text>
			</HStack>
		</Box>
	);
}

