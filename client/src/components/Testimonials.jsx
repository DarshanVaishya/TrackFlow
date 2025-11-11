// components/Testimonials.jsx
import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	VStack,
	Text,
	HStack,
	Image,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
	{
		name: 'Sarah Chen',
		role: 'Engineering Lead at TechCorp',
		avatar: 'https://i.pravatar.cc/150?img=1',
		content:
			'Switched from Jira and never looked back. BugTracker is fast, clean, and actually enjoyable to use. Our team productivity increased by 40%.',
	},
	{
		name: 'Marcus Rodriguez',
		role: 'Founder at StartupXYZ',
		avatar: 'https://i.pravatar.cc/150?img=2',
		content:
			"Finally, an issue tracker that doesn't cost a fortune.Self - hosting gave us complete control and the setup took literally 10 minutes.",
	},
	{
		name: 'Emily Watson',
		role: 'Product Manager at DevTools Inc',
		avatar: 'https://i.pravatar.cc/150?img=3',
		content:
			'The API is incredible. We integrated it with our CI/CD pipeline and now bugs are automatically created from test failures. Game changer.',
	},
];

export default function Testimonials() {
	return (
		<Box py={24} bg="white" id="testimonials">
			<Container maxW="container.xl" px={6}>
				<VStack spacing={6} mb={16} textAlign="center">
					<Heading
						as="h2"
						fontSize={{ base: '3xl', md: '4xl' }}
						fontWeight="bold"
						color="gray.900"
					>
						Loved by Developers
					</Heading>
					<Text fontSize="lg" color="gray.600" maxW="2xl">
						Join thousands of teams tracking issues more efficiently
					</Text>
				</VStack>

				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
					{testimonials.map((testimonial, index) => (
						<VStack
							key={index}
							align="start"
							spacing={6}
							p={8}
							bg="gray.50"
							rounded="xl"
							borderWidth="1px"
							borderColor="gray.200"
						>
							<HStack spacing={1}>
								{[...Array(5)].map((_, i) => (
									<FaStar key={i} color="#06b6d4" size={18} />
								))}
							</HStack>

							<Text color="gray.700" lineHeight="tall" fontSize="md">
								"{testimonial.content}"
							</Text>

							<HStack spacing={4}>
								{/* Simple avatar using Image and Box */}
								<Box
									w="48px"
									h="48px"
									rounded="full"
									overflow="hidden"
									bg="cyan.100"
									flexShrink={0}
								>
									<Image
										src={testimonial.avatar}
										alt={testimonial.name}
										w="full"
										h="full"
										objectFit="cover"
									/>
								</Box>
								<VStack align="start" spacing={0}>
									<Text fontWeight="semibold" color="gray.900" fontSize="sm">
										{testimonial.name}
									</Text>
									<Text fontSize="sm" color="gray.600">
										{testimonial.role}
									</Text>
								</VStack>
							</HStack>
						</VStack>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
}

