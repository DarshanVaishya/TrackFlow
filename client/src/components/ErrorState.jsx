// components/ErrorState.jsx
import { Box, Text, Button } from '@chakra-ui/react';

export default function ErrorState({ error, onRetry }) {
	return (
		<Box
			bg="red.50"
			border="1px"
			borderColor="red.200"
			rounded="lg"
			p={6}
			textAlign="center"
		>
			<Text color="red.700" fontWeight="medium">
				{error}
			</Text>
			<Button
				mt={4}
				size="sm"
				colorScheme="red"
				variant="outline"
				onClick={onRetry}
			>
				Try Again
			</Button>
		</Box>
	);
}

