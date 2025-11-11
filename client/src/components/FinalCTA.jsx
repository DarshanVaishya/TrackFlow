import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	VStack,
	HStack,
	Icon,
} from '@chakra-ui/react';
import { FaRocket, FaBook, FaGithub } from 'react-icons/fa';

export default function FinalCTA() {
	return (
		<Box bg="blue.600" color="white" py={20}>
			<Container maxW="container.md">
				<VStack spacing={8} textAlign="center">
					<Heading as="h2" size="xl">
						Start Tracking Better, Today
					</Heading>

					<Text fontSize="lg" maxW="2xl">
						No credit card. No trial period. No strings attached. Just clone,
						deploy, and start fixing bugs more efficiently.
					</Text>

					<HStack spacing={4} flexWrap="wrap" justify="center">
						<Button
							size="lg"
							colorScheme="whiteAlpha"
							bg="white"
							color="blue.600"
							leftIcon={<Icon as={FaRocket} />}
							_hover={{ bg: 'gray.100' }}
						>
							Get Started
						</Button>

						<Button
							size="lg"
							variant="outline"
							borderColor="white"
							color="white"
							leftIcon={<Icon as={FaBook} />}
							_hover={{ bg: 'whiteAlpha.200' }}
						>
							Documentation
						</Button>

						<Button
							size="lg"
							variant="outline"
							borderColor="white"
							color="white"
							leftIcon={<Icon as={FaGithub} />}
							_hover={{ bg: 'whiteAlpha.200' }}
						>
							GitHub Repository
						</Button>
					</HStack>
				</VStack>
			</Container>
		</Box>
	);
}

