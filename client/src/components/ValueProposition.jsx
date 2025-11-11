import {
	Box,
	Container,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react';

export default function ValueProposition() {
	return (
		<Box py={16}>
			<Container maxW="container.lg">
				<VStack spacing={6} textAlign="center">
					<Heading as="h2" size="xl">
						Why This Bug Tracker?
					</Heading>

					<Text fontSize="lg" color="gray.600" maxW="3xl">
						Stop losing bugs in Slack threads, scattered emails, or endless
						spreadsheets. This bug tracker gives you a centralized system where
						every issue has a home, a history, and a clear path to resolution.
						Built with FastAPI and React, it's fast to deploy, easy to extend,
						and completely yours to control.
					</Text>

					<Text fontSize="lg" color="gray.600" maxW="3xl">
						Whether you're a solo developer or a small team, you get
						enterprise-level tracking without the enterprise complexity.
					</Text>
				</VStack>
			</Container>
		</Box>
	);
}

