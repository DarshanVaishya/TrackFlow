// components/BugsList.jsx
import { VStack } from '@chakra-ui/react';
import BugCard from './BugCard';

export default function BugsList({ bugs }) {
	return (
		<VStack spacing={3} align="stretch">
			{bugs.map((bug) => (
				<BugCard key={bug.id} bug={bug} />
			))}
		</VStack>
	);
}

