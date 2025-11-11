// components/Hero.jsx
import {
	Box,
	Button,
	Container,
	Heading,
	Stack,
	Text,
	HStack,
	Badge,
} from '@chakra-ui/react';
import { FaGithub, FaRocket } from 'react-icons/fa';

export default function Hero() {
	return (
		<Box bg="gradient-to-b" bgGradient="linear(to-b, cyan.50, white)" py={24} overflow="hidden">
			<Container maxW="container.xl" px={6}>
				<Stack spacing={8} maxW="900px" mx="auto" textAlign="center" align="center">
					{/* Badge */}
					<Badge
						colorScheme="cyan"
						fontSize="sm"
						px={4}
						py={2}
						rounded="full"
						fontWeight="600"
					>
						Open Source • Self-Hosted • Free Forever
					</Badge>

					{/* Main Heading */}
					<Heading
						as="h1"
						fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
						fontWeight="extrabold"
						lineHeight="1.1"
						color="gray.900"
					>
						Track Bugs That{' '}
						<Box as="span" color="cyan.600">
							Actually Get Fixed
						</Box>
					</Heading>

					{/* Subheading */}
					<Text
						fontSize={{ base: 'lg', md: 'xl' }}
						color="gray.600"
						maxW="3xl"
						lineHeight="tall"
					>
						The lightweight, open-source issue tracker built for developers who want
						simplicity without sacrificing power. Deploy in minutes, customize everything,
						and keep your team focused on shipping.
					</Text>

					{/* CTA Buttons */}
					<HStack spacing={4} pt={4}>
						<Button
							size="lg"
							colorScheme="cyan"
							bg="cyan.600"
							_hover={{ bg: 'cyan.700', transform: 'translateY(-2px)' }}
							leftIcon={<FaRocket />}
							px={8}
							h={14}
							fontSize="md"
							shadow="lg"
							transition="all 0.2s"
						>
							Get Started
						</Button>
						<Button
							size="lg"
							variant="outline"
							colorScheme="gray"
							leftIcon={<FaGithub />}
							px={8}
							h={14}
							fontSize="md"
							as="a"
							href="https://github.com/DarshanVaishya/TrackFlow"
						>
							View on GitHub
						</Button>
					</HStack>

					<HStack
						spacing={{ base: 12, md: 24 }}
						pt={12}
						flexWrap="wrap"
						justify="center"
					>
						<Stack spacing={1} align="center">
							<Text fontSize="3xl" fontWeight="bold" color="cyan.600">
								100%
							</Text>
							<Text fontSize="sm" color="gray.600">
								Open Source
							</Text>
						</Stack>
						<Stack spacing={1} align="center">
							<Text fontSize="3xl" fontWeight="bold" color="cyan.600">
								10min
							</Text>
							<Text fontSize="sm" color="gray.600">
								Setup Time
							</Text>
						</Stack>
						<Stack spacing={1} align="center">
							<Text fontSize="3xl" fontWeight="bold" color="cyan.600">
								$0
							</Text>
							<Text fontSize="sm" color="gray.600">
								Monthly Cost
							</Text>
						</Stack>
					</HStack>
				</Stack>
			</Container>
		</Box>
	);
}

