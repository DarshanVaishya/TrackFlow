import {
	Box,
	Container,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react';

export default function About() {
	return (
		<Box bg="blue.50" py={16}>
			<Container maxW="container.lg">
				<VStack spacing={6} textAlign="center">
					<Heading as="h2" size="xl">
						Built in the Open
					</Heading>

					<Text fontSize="lg" color="gray.700" maxW="3xl">
						This project started as a solo effort to create the bug tracker I
						wished existed—powerful enough for real projects, simple enough to
						understand in an afternoon. Built with modern tools (FastAPI, React,
						Chakra UI) and designed to be maintainable, extensible, and
						genuinely useful.
					</Text>

					<Text fontSize="lg" color="gray.700" maxW="3xl">
						Contributions, feedback, and feature requests are always welcome.
						Check out the roadmap on GitHub to see what's coming next.
					</Text>
				</VStack>
			</Container>
		</Box>
	);
}

