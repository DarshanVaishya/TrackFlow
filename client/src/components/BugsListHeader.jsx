// components/BugsListHeader.jsx
import { HStack, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

export default function BugsListHeader({ totalBugs, filteredBugs }) {
	return (
		<HStack justify="space-between" mb={8} flexWrap="wrap" gap={4}>
			<VStack align="start" spacing={1}>
				<Heading as="h1" fontSize="3xl" color="gray.900">
					All Issues
				</Heading>
				<Text color="gray.600">
					{filteredBugs} of {totalBugs} issues
				</Text>
			</VStack>
			<Button
				colorScheme="cyan"
				bg="cyan.600"
				leftIcon={<FaPlus />}
				size="lg"
				_hover={{ bg: 'cyan.700' }}
			>
				New Issue
			</Button>
		</HStack>
	);
}

