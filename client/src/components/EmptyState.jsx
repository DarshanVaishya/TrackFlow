// components/EmptyState.jsx
import { Box, Text } from '@chakra-ui/react';

export default function EmptyState() {
	return (
		<Box
			bg="white"
			border="1px"
			borderColor="gray.200"
			rounded="lg"
			p={12}
			textAlign="center"
		>
			<Text fontSize="lg" color="gray.600" mb={2}>
				No issues found
			</Text>
			<Text fontSize="sm" color="gray.500">
				Try adjusting your filters or create a new issue
			</Text>
		</Box>
	);
}

