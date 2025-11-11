// components/Footer.jsx
import {
	Box,
	Container,
	Stack,
	HStack,
	VStack,
	Text,
	Link,
	Icon,
	Separator,
	SimpleGrid,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';

// TODO: Fix the colors on the footer
const footerLinks = {
	Product: [
		{ label: 'Features', href: '#features' },
		{ label: 'How It Works', href: '#how-it-works' },
		{ label: 'Roadmap', href: '#roadmap' },
	],
	Resources: [
		{ label: 'Documentation', href: '#docs' },
		{ label: 'API Reference', href: '#api' },
		{ label: 'Guides', href: '#guides' },
		{ label: 'Community', href: '#community' },
	],
	Company: [
		{ label: 'About', href: '#about' },
		{ label: 'Blog', href: '#blog' },
		{ label: 'Careers', href: '#careers' },
		{ label: 'Contact', href: '#contact' },
	],
	Legal: [
		{ label: 'Privacy', href: '#privacy' },
		{ label: 'Terms', href: '#terms' },
		{ label: 'License', href: '#license' },
		{ label: 'Security', href: '#security' },
	],
};

export default function Footer() {
	return (
		<Box bg="gray.900" color="gray.300" py={16}>
			<Container maxW="container.xl" px={6}>
				<SimpleGrid columns={{ base: 1, md: 5 }} spacing={10} mb={12}>
					{/* Brand */}
					<VStack align="start" spacing={4}>
						<Text fontSize="xl" fontWeight="bold" color="white">
							BugTracker
						</Text>
						<Text fontSize="sm" color="gray.400" maxW="250px">
							Open-source issue tracking for modern development teams.
						</Text>
						<HStack spacing={4} pt={2}>
							<Link href="#" _hover={{ color: 'cyan.400' }}>
								<Icon as={FaGithub} boxSize={5} />
							</Link>
							<Link href="#" _hover={{ color: 'cyan.400' }}>
								<Icon as={FaTwitter} boxSize={5} />
							</Link>
							<Link href="#" _hover={{ color: 'cyan.400' }}>
								<Icon as={FaDiscord} boxSize={5} />
							</Link>
							<Link href="#" _hover={{ color: 'cyan.400' }}>
								<Icon as={FaLinkedin} boxSize={5} />
							</Link>
						</HStack>
					</VStack>

					{/* Links */}
					{Object.entries(footerLinks).map(([category, links]) => (
						<VStack key={category} align="start" spacing={3}>
							<Text fontSize="sm" fontWeight="semibold" color="white" mb={1}>
								{category}
							</Text>
							{links.map((link) => (
								<Link
									key={link.label}
									href={link.href}
									fontSize="sm"
									_hover={{ color: 'cyan.400' }}
									transition="color 0.2s"
								>
									{link.label}
								</Link>
							))}
						</VStack>
					))}
				</SimpleGrid>

				<Separator borderColor="gray.700" mb={8} />

				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					justify="space-between"
					align="center"
				>
					<Text fontSize="sm" color="gray.500">
						© 2025 TrackFlow. Open source under MIT License.
					</Text>
					<HStack spacing={6} fontSize="sm">
						<Link href="#" color="gray.500" _hover={{ color: 'cyan.400' }}>
							Status
						</Link>
						<Link href="#" color="gray.500" _hover={{ color: 'cyan.400' }}>
							Changelog
						</Link>
						<Link href="#" color="gray.500" _hover={{ color: 'cyan.400' }}>
							Twitter
						</Link>
					</HStack>
				</Stack>
			</Container>
		</Box>
	);
}

