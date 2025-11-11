// components/Navbar.jsx
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Button,
	Stack,
	Link,
	useDisclosure,
	Container,
} from '@chakra-ui/react';
import { FaGithub, FaBars, FaTimes } from 'react-icons/fa';

const NavLink = ({ children, href }) => (
	<Link
		px={4}
		py={2}
		rounded="md"
		fontSize="md"
		fontWeight="500"
		color="gray.700"
		_hover={{
			textDecoration: 'none',
			color: 'cyan.600',
			bg: 'gray.50',
		}}
		transition="all 0.2s"
		href={href}
	>
		{children}
	</Link>
);

export default function Navbar() {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box bg="white" shadow="sm" position="sticky" top={0} zIndex={100} borderBottom="1px" borderColor="gray.100">
			<Container maxW="container.xl" px={6}>
				<Flex h={16} alignItems="center" justifyContent="space-between">
					{/* Logo */}
					<Box fontWeight="bold" fontSize="xl" color="cyan.600">
						BugTracker
					</Box>

					{/* Desktop Navigation */}
					<HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
						<NavLink href="#features">Features</NavLink>
						<NavLink href="#how-it-works">How It Works</NavLink>
						<NavLink href="#testimonials">Testimonials</NavLink>
					</HStack>

					{/* CTA Buttons */}
					<HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
						<Button
							as="a"
							href="https://github.com/DarshanVaishya/TrackFlow"
							variant="ghost"
							colorScheme="gray"
							leftIcon={<FaGithub />}
						>
							GitHub
						</Button>
						<Button
							as="a"
							href="#get-started"
							colorScheme="cyan"
							bg="cyan.600"
							_hover={{ bg: 'cyan.700' }}
						>
							Get Started
						</Button>
					</HStack>

					{/* Mobile menu button */}
					<IconButton
						size="md"
						icon={isOpen ? <FaTimes /> : <FaBars />}
						aria-label="Toggle Menu"
						display={{ md: 'none' }}
						onClick={onToggle}
						variant="ghost"
					/>
				</Flex>

				{/* Mobile Navigation */}
				{isOpen && (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack spacing={2}>
							<NavLink href="#features">Features</NavLink>
							<NavLink href="#how-it-works">How It Works</NavLink>
							<NavLink href="#testimonials">Testimonials</NavLink>
							<Button
								as="a"
								href="https://github.com/DarshanVaishya/TrackFlow"
								variant="outline"
								colorScheme="gray"
								leftIcon={<FaGithub />}
								justifyContent="flex-start"
								w="full"
							>
								GitHub
							</Button>
							<Button
								as="a"
								href="#get-started"
								colorScheme="cyan"
								bg="cyan.600"
								w="full"
							>
								Get Started
							</Button>
						</Stack>
					</Box>
				)}
			</Container>
		</Box>
	);
}

