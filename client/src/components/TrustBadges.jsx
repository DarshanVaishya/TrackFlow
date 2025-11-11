// components/TrustBadges.jsx
import { Box, Container, Text, HStack } from '@chakra-ui/react';
import { FaShieldAlt, FaLock, FaCode, FaGithub } from 'react-icons/fa';

export default function TrustBadges() {
	return (
		<Box bg="white" py={12} borderY="1px" borderColor="gray.100">
			<Container maxW="container.xl" px={6}>
				<Text
					fontSize="sm"
					fontWeight="600"
					color="gray.500"
					textAlign="center"
					mb={6}
					textTransform="uppercase"
					letterSpacing="wide"
				>
					Trusted by developers worldwide
				</Text>
				<HStack
					spacing={{ base: 8, md: 16 }}
					justify="center"
					flexWrap="wrap"
				>
					<HStack spacing={2} color="gray.600">
						<FaGithub size={20} />
						<Text fontSize="sm" fontWeight="500">
							MIT Licensed
						</Text>
					</HStack>
					<HStack spacing={2} color="gray.600">
						<FaShieldAlt size={20} />
						<Text fontSize="sm" fontWeight="500">
							SOC 2 Ready
						</Text>
					</HStack>
					<HStack spacing={2} color="gray.600">
						<FaLock size={20} />
						<Text fontSize="sm" fontWeight="500">
							GDPR Compliant
						</Text>
					</HStack>
					<HStack spacing={2} color="gray.600">
						<FaCode size={20} />
						<Text fontSize="sm" fontWeight="500">
							Self-Hosted
						</Text>
					</HStack>
				</HStack>
			</Container>
		</Box>
	);
}

