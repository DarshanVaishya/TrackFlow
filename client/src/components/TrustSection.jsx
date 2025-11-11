import {
	Box,
	Container,
	SimpleGrid,
	Heading,
	Text,
	VStack,
	Icon,
} from '@chakra-ui/react';
import { FaLock, FaCode, FaRocket } from 'react-icons/fa';

const features = [
	{
		icon: FaLock,
		title: '100% Open Source & Self-Hosted',
		description:
			'Your data stays on your infrastructure. No vendor lock-in, no monthly fees, no privacy compromises. Fork it, modify it, and make it work exactly how you need it to.',
	},
	{
		icon: FaCode,
		title: 'Built by a Developer, for Developers',
		description:
			'Created as a solo project to solve real workflow pain points. Every feature exists because it makes development faster, not to pad a feature list.',
	},
	{
		icon: FaRocket,
		title: 'Modern Tech Stack',
		description:
			"FastAPI backend for speed and Python's ecosystem. React with Chakra UI frontend for a responsive, accessible interface. Deploy anywhere in minutes.",
	},
];

export default function TrustSection() {
	return (
		<Box bg="gray.50" py={16}>
			<Container maxW="container.xl">
				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
					{features.map((feature, index) => (
						<VStack key={index} spacing={4} align="start">
							<Icon as={feature.icon} boxSize={10} color="blue.500" />
							<Heading as="h3" size="md">
								{feature.title}
							</Heading>
							<Text color="gray.600">{feature.description}</Text>
						</VStack>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
}

