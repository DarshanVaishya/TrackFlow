// components/HowItWorks.jsx
import {
	Box,
	Container,
	Heading,
	VStack,
	HStack,
	Text,
	Circle,
	Stack,
} from '@chakra-ui/react';

const steps = [
	{
		number: '1',
		title: 'Deploy in Minutes',
		description:
			'Clone the repo, configure your environment variables, and launch with Docker. Full documentation and setup scripts included.',
	},
	{
		number: '2',
		title: 'Configure Your Workflow',
		description:
			"Customize issue types, statuses, and fields to match your team's process.Import existing issues from CSV or API.",
	},
	{
		number: '3',
		title: 'Start Tracking',
		description:
			'Create issues with rich formatting, attach files, link to code, and assign team members. Everything stays organized.',
	},
	{
		number: '4',
		title: 'Monitor & Improve',
		description:
			'Track metrics, identify bottlenecks, and continuously improve your process with real-time analytics and reports.',
	},
];

export default function HowItWorks() {
	return (
		<Box bg="gray.50" py={24} id="how-it-works">
			<Container maxW="container.lg" px={6}>
				<VStack spacing={6} mb={16} textAlign="center">
					<Heading
						as="h2"
						fontSize={{ base: '3xl', md: '4xl' }}
						fontWeight="bold"
						color="gray.900"
					>
						Get Started in 4 Simple Steps
					</Heading>
					<Text fontSize="lg" color="gray.600" maxW="2xl">
						From setup to production-ready in less than 30 minutes
					</Text>
				</VStack>

				<Stack spacing={6}>
					{steps.map((step, index) => (
						<HStack
							key={index}
							align="start"
							spacing={{ base: 4, md: 8 }}
							p={{ base: 6, md: 8 }}
							bg="white"
							rounded="xl"
							borderWidth="1px"
							borderColor="gray.200"
							shadow="sm"
							_hover={{
								borderColor: 'cyan.300',
								shadow: 'md',
							}}
							transition="all 0.3s"
						>
							<Circle
								size={{ base: '50px', md: '60px' }}
								bg="cyan.600"
								color="white"
								fontSize={{ base: 'xl', md: '2xl' }}
								fontWeight="bold"
								flexShrink={0}
							>
								{step.number}
							</Circle>

							<VStack align="start" spacing={2} flex={1}>
								<Heading
									as="h3"
									fontSize={{ base: 'lg', md: 'xl' }}
									fontWeight="semibold"
									color="gray.900"
								>
									{step.title}
								</Heading>
								<Text color="gray.600" lineHeight="tall" fontSize="md">
									{step.description}
								</Text>
							</VStack>
						</HStack>
					))}
				</Stack>
			</Container>
		</Box>
	);
}

