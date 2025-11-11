// components/Features.jsx
import {
	Box,
	Container,
	Heading,
	SimpleGrid,
	VStack,
	Text,
	Icon,
} from '@chakra-ui/react';
import {
	FaTags,
	FaBug,
	FaUsers,
	FaColumns,
	FaPlug,
	FaCog,
	FaChartLine,
	FaRocket,
	FaLock,
} from 'react-icons/fa';

const features = [
	{
		icon: FaBug,
		title: 'Smart Issue Tracking',
		description:
			'Capture every detail with custom fields, reproduction steps, and environment info. Link to commits and PRs automatically.',
	},
	{
		icon: FaUsers,
		title: 'Team Collaboration',
		description:
			'Comment threads, @mentions, assignees, and activity logs keep everyone in sync. No more lost context.',
	},
	{
		icon: FaColumns,
		title: 'Flexible Views',
		description:
			'Switch between Kanban boards, list views, and calendar layouts. Customize columns and filters for your workflow.',
	},
	{
		icon: FaTags,
		title: 'Custom Labels & Fields',
		description:
			'Organize issues your way with unlimited custom fields, labels, and status workflows that match your process.',
	},
	{
		icon: FaPlug,
		title: 'Powerful API',
		description:
			'Full REST API with webhooks. Integrate with CI/CD, automate workflows, or build custom tools on top.',
	},
	{
		icon: FaChartLine,
		title: 'Actionable Analytics',
		description:
			'Identify bug patterns, track resolution times, and measure team velocity with built-in reports and dashboards.',
	},
	{
		icon: FaRocket,
		title: 'Lightning Fast',
		description:
			'Built with FastAPI and React for blazing performance. Load times under 100ms and real-time updates.',
	},
	{
		icon: FaCog,
		title: 'Fully Customizable',
		description:
			'Modify workflows, issue types, and UI components. Open source means total control over your tracker.',
	},
	{
		icon: FaLock,
		title: 'Your Data, Your Server',
		description:
			'Self-host on your infrastructure. No vendor lock-in, no data sharing, complete privacy and security.',
	},
];

export default function Features() {
	return (
		<Box py={24} bg="white" id="features">
			<Container maxW="container.xl" px={6}>
				<VStack spacing={6} mb={16} textAlign="center">
					<Heading
						as="h2"
						fontSize={{ base: '3xl', md: '4xl' }}
						fontWeight="bold"
						color="gray.900"
					>
						Everything You Need to Ship Faster
					</Heading>
					<Text fontSize="lg" color="gray.600" maxW="2xl">
						Powerful features that adapt to your workflow, not the other way around
					</Text>
				</VStack>

				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 3 }}
					spacing={{ base: 8, md: 10 }}
				>
					{features.map((feature, index) => (
						<VStack
							key={index}
							align="start"
							spacing={4}
							p={8}
							bg="white"
							rounded="xl"
							borderWidth="1px"
							borderColor="gray.200"
							_hover={{
								borderColor: 'cyan.300',
								shadow: 'lg',
								transform: 'translateY(-4px)',
							}}
							transition="all 0.3s"
						>
							<Box p={3} bg="cyan.50" rounded="lg">
								<Icon as={feature.icon} boxSize={6} color="cyan.600" />
							</Box>
							<Heading as="h3" fontSize="xl" fontWeight="semibold" color="gray.900">
								{feature.title}
							</Heading>
							<Text color="gray.600" lineHeight="tall" fontSize="md">
								{feature.description}
							</Text>
						</VStack>
					))}
				</SimpleGrid>
			</Container>
		</Box>
	);
}

