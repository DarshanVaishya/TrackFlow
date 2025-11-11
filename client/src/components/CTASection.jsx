// components/CTASection.jsx
import {
	Box,
	Button,
	Container,
	Heading,
	Text,
	VStack,
	HStack,
} from '@chakra-ui/react';
import { FaRocket, FaGithub } from 'react-icons/fa';

export default function CTASection() {
	return (
		<Box py={24} bg="cyan.600" color="white" position="relative" overflow="hidden">
			{/* Background Pattern */}
			<Box
				position="absolute"
				top="-50%"
				right="-10%"
				w="600px"
				h="600px"
				bg="cyan.500"
				opacity="0.2"
				filter="blur(100px)"
				borderRadius="full"
			/>

			<Container maxW="container.lg" px={6} position="relative" zIndex={1}>
				<VStack spacing={8} textAlign="center">
					<Heading
						as="h2"
						fontSize={{ base: '3xl', md: '4xl' }}
						fontWeight="bold"
					>
						Ready to Track Bugs Better?
					</Heading>

					<Text fontSize="xl" maxW="2xl" opacity={0.9}>
						Join thousands of developers who've made the switch to a simpler,
						more powerful issue tracker. Deploy in minutes and start shipping faster.
					</Text>

					<HStack spacing={4} pt={4}>
						<Button
							size="lg"
							bg="white"
							color="cyan.600"
							leftIcon={<FaRocket />}
							px={8}
							h={14}
							_hover={{
								bg: 'gray.50',
								transform: 'translateY(-2px)',
							}}
							shadow="xl"
							transition="all 0.2s"
						>
							Get Started For Free
						</Button>
						<Button
							size="lg"
							variant="outline"
							borderColor="white"
							color="white"
							leftIcon={<FaGithub />}
							px={8}
							h={14}
							_hover={{
								bg: 'whiteAlpha.200',
							}}
							as="a"
							href="https://github.com/DarshanVaishya/TrackFlow"
						>
							View on GitHub
						</Button>
					</HStack>

					<Text fontSize="sm" opacity={0.8} pt={4}>
						No credit card required • 100% open source • Deploy anywhere
					</Text>
				</VStack>
			</Container>
		</Box>
	);
}

